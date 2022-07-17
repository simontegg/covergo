<script setup lang="ts">
import { interpret } from "xstate";
import UserDetailsWizard from "./components/UserDetailsWizard.vue";
import createMachine from "./user-details/machine";

const machine = createMachine();
const service = interpret(machine).start();
</script>

<template>
  <div
    class="bg-white flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
  >
    <UserDetailsWizard :service="service" />
  </div>
</template>
