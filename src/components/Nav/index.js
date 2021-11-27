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
  NavSaveButton,
  NavUndoButton,
  NavWrapper,
} from "./StyledNav";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useResetRecoilState } from "recoil";

function Nav() {
  const handleChange = (e) => {
    setCurrentSVG({ ...currentSVG, ...{ [e.target.name]: e.target.value } });
  };
  const [currentSVG, setCurrentSVG] = useRecoilState(currentShape);
  const [currentSVGList, setCurrentSVGList] = useRecoilState(svgListState);
  const onClickFinish = () => {
    if (currentSVG.dots.length !== 0) {
      setCurrentSVG({
        ...currentSVG,
        dots: `${currentSVG.dots} Z`,
      });
    }
    setCurrentSVGList([...currentSVGList, currentSVG]);
    setCurrentSVG({ ...currentSVG, dots: "" });

    console.log(currentSVGList);
  };

  return (
    <>
      <NavWrapper>
        <NavArea>
          <NavFinishOrSaveWrapper>
            <NavSaveButton onClick={onClickFinish}>저장하기</NavSaveButton>
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
