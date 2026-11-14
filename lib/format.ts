export function formatDate(date: Date) {
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function startOfToday() {
  return new Date(new Date().toISOString().slice(0, 10));
}