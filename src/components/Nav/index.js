//저장버튼, 완료버튼. undo, redo 버튼.
import React from "react";

import {
  currentShape,
  svgHistoryRedoState,
  svgListState,
  svgRedoState,
} from "../../recoil";
import { useRecoilState } from "recoil";
import {
  NavArea,
  NavDoWrapper,
  NavFinishButton,
  NavFinishOrSaveWrapper,
  NavRedoButton,
  NavResetButton,
  NavSaveButton,
  NavSaveLink,
  NavUndoButton,
  NavWrapper,
} from "./StyledNav";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

function Nav() {
  // 현재 svg 도형 정보를 저장한 recoil 값
  const [currentSVG, setCurrentSVG] = useRecoilState(currentShape);

  // svg 도형의 history를 저장한 recoil 값
  const [currentSVGList, setCurrentSVGList] = useRecoilState(svgListState);

  // 현재 도형의 redo 정보를 저장한 recoil 값. 다른 요소가 일치하므로 ["좌표", "좌표"... ] 등 좌표만 관리한다.
  const [redoSVGList, setRedoSVGList] = useRecoilState(svgRedoState);

  // svg 도형의 history를 저장한 recoil 값
  const [historyRedoState, setHistoryRedoState] =
    useRecoilState(svgHistoryRedoState);

  // onClick함수들. 이벤트 위임은 사용하지 않았다.
  //그림 마무리 기능 onClick함수
  const onClickFinish = () => {
    console.log(currentSVGList);
    if (currentSVG.dots.length !== 0) {
      setCurrentSVGList([...currentSVGList, currentSVG]);
    }
    setCurrentSVG({ ...currentSVG, dots: "" });
    console.log(svgFileContents, 1);
  };
  //reset 기능 onClick함수
  const onClickReset = () => {
    setCurrentSVGList([]);
    setCurrentSVG({ ...currentSVG, dots: "" });
  };

  //undo 기능 onClick함수
  const onClickUndo = (e) => {
    if (currentSVG.dots.length !== 0) {
      setCurrentSVG({
        ...currentSVG,
        dots: currentSVG.dots.slice(0, currentSVG.dots.length - 1),
      });
      setRedoSVGList([
        ...redoSVGList,
        currentSVG.dots[currentSVG.dots.length - 1],
      ]);
    }
    if (currentSVG.dots.length === 0) {
      setCurrentSVGList(currentSVGList.slice(0, currentSVGList.length - 1));
      setRedoSVGList([]);
      setHistoryRedoState([
        ...historyRedoState,
        currentSVGList[currentSVGList.length - 1],
      ]);
    }
  };

  //redo 기능 onClick함수
  const onClickRedo = (e) => {
    if (redoSVGList.length !== 0) {
      setCurrentSVG({
        ...currentSVG,
        dots: [...currentSVG.dots, redoSVGList[redoSVGList.length - 1]],
      });
      setRedoSVGList({
        ...redoSVGList,
        dotS: redoSVGList.dots.slice(0, redoSVGList.dots.length - 1),
      });
    }
    if (redoSVGList.length === 0) {
      setCurrentSVG({
        ...currentSVG,
        dots: [],
      });
      setCurrentSVGList([
        ...currentSVGList,
        historyRedoState[historyRedoState.length - 1],
      ]);
      setHistoryRedoState(
        historyRedoState.slice(0, historyRedoState.length - 1)
      );
    }
  };

  // 저장 구현 1- svg 태그 내부의 정보를 map으로 추출
  const svgFileContents = currentSVGList.map((item) => {
    if (item.kind === "circle") {
      return `<circle
          cx="${item.dots[0][0]}"
          cy="${item.dots[0][1]}"
          r="${Math.sqrt(
            Math.pow(Math.abs(item.dots[0][0] - item.dots[1][0]), 2) +
              Math.pow(Math.abs(item.dots[0][1] - item.dots[1][1]), 2)
          )}"
        />`;
    }
    if (item.kind === "polygram") {
      return `<polygon
          points="${item.dots.join(" ")}"
          stroke="${item.color}"
          fill="${item.fillColor}"
          stroke-width="${item.weight}"
        />`;
    }
    if (item.kind === "line") {
      return `<line
          x1="${item.dots[0][0]}"
          y1="${item.dots[0][1]}"
          x2="${item.dots[1][0]}"
          y2="${item.dots[1][1]}"
          stroke="${item.color}"
        ></line>`;
    }
  });
  // 저장 구현 2- svg 태그 내부의 정보를 svg 태그 사이에 끼어넣기
  const svgFile = `
    <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
    ${svgFileContents}
    </svg>
`;
  // 저장 구현 3- Blob를 사용하여 url 생성,
  // 이후 jsx 리턴값에 <a href={url} download>다운로드</a> 와 같이 사용한다.

  const blob = new Blob([svgFile], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  return (
    <>
      <NavWrapper>
        <NavArea>
          <NavFinishOrSaveWrapper>
            <NavSaveButton>
              <NavSaveLink href={url} download>
                저장하기
              </NavSaveLink>
            </NavSaveButton>
            <NavFinishButton onClick={onClickFinish}>
              이번 그림 마무리하기
            </NavFinishButton>
            <NavResetButton onClick={onClickReset}>리셋하기</NavResetButton>
          </NavFinishOrSaveWrapper>

          <NavDoWrapper>
            <NavUndoButton name="undo" onClick={onClickUndo}>
              <IoArrowBack />
            </NavUndoButton>
            <NavRedoButton name="redo" onClick={onClickRedo}>
              <IoArrowForward />
            </NavRedoButton>
          </NavDoWrapper>
        </NavArea>
      </NavWrapper>
    </>
  );
}
export default Nav;
