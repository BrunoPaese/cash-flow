export const onlyNumbers = (value?: string) => {
  if (!value) return "";
  return value.replace(/\D/g, "");
};
