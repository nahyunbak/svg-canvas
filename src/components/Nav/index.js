//저장버튼, 완료버튼. undo, redo 버튼.
import React from "react";

import { currentShape } from "../../recoil";
import { useRecoilState } from "recoil";
import {
  NavArea,
  NavDoWrapper,
  NavFinishButton,
  NavFinishOrSaveWrapper,
  NavRedoButton,
  NavSaveButton,
  NavUndoButton,
  NavWrapper,
} from "./StyledNav";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

function Nav() {
  const handleChange = (e) => {
    setCurrentSVG({ ...currentSVG, ...{ [e.target.name]: e.target.value } });
  };
  const [currentSVG, setCurrentSVG] = useRecoilState(currentShape);
  const onClickSave = () => {
    if (currentSVG.dots.length !== 0) {
      setCurrentSVG({
        ...currentSVG,
        dots: `${currentSVG.dots} Z`,
      });
    }
  };
  return (
    <>
      <NavWrapper>
        <NavArea>
          <NavFinishOrSaveWrapper>
            <NavSaveButton onClick={onClickSave}>저장하기</NavSaveButton>
            <NavFinishButton>이번 그림 마무리하기</NavFinishButton>
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
