import { createMachine, interpret } from "xstate";
import { useActor } from "@xstate/vue";
import state from "./state";
import * as actions from "./actions";
import * as guards from "./guards";

export default () =>
  createMachine(state, {
    actions,
    guards,
  });
