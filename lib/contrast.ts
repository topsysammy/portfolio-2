function lum(hex: string) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Best of white / near-black text on a swatch, with its ratio and WCAG grade. */
export function bestText(bg: string) {
  const w = contrast(bg, "#FFFFFF");
  const k = contrast(bg, "#121212");
  const fg = w >= k ? "#FFFFFF" : "#121212";
  const ratio = Math.max(w, k);
  const grade = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA Large" : "Fail";
  return { fg, ratio, grade };
}
