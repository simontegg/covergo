<script setup lang="ts">
import type { WizardService } from "../user-details/types";
import { useActor } from "@xstate/vue";
import Intro from "./Intro.vue";
import Details from "./Details.vue";
import Summary from "./Summary.vue";
import ErrorPage from "./Error.vue";

export interface Props {
  service: WizardService;
}

const props = defineProps<Props>();
const { state } = useActor(props.service);
</script>

<template>
  <div class="bg-slate-300 px-16 py-14 rounded-md text-center">
    <Intro v-if="state.matches('intro')" :service="props.service" />
    <Details v-else-if="state.matches('details')" :service="props.service" />
    <Summary v-else-if="state.matches('summary')" :service="props.service" />
    <ErrorPage v-else-if="state.matches('error')" :service="props.service" />
  </div>
</template>
