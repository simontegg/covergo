<script setup lang="ts">
import type { WizardService } from "../user-details/types";
import { useActor } from "@xstate/vue";

interface Props {
  service: WizardService;
}

const props = defineProps<Props>();
const { send } = useActor(props.service);
</script>
<template>
  <div class="container bg-gray py-12 px-8 text-center">
    <h1 class="text-2xl font-bold">Hello There!</h1>
    <p class="mt-8">
      Let's buy some insurance. It is only going to take a few steps.
    </p>
    <button
      name="start"
      class="btn-primary mt-6"
      @click="send({ type: 'START' })"
    >
      Start
    </button>
  </div>
</template>
