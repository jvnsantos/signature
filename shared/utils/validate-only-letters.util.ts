const validateOnlyLettersUtil = (value: string) =>
  /^[A-Za-zÀ-ÿ\s]+$/.test(value);

export default validateOnlyLettersUtil;
