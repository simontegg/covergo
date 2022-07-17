const rate = {
  HKD: 1,
  USD: 2,
  AUD: 3,
};

export const packageRate = {
  standard: 1,
  safe: 1.5,
  "super-safe": 1.75,
};

export const countries = {
  HKD: "Hong Kong",
  USD: "USA",
  AUD: "Australia",
};

export const getBasePremium = (state) => {
  const { age, country } = state.context.form;
  return age ? 10 * age * rate[country] : null;
};

export const getPremium = (state) => {
  const { package: pkg } = state.context.form;
  const basePremium = getBasePremium(state);
  return basePremium ? basePremium * packageRate[pkg] : null;
};

export const getForm = (state) => state.context.form;
