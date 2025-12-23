import { hexToPixel } from '$lib/hex';

export function hexBounds(
  seats: { q: number; r: number }[],
  size: number
) {
  const points = seats.map(({ q, r }) =>
    hexToPixel(q, r, size)
  );

  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);

  const minX = Math.min(...xs) - size;
  const maxX = Math.max(...xs) + size;
  const minY = Math.min(...ys) - size;
  const maxY = Math.max(...ys) + size;

  return {
    x: minX - size,
    y: minY - size,
    width: (maxX - minX) + size * 2,
    height: (maxY - minY) + size * 2,
  };
}
