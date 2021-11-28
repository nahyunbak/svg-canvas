//저장버튼, 완료버튼. undo, redo 버튼.
import React from "react";

import { currentShape, currentShapeDefault, svgListState } from "../../recoil";
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
  const onClickFinish = () => {
    if (currentSVG.dots.length !== 0) {
      setCurrentSVGList([
        ...currentSVGList,
        {
          ...currentSVG,
          dots: `${currentSVG.dots} Z`,
        },
      ]);
    }
    setCurrentSVG({ ...currentSVG, dots: "" });
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
            <NavResetButton>리셋하기</NavResetButton>
          </NavFinishOrSaveWrapper>

          <NavDoWrapper>
            <NavUndoButton>
              <IoArrowBack />
            </NavUndoButton>
            <NavRedoButton>
              <IoArrowForward />
            </NavRedoButton>
          </NavDoWrapper>
        </NavArea>
      </NavWrapper>
    </>
  );
}
export default Nav;
