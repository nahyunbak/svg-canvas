import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { currentShape, svgListState } from "../../recoil";
import { CanvasArea, CanvasWrapper } from "./StyledCanvas";

function Canvas() {
  // cursor 값 잡기
  const cursorInput = useRef(null);
  // recoil 상태관리
  const [currentSVG, setCurrentSVG] = useRecoilState(currentShape);
  const [currentSVGList, setCurrentSVGList] = useRecoilState(svgListState);

  // CanvasArea 클릭시 좌표 잡는 onClick 함수
  const onClick = (e) => {
    if (currentSVG.kind === "polygram") {
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
      if (currentSVG.dots.length < 2) {
        setCurrentSVG({
          ...currentSVG,
          dots: [
            ...currentSVG.dots,
            [
              e.clientX - cursorInput.current.getBoundingClientRect().left,
              e.clientY - cursorInput.current.getBoundingClientRect().top,
            ],
          ],
        });
      }
      if (currentSVG.dots.length >= 2) {
        setCurrentSVG({
          ...currentSVG,
          dots: [
            [
              e.clientX - cursorInput.current.getBoundingClientRect().left,
              e.clientY - cursorInput.current.getBoundingClientRect().top,
            ],
          ],
        });
      }
    }
    if (currentSVG.kind === "line") {
      console.log(currentSVG.dots);
      if (currentSVG.dots.length < 2) {
        setCurrentSVG({
          ...currentSVG,
          dots: [
            ...currentSVG.dots,
            [
              e.clientX - cursorInput.current.getBoundingClientRect().left,
              e.clientY - cursorInput.current.getBoundingClientRect().top,
            ],
          ],
        });
      }
      if (currentSVG.dots.length >= 2) {
        setCurrentSVG({
          ...currentSVG,
          dots: [],
        });
      }
    }
  };

  return (
    <>
      <CanvasWrapper>
        <CanvasArea onClick={onClick} ref={cursorInput}>
          <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
            // 종류에 따라 현재 도형을 그린다.
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
            {currentSVG.kind === "circle" && currentSVG.dots.length === 2 ? (
              <circle
                cx={currentSVG.dots[0][0]}
                cy={currentSVG.dots[0][1]}
                r={Math.sqrt(
                  Math.pow(
                    Math.abs(currentSVG.dots[0][0] - currentSVG.dots[1][0]),
                    2
                  ) +
                    Math.pow(
                      Math.abs(currentSVG.dots[0][1] - currentSVG.dots[1][1]),
                      2
                    )
                )}
                stroke={currentSVG.color}
                fill={currentSVG.fillColor}
                stroke-width={currentSVG.weight}
              />
            ) : (
              ""
            )}
            {currentSVG.kind === "line" && currentSVG.dots.length === 2 ? (
              <line
                x1={currentSVG.dots[0][0]}
                y1={currentSVG.dots[0][1]}
                x2={currentSVG.dots[1][0]}
                y2={currentSVG.dots[1][1]}
                stroke={currentSVG.color}
                stroke-width={currentSVG.weight}
              ></line>
            ) : (
              ""
            )}
            // 이전에 그렸던 도형을 map 함수를 통해 보여준다. 종류별로 도형이
            다르다.
            {currentSVGList.map((item) => {
              if (item.kind === "circle") {
                return (
                  <circle
                    cx={item.dots[0][0]}
                    cy={item.dots[0][1]}
                    r={Math.sqrt(
                      Math.pow(Math.abs(item.dots[0][0] - item.dots[1][0]), 2) +
                        Math.pow(Math.abs(item.dots[0][1] - item.dots[1][1]), 2)
                    )}
                    stroke={item.color}
                    fill={item.fillColor}
                    stroke-width={item.weight}
                  />
                );
              }
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
              if (item.kind === "line") {
                return (
                  <line
                    x1={item.dots[0][0]}
                    y1={item.dots[0][1]}
                    x2={item.dots[1][0]}
                    y2={item.dots[1][1]}
                    stroke={item.color}
                    stroke-width={item.weight}
                  ></line>
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
