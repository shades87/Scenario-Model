import type { Seat } from '$lib/data/electorates';

const clamp = (n: number) => Math.max(0, Math.min(1, n));

export function projectSeat(seat: Seat, nationalAlpSwing: number) {
  const delta = nationalAlpSwing * seat.alpSwingFactor;

  let a = seat.tcp.a;
  let b = seat.tcp.b;

  // If ALP is partyA, it benefits directly
  if (seat.tcp.partyA === 'ALP') {
    a += delta;
    b -= delta;
  }

  // If ALP is partyB
  else if (seat.tcp.partyB === 'ALP') {
    b += delta;
    a -= delta;
  }

  // Otherwise ALP not in the contest → indirect effect
  else {
    // small generic drift away from Coalition
    if (seat.tcp.partyA === 'LNP') {
      a -= delta;
      b += delta;
    } else if (seat.tcp.partyB === 'LNP') {
      b -= delta;
      a += delta;
    }
  }

  return {
    ...seat,
    projectedTcp: {
      a: clamp(a),
      b: clamp(b)
    }
  };
}

export function winner(seat: ReturnType<typeof projectSeat>) {
  return seat.projectedTcp.a >= 0.5
    ? seat.tcp.partyA
    : seat.tcp.partyB;
}
