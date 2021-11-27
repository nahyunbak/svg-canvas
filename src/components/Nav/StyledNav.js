import styled from "styled-components";
import { CenterCenterStyle, horizontalCenterStyle } from "../GlobalStyle";

export const NavWrapper = styled.div`
  width: 100vw;
  height: 100px;
  ${CenterCenterStyle}
`;
//저장버튼, 완료버튼. undo, redo 버튼.

export const NavArea = styled.div`
  width: 900px;
  height: 80px;
  ${horizontalCenterStyle}
  justify-content: space-between;
  background-image: linear-gradient(
    to top,
    #f3e7e9 0%,
    #e3eeff 99%,
    #e3eeff 100%
  );
  background-blend-mode: screen;
  border-radius: 10px;
`;

export const NavFinishOrSaveWrapper = styled.div`
  width: 400px;
  height: 50px;
  ${horizontalCenterStyle}
`;

export const NavFinishButton = styled.div`
  cursor: pointer;
  width: 200px;
  height: 50px;
  font-weight: 600;
  ${CenterCenterStyle}
  border-radius: 10px;
  background-image: linear-gradient(
    -225deg,
    #2cd8d5 0%,
    #c5c1ff 56%,
    #ffbac3 100%
  );
  color: white;
`;

export const NavSaveButton = styled.div`
  cursor: pointer;

  width: 100px;
  height: 50px;
  font-weight: 600;
  ${CenterCenterStyle}
  border-radius: 10px;
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
  color: white;
`;

export const NavDoWrapper = styled.div`
  width: 200px;
  height: 50px;
  ${horizontalCenterStyle}
`;

export const NavUndoButton = styled.div`
  cursor: pointer;
  width: 50px;
  height: 50px;

  ${CenterCenterStyle}
  border-radius: 10px;
  background-image: linear-gradient(
    -225deg,
    #65379b 0%,
    #886aea 53%,
    #6457c6 100%
  );
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
`;
export const NavRedoButton = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;

  ${CenterCenterStyle}
  border-radius: 10px;
  background-image: linear-gradient(
    -225deg,
    #65379b 0%,
    #886aea 53%,
    #6457c6 100%
  );
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
`;
