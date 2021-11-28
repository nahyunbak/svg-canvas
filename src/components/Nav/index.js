//저장버튼, 완료버튼. undo, redo 버튼.
import React from "react";

import {
  currentShape,
  currentShapeDefault,
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
import { useResetRecoilState } from "recoil";
import { set } from "mongoose";

function Nav() {
  const [currentSVG, setCurrentSVG] = useRecoilState(currentShape);
  const [currentSVGList, setCurrentSVGList] = useRecoilState(svgListState);
  const [redoSVGList, setRedoSVGList] = useRecoilState(svgRedoState);
  const [historyRedoState, setHistoryRedoState] =
    useRecoilState(svgHistoryRedoState);

  //그림 마무리 기능
  const onClickFinish = () => {
    console.log(currentSVGList);
    if (currentSVG.dots.length !== 0) {
      setCurrentSVGList([...currentSVGList, currentSVG]);
    }
    setCurrentSVG({ ...currentSVG, dots: "" });
    console.log(svgFileContents, 1);
  };

  //저장 기능

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
  const svgFile = `
    <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
    ${svgFileContents}
    </svg>
`;
  const blob = new Blob([svgFile], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  //reset 기능
  const onClickReset = () => {
    setCurrentSVGList([]);
    setCurrentSVG({ ...currentSVG, dots: "" });
  };

  //undo 기능
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

  //redo 기능
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
