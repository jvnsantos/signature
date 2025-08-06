function formatPhoneNumber(phone: string) {
  if (typeof phone !== "string") return phone;

  const cleanPhone = phone.replace(/\D/g, "");

  const phoneWithoutCountryCode = cleanPhone.startsWith("55")
    ? cleanPhone.slice(2)
    : cleanPhone;

  if (phoneWithoutCountryCode.length === 11) {
    return `+55 (${phoneWithoutCountryCode.slice(
      0,
      2
    )}) ${phoneWithoutCountryCode.slice(2, 7)}-${phoneWithoutCountryCode.slice(
      7
    )}`;
  }

  return phone;
}

export default formatPhoneNumber;
