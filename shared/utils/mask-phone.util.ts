const maskPhoneUtils = (value: any) => {
  try {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length > 10) {
      return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (cleaned.length === 10) {
      return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    }

    return cleaned;
  } catch (error) {
    console.error(error);
    return value;
  }
};

export default maskPhoneUtils;
