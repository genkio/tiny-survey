/**
 * Create valid HTML element ID with value provided
 */
export function createElementId(value: string, replaceWith = "") {
  return value.replace(/\s+/g, replaceWith);
}
