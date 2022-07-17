<script setup lang="ts">
import type { WizardService } from "../user-details/types";
import { useActor, useSelector } from "@xstate/vue";
import { getForm, getPremium, countries } from "../user-details/selectors";

interface Props {
  service: WizardService;
}

const props = defineProps<Props>();
const { send } = useActor(props.service);
const form = useSelector(props.service, getForm);
const premium = useSelector(props.service, getPremium);
</script>
<template>
  <div class="w-72 bg-gray py-8 px-8 text-center">
    <h1 class="text-2xl font-bold">Summary</h1>
    <h2 class="mt-4 text-xl font-bold">{{ form.name }},</h2>
    <div class="flex flex-col">
      <span class="mt-4">Name: {{ form.name }}</span>
      <span class="mt-4">Age: {{ form.age }}</span>
      <span class="mt-4">Where do you live: {{ countries[form.country] }}</span>
      <span class="mt-4">Package: {{ form.package }}</span>
      <span class="mt-4">Premium: {{ premium }}{{ form.country }}</span>
    </div>

    <div class="mt-20 flex">
      <button
        name="back"
        class="btn-secondary"
        @click="send({ type: 'BACK_TO_DETAILS' })"
      >
        Back
      </button>
      <button
        name="submit"
        class="btn-primary ml-4"
        @click="send({ type: 'BACK_TO_INTRO' })"
      >
        Buy
      </button>
    </div>
  </div>
</template>
