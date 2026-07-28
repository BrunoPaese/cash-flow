import {
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

export function formatPhoneInternational(
  phone?: string,
  defaultCountry: CountryCode = "BR",
  fallback = "",
) {
  if (!phone) return fallback;

  const normalizedPhone = phone.replace(/\D/g, "");

  const phoneNumber = parsePhoneNumberFromString(
    normalizedPhone,
    defaultCountry,
  );

  return phoneNumber?.formatNational() ?? phone;
}
