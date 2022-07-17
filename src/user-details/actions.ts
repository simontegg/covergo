import { Context, FormEvent } from "./types";
import { assign } from "xstate";

export const setForm = assign<Context, FormEvent>({
  form: (_, event) => {
    return event.form;
  },
});

export const reset = assign({
  form: {
    name: "",
    age: null,
    package: "standard",
    country: "HKD",
  },
});
