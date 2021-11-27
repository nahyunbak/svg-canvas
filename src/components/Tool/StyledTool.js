import styled from "styled-components";
import {
  CenterCenterStyle,
  horizontalCenterStyle,
  verticalCenterStyle,
} from "../GlobalStyle";

export const ToolWrapper = styled.div`
  width: 100vw;
  height: 400px;
  margin-top: 100px;
  ${verticalCenterStyle};
`;

export const ToolTitle = styled.h1`
  font-size: 2rem;
`;
export const ToolArea = styled.div`
  width: 900px;
  height: 300px;
  ${horizontalCenterStyle};
`;

export const ToolItemWrapper = styled.div`
  width: 300px;
  height: 200px;
  ${CenterCenterStyle};
`;
