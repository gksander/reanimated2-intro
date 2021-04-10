export const clamp = (x: number, min: number, max: number): number => {
  "worklet";
  if (x < min) return min;
  if (x > max) return max;
  return x;
};
