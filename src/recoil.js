import { atom } from "recoil";

export const svgListState = atom({
  key: "svgListState",
  default: [],
});

export const svgRedoState = atom({
  key: "svgRedoState",
  default: [],
});

export const svgHistoryRedoState = atom({
  key: "svgHistoryRedoState",
  default: [],
});

export const currentShapeDefault = {
  kind: "polygram",
  color: "black",
  weight: "1",
  fillColor: "none",
  dots: [],
};

export const currentShape = atom({
  key: "currentShape",
  default: currentShapeDefault,
});
