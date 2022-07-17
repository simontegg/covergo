import type { InterpreterFrom } from "xstate";
import { machine } from "../user-details/machine";

export type WizardService = InterpreterFrom<typeof machine>;

export interface Props {
  service: WizardService;
}

type country = "HKD" | "USD" | "AUD";
type package = "standard" | "safe" | "super-safe";

export type Form = {
  name: string;
  age: number | null;
  country: country;
  package: package;
};

export type StartEvent = { type: "START" };
export type NextEvent = { type: "NEXT"; form: Form };
export type BackEvent = { type: "BACK"; form: Form };
export type FormEvent = NextEvent | BackEvent;
export type BackToDetailsEvent = { type: "BACK_TO_DETAILS" };
export type BackToDetailsEvent = { type: "BACK_TO_INTRO" };

export type Event =
  | StartEvent
  | NextEvent
  | BackEvent
  | BackToDetailsEvent
  | BackToIntroEvent;

export type Context = {
  form: Form;
};
