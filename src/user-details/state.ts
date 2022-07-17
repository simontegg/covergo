import type { Event, Context } from "./types";

export const context: Context = {
  form: {
    name: "",
    age: null,
    country: "HKD",
    package: "standard",
  },
};

export default {
  id: "user-details",

  schema: {
    context: {} as Context,
    events: {} as Event,
  },

  initial: "intro",

  context,

  states: {
    intro: {
      on: {
        START: "details",
      },
    },

    details: {
      on: {
        BACK: { target: "intro", actions: "setForm" },
        NEXT: [
          { cond: "over100", target: "error", actions: "setForm" },
          { target: "summary", actions: "setForm" },
        ],
      },
    },

    summary: {
      on: {
        BACK_TO_DETAILS: "details",
        BACK_TO_INTRO: { target: "intro", actions: "reset" },
      },
    },

    error: {
      on: {
        BACK_TO_INTRO: "intro",
      },
    },
  },
};
