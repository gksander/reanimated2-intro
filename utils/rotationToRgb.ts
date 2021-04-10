import tinycolor from "tinycolor2";

export const rotationToRgb = (rotation: number): string => {
  "worklet";
  return tinycolor(`hsl(${rotation}, 100%, 50%)`).toRgbString();
};
