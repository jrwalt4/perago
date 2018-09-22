export function floorNearest(value: number, increment: number): number {
  return Math.floor(value / increment) * increment;
}
