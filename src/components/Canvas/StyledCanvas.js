import styled from "styled-components";
import { CenterCenterStyle } from "../GlobalStyle";

export const CanvasWrapper = styled.div`
  width: 100vw;
  height: 700px;
  ${CenterCenterStyle};
`;

export const CanvasArea = styled.div`
  width: 500px;
  height: 500px;
  border: 2px solid black;
`;

export const PenImgReal = styled.div`
  position: absolute;
  cursor: pointer;
  top: ${(props) => (props.movingDot[1] ? `${props.movingDot[1] + 80}px` : "")};
  left: ${(props) =>
    props.movingDot[0] ? `${props.movingDot[0] - 25}px` : ""};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;
  z-index: 1000;
`;

export const MovingImg = styled.div`
  cursor: pointer;
  top: ${(props) => (props.movingImg[1] ? `${props.movingImg[1] - 25}px` : "")};
  left: ${(props) =>
    props.movingImg[0] ? `${props.movingImg[0] - 25}px` : ""};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;
`;
