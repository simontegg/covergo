import { describe, expect, test, afterEach } from "vitest";
import traverse from "traverse";
import { mount, enableAutoUnmount, flushPromises } from "@vue/test-utils";
import { createMachine, interpret } from "xstate";
import { createModel } from "@xstate/test";

import userDetailsMachine from "../src/user-details/machine";
import state, { context } from "../src/user-details/state";
import * as guards from "../src/user-details/guards";
import * as actions from "../src/user-details/actions";
import UserDetailsWizard from "../src/components/UserDetailsWizard.vue";

import type { VueWrapper } from "@vue/test-utils";

const tests = {
  intro: async (wrapper) => {
    const h1 = wrapper.get("h1");
    expect(h1.text()).toBe("Hello There!");
  },
  details: async (wrapper) => {
    const form = wrapper.get("form");
    expect(form).toBeTruthy();
  },
  summary: async (wrapper) => {
    const h1 = wrapper.get("h1");
    expect(h1.text()).toBe("Summary");
  },

  error: async (wrapper) => {
    const h1 = wrapper.get("h1");
    expect(h1.text()).toBe("Ooops");
  },
};

// Add an assertion for each state to verify
// that the application has reached that state
const testState = traverse(state).map(function (x) {
  if (tests[this.key]) {
    this.update({
      ...x,
      meta: {
        test: tests[this.key],
      },
    });
  }
});

const formData = {
  ...context.form,
  name: "Simon",
  age: 99,
};

const testMachine = createMachine(testState, { actions, guards });
const testModel = createModel(testMachine).withEvents({
  START: async (wrapper: VueWrapper) => {
    await wrapper.find("button").trigger("click");
  },
  NEXT: {
    exec: async (wrapper: VueWrapper, event) => {
      await wrapper.find('[name="name"]').setValue(formData.name);
      await wrapper.find('[name="age"]').setValue(formData.age);
      await flushPromises();
      const button = wrapper.find('button[name="next"]');
      await button.trigger("click");
    },
    cases: [{ type: "NEXT", form: formData }],
  },
  BACK: async (wrapper: VueWrapper) => {
    await wrapper.find('button[name="back"]').trigger("click");
  },
  BACK_TO_DETAILS: async (wrapper: VueWrapper) => {
    await wrapper.find('button[name="back"]').trigger("click");
  },
  BACK_TO_INTRO: async (wrapper: VueWrapper) => {
    await wrapper.find('button[name="submit"]').trigger("click");
  },
});

enableAutoUnmount(afterEach);

describe("UserDetailsWizard: happy paths", () => {
  const testPlans = testModel.getSimplePathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach((path, i) => {
        test(path.description, async () => {
          const machine = userDetailsMachine();
          const service = interpret(machine).start();

          const wrapper = mount(UserDetailsWizard, { props: { service } });
          await path.test(wrapper);
        });
      });
    });
  });
});
