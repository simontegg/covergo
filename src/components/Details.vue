<script setup lang="ts">
import type { WizardService } from "../user-details/types";
import { reactive, computed } from "vue";
import { useActor, useSelector } from "@xstate/vue";
import {
  getBasePremium,
  getPremium,
  packageRate,
  countries,
} from "../user-details/selectors";

interface Props {
  service: WizardService;
}

const props = defineProps<Props>();
const { send } = useActor(props.service);
const radios = [
  { id: "standard", text: "Standard" },
  { id: "safe", text: "Safe" },
  { id: "super-safe", text: "Super Safe" },
];

const form = reactive(props.service.state.context.form);
const disabled = computed(() => !form.age || !form.name);

// selectors reused
const basePremium = computed(() => getBasePremium({ context: { form } }));
const premium = computed(() => getPremium({ context: { form } }));

// tests complain about v-model with <select />
// so using the more verbose syntax
const updateSelect = (v) => {
  form.country = v;
};

const getRadioLabel = ({ id, text }, currencyCode) => {
  const excessRate = packageRate[id];
  const excess = excessRate * basePremium.value - basePremium.value;

  return excess > 0
    ? `${text} (+${excess}${currencyCode}, ${(excessRate - 1) * 100}%)`
    : text;
};
</script>

<template>
  <div class="w-72 py-2">
    <h1 class="text-2xl font-bold">Tell us about yourself</h1>
    <form class="mt-4 text-left pl-12">
      <div>
        <label for="details-name" class="block text-sm"> Name </label>
        <input id="details-name" type="text" name="name" v-model="form.name" />
      </div>
      <div>
        <label for="details-age" class="block mt-4 text-sm"> Age </label>
        <input
          id="details-age"
          type="number"
          name="age"
          v-model="form.age"
          pattern="^[1-9][0-9]?$|^100$"
        />
      </div>
      <div class="mt-4">
        <label for="select-country" class="block text-sm">
          Where do you live
        </label>
        <select
          id="select-country"
          :value="form.country"
          @input="($event) => updateSelect($event.target.value)"
        >
          <option v-for="key in Object.keys(countries)" :key="key" :value="key">
            {{ countries[key] }}
          </option>
        </select>
      </div>
      <div class="mt-6">
        <div 
          v-for="radio in radios" 
          :key="radio.id"
          class="mt-2 flex flex-col text-left"
          >
          <label :for="radio.id">
            <input
              :id="radio.id"
              type="radio"
              class="details-radio"
              :value="radio.id"
              v-model="form.package"
            />
            <span class="ml-2 text-sm">{{
              getRadioLabel(radio, form.country)
            }}</span>
          </label>
        </div>
      </div>
    </form>
    <div class="h-8 mt-4">
      <h2 v-if="premium" class="text-dark font-bold text-large leading-snug">
        Your premium is: {{ premium }}{{ form.country }}
      </h2>
    </div>
    <div class="mt-8 flex justify-around">
      <button
        name="back"
        class="btn-secondary"
        @click="send({ type: 'BACK', form })"
      >
        Back
      </button>
      <div class="ml-2">
        <button
          v-if="disabled"
          disabled
          name="next"
          class="btn-primary"
          @click="send({ type: 'NEXT', form })"
        >
          Next
        </button>
        <button
          v-else
          name="next"
          class="btn-primary"
          @click="send({ type: 'NEXT', form })"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
