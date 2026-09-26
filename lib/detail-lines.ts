const GOLD_LINE = "14k gold vermeil over recycled sterling silver";
const SILVER_LINE = "Solid recycled sterling silver";

const METAL_LINES = new Set([
  GOLD_LINE,
  "Recycled sterling silver or 14k gold vermeil",
  "Recycled solid sterling silver or 14k gold vermeil",
]);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function detailLine(
  detail: string,
  optionName: string,
  optionLabel: "Color" | "Metal",
  optionNames: string[],
) {
  if (optionLabel === "Metal" && METAL_LINES.has(detail)) {
    return optionName === "Sterling Silver" ? SILVER_LINE : GOLD_LINE;
  }

  if (optionLabel !== "Color") return detail;

  const names = [...optionNames].sort((a, b) => b.length - a.length);
  for (const name of names) {
    if (name.toLowerCase() === optionName.toLowerCase()) continue;
    const pattern = new RegExp(`\\b${escapeRegExp(name)}\\b`, "i");
    if (pattern.test(detail)) return detail.replace(pattern, optionName);
  }

  return detail;
}
