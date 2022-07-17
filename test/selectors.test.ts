import { describe, expect, test } from "vitest";
import { getBasePremium, getPremium } from "../src/user-details/selectors";

test("calculates basePremium", () => {
  const state = {
    context: {
      form: {
        age: 50,
        country: "HKD",
        package: "standard",
      },
    },
  };

  const premium = getBasePremium(state);
  expect(premium).toBe(500);
});

test("calculates adjustedPremium", () => {
  const state = {
    context: {
      form: {
        age: 50,
        country: "AUD",
        package: "standard",
      },
    },
  };

  const premium = getPremium(state);
  expect(premium).toBe(1500);
});
