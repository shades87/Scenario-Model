export function hexToPixel(
  q: number,
  r: number,
  size: number
) {
  return {
    x: size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r),
    y: size * (3 / 2 * r)
  };
}

export function hexPoints(
  x: number,
  y: number,
  size: number
) {
  return Array.from({ length: 6 }, (_, i) => {
    // 30° offset = pointy-top hex
    const angle = Math.PI / 180 * (60 * i - 30);
    return [
      x + size * Math.cos(angle),
      y + size * Math.sin(angle)
    ].join(',');
  }).join(' ');
}
