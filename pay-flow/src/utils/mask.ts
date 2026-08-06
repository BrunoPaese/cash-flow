export function maskCpfCnpj(identifier?: string, fallback = ""): string {
  if (!identifier) return fallback;

  const digits = identifier?.replace(/\D/g, "") || "";

  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d{2})$/, "$1-$2");
}

export function maskPostalCode(postalCode?: string, fallback = ""): string {
  if (!postalCode) return fallback;

  const digits = postalCode.replace(/\D/g, "");

  return digits.replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9);
}

export function maskPhone(phone?: string, fallback = ""): string {
  if (!phone) return fallback;

  const digits = phone.replace(/\D/g, "");

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 14);
  }

  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}
