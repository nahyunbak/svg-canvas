import { atom } from "recoil";

/** svgListState : 스택 (선입후출)
[
  { kind: "polygram",
    color: "black", 
    weight: "1", 
    fillColor: "none",
    dots: ["x1좌표, y1좌표", "x2좌표, y2좌표", "x3좌표, y3좌표"..],
  }, 
   { kind: "circle",
    color: "black", 
    weight: "1", 
    fillColor: "none",
    dots: [[x1좌표, y1좌표], [x2좌표, y2좌표]];
  }, 
  { kind: "line",
    color: "black", 
    weight: "1", 
    fillColor: "none",
   [[x1좌표, y1좌표], [x2좌표, y2좌표]];
  }, 
  ...
]
 */

export const svgListState = atom({
  key: "svgListState",
  default: [],
});

/** svgRedoState: 스택 (선입후출)
[
  ["x1좌표, y1좌표"],

  ["x1좌표, y1좌표"],
]
 */

export const svgRedoState = atom({
  key: "svgRedoState",
  default: [],
});

/** svgHistoryRedoState : 스택 (선입후출)
[
  { kind: "polygram",
    color: "black", 
    weight: "1", 
    fillColor: "none",
    dots: ["x1좌표, y1좌표", "x2좌표, y2좌표", "x3좌표, y3좌표"..],
  }, 
   { kind: "circle",
    color: "black", 
    weight: "1", 
    fillColor: "none",
    dots: [[x1좌표, y1좌표], [x2좌표, y2좌표]];
  }, 
  { kind: "line",
    color: "black", 
    weight: "1", 
    fillColor: "none",
   [[x1좌표, y1좌표], [x2좌표, y2좌표]];
  }, 
  ...
]
 */

export const svgHistoryRedoState = atom({
  key: "svgHistoryRedoState",
  default: [],
});

// polygram dots : ["x1좌표, y1좌표", "x2좌표, y2좌표", "x3좌표, y3좌표"..]
// line dots : [[x1좌표, y1좌표], [x2좌표, y2좌표]]
// circle dots :[[x1좌표, y1좌표],  [x2좌표, y2좌표]]
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
