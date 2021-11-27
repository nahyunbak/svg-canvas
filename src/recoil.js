import { atom } from "recoil";

export const svgListState = atom({
  key: "svgListState",
  default: [],
});

export const svgRedoState = atom({
  key: "svgRedoState",
  default: [],
});

export const currentShape = atom({
  key: "currentShape",
  default: {
    kind: "line",
    color: "black",
    weight: "light",
    fillColor: "none",
    dots: "",
  },
});
