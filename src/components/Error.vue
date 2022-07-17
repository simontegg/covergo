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
    <h1 class="text-2xl font-bold">Ooops</h1>
    <p class="mt-8">
      You age is over our limit. We are sorry but we cannot insure you now
    </p>
    <button
      name="back"
      class="btn-primary mt-6"
      @click="send({ type: 'BACK_TO_INTRO' })"
    >
      Ok :()
    </button>
  </div>
</template>
