import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { currentShape, svgListState } from "../../recoil";
import {
  CanvasArea,
  CanvasWrapper,
  MovingImg,
  PenImgReal,
} from "./StyledCanvas";

function Canvas() {
  const [movingDot, setMovingDot] = useState([0, 0]);

  const drawInput = useRef([]);
  const cursorInput = useRef(null);
  // 색깔, 클릭 종류 선택 뒤,
  const [currentSVG, setCurrentSVG] = useRecoilState(currentShape);
  const [currentSVGList, setCurrentSVGList] = useRecoilState(svgListState);

  const [hello, setHello] = useState({
    drawType: "",
    drawColor: "",
    drawWeight: "",
    startDot: [],
    endDot: [],
  });

  //드래그 앤 드랍의 각 값을 기록하고, 그것으로 '새로운' 무언가를 만들어서 선을 그린다.
  const SVGHistory = currentSVGList.map((item) => {
    if (item.kind === "line") {
      return `<path d=${currentSVG.dots} stroke=${currentSVG.color} fill=${currentSVG.fillColor} stroke-width=${currentSVG.weight} />`;
    }
  });

  const onClick = (e) => {
    if (currentSVG.kind === "polygram" || currentSVG.kind === "line") {
      setCurrentSVG({
        ...currentSVG,
        dots: [
          ...currentSVG.dots,
          `${e.clientX - cursorInput.current.getBoundingClientRect().left}, ${
            e.clientY - cursorInput.current.getBoundingClientRect().top
          }`,
        ],
      });
    }
    if (currentSVG.kind === "circle") {
      if (currentSVG.dots.length <= 2) {
        setCurrentSVG({
          ...currentSVG,
          dots: [
            ...currentSVG.dots,
            `${e.clientX - cursorInput.current.getBoundingClientRect().left}, ${
              e.clientY - cursorInput.current.getBoundingClientRect().top
            }`,
          ],
        });
      }
      if (currentSVG.dots.length > 2) {
        setCurrentSVG({
          ...currentSVG,
          dots: [
            `${e.clientX - cursorInput.current.getBoundingClientRect().left}, ${
              e.clientY - cursorInput.current.getBoundingClientRect().top
            }`,
          ],
        });
      }
    }
  };
  /**
 * <path
  d={item.dots}
  stroke={item.color}
  fill={item.fillColor}
  stroke-width={item.weight}
/>;

 */
  return (
    <>
      <CanvasWrapper>
        <CanvasArea onClick={onClick} ref={cursorInput}>
          <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
            {currentSVG.kind === "polygram" && currentSVG.dots.length !== 0 ? (
              <polygon
                points={currentSVG.dots.join(" ")}
                stroke={currentSVG.color}
                fill={currentSVG.fillColor}
                stroke-width={currentSVG.weight}
              />
            ) : (
              ""
            )}

            {currentSVGList.map((item) => {
              console.log(1);
              if (item.kind === "polygram") {
                return (
                  <polygon
                    points={item.dots.join(" ")}
                    stroke={item.color}
                    fill={item.fillColor}
                    stroke-width={item.weight}
                  />
                );
              }
            })}
          </svg>
        </CanvasArea>
      </CanvasWrapper>
    </>
  );
}
export default Canvas;
