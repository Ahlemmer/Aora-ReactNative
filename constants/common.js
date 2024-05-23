export function capitalize(word) {
  if (typeof word !== "string" || word.length === 0) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}
export function formatPrice(price) {
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
