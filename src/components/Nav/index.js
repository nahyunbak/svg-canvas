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

function Nav() {
  const [currentSVG, setCurrentSVG] = useRecoilState(currentShape);
  const [currentSVGList, setCurrentSVGList] = useRecoilState(svgListState);
  const [redoSVGList, setRedoSVGList] = useRecoilState(svgRedoState);
  const [historyRedoState, setHistoryRedoState] =
    useRecoilState(svgHistoryRedoState);
  const onClickFinish = () => {
    // 직선일 경우
    // 다각형일 경우
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

  const onClickRedoOrUndo = (e) => {
    if (currentSVG.dots.indexOf("L") !== -1) {
      setCurrentSVG({
        ...currentSVG,
        dots: currentSVG.dots.substring(
          0,
          currentSVG.dots.lastIndexOf("L") - 1
        ),
      });
      setRedoSVGList([
        ...redoSVGList,
        currentSVG.dots.substring(currentSVG.dots.lastIndexOf("L")),
      ]);
      console.log(redoSVGList);
    }
    if (currentSVG.dots.indexOf("L") === -1) {
      setCurrentSVGList(currentSVGList.slice(0, currentSVGList.length - 1));
      setHistoryRedoState([
        ...historyRedoState,
        ...currentSVGList.slice(currentSVGList.length - 1),
      ]);
    }
  };
  // 중복이 되고 있으니까 이 부분을 좀 없애보기 ?
  // redoSVGList에 있는 값이 없어지면
  const onClickRedoOrUndo2 = (e) => {
    if (redoSVGList.length !== 0) {
      console.log(redoSVGList);
      setCurrentSVG({
        ...currentSVG,
        dots: `${currentSVG.dots} ${redoSVGList[redoSVGList.length - 1]}`,
      });
      setRedoSVGList(redoSVGList.slice(0, redoSVGList.length - 1));
    }
    if (redoSVGList.length === 0 && historyRedoState.length !== 0) {
      setCurrentSVGList([
        ...currentSVGList,
        ...historyRedoState.slice(historyRedoState.length - 1),
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
            <NavUndoButton name="undo">
              <IoArrowBack />
            </NavUndoButton>
            <NavRedoButton name="redo">
              <IoArrowForward />
            </NavRedoButton>
          </NavDoWrapper>
        </NavArea>
      </NavWrapper>
    </>
  );
}
export default Nav;
