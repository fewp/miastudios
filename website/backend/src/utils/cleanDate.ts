export function cleanDate() {
  const clearDate = new Date()
    .toString()
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toLowerCase()
    .slice(0, -34);
  return clearDate;
}
