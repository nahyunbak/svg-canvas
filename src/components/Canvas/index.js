import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { currentShape } from "../../recoil";
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

  const [hello, setHello] = useState({
    drawType: "",
    drawColor: "",
    drawWeight: "",
    startDot: [],
    endDot: [],
  });

  //드래그 앤 드랍의 각 값을 기록하고, 그것으로 '새로운' 무언가를 만들어서 선을 그린다.

  const onClick = (e) => {
    if (currentSVG.dots.length === 0) {
      setCurrentSVG({
        ...currentSVG,
        dots: `M${
          e.clientX - cursorInput.current.getBoundingClientRect().left
        } ${e.clientY - cursorInput.current.getBoundingClientRect().top}`,
      });
    }
    if (currentSVG.dots.length !== 0) {
      setCurrentSVG({
        ...currentSVG,
        dots: `${currentSVG.dots} L${
          e.clientX - cursorInput.current.getBoundingClientRect().left
        } ${e.clientY - cursorInput.current.getBoundingClientRect().top}`,
      });
    }
    console.log(currentSVG);
    //컨트롤러 만들기 :
    // 모양 선택 :
    // 선, 사각형, 원, 곡선, 다각형
    // 색깔 선택 :
    // 검은색(기본)
    // 저장 버튼 - RECOIL에 모양 및 색깔, 좌표 정보와 함께 올리기. 이때 데이터 타입은 배열.
    // JSX에서 배열 순회하며 SVG 파일 만들어주기.
    // RECOIL에 완성된 SVG파일 저장하고, 이 파일을 다운로드 하면 된다.
    // 할 때마다 점이 생기고, 이 점으로 직선도 그리고, 사각형도 그리고..
    // 원도 그리고, 그러자."M94 95 L401 101 L389 330 L102 318 Z";
    // 이번 그림 마무리하기, 를 누르는 순간 Z를 추가하고, 채우기도 넣는다.
  };
  const mouseMove = (e) => {
    setMovingDot([e.clientX, e.clientY]);
  };

  return (
    <>
      <CanvasWrapper>
        <CanvasArea onMouseMove={mouseMove} onClick={onClick} ref={cursorInput}>
          <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
            <path
              d={currentSVG.dots}
              stroke="black"
              fill="none"
              stroke-width="4"
            />
          </svg>
        </CanvasArea>
      </CanvasWrapper>
    </>
  );
}
export default Canvas;
