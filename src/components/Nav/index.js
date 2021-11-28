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
  const onClickFinish = () => {
    // 직선일 경우
    // 다각형일 경우
    console.log(currentSVGList);
    if (currentSVG.dots.length !== 0) {
      setCurrentSVGList([...currentSVGList, currentSVG]);
    }
    setCurrentSVG({ ...currentSVG, dots: "" });
    // 원일 경우
  };

  const onClickReset = () => {
    setCurrentSVGList([]);
    setCurrentSVG({ ...currentSVG, dots: "" });
  };

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
  // 중복이 되고 있으니까 이 부분을 좀 없애보기 ?
  // redoSVGList에 있는 값이 없어지면
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
            <NavSaveButton>저장하기</NavSaveButton>
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
