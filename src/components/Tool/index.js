import React, { useRef, useState } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  ToolArea,
  ToolItemWrapper,
  ToolTitle,
  ToolWrapper,
} from "./StyledTool";
import { currentShape } from "../../recoil";
import { useRecoilState } from "recoil";

function Tool() {
  const handleChange = (e) => {
    setCurrentSVG({ ...currentSVG, ...{ [e.target.name]: e.target.value } });
  };
  const [currentSVG, setCurrentSVG] = useRecoilState(currentShape);

  return (
    <>
      <ToolWrapper>
        <ToolTitle>SVG 그리기 툴</ToolTitle>
        <ToolArea>
          <ToolItemWrapper>
            <Box sx={{ width: 150, height: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">종류</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentSVG.kind}
                  label="kind"
                  name="kind"
                  onChange={handleChange}
                >
                  <MenuItem value="line">선</MenuItem>
                  <MenuItem value="circle">원</MenuItem>
                  <MenuItem value="polygram">다각형</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </ToolItemWrapper>
          <ToolItemWrapper>
            <Box sx={{ width: 150, height: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">색깔</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentSVG.color}
                  label="color"
                  name="color"
                  style={{ color: `${currentSVG.color}` }}
                  onChange={handleChange}
                >
                  <MenuItem style={{ color: "black" }} value="black">
                    검정
                  </MenuItem>
                  <MenuItem style={{ color: "red" }} value="red">
                    빨강
                  </MenuItem>
                  <MenuItem style={{ color: "orange" }} value="orange">
                    주황
                  </MenuItem>
                  <MenuItem style={{ color: "green" }} value="green">
                    초록
                  </MenuItem>
                  <MenuItem style={{ color: "blue" }} value="blue">
                    파랑
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </ToolItemWrapper>
          <ToolItemWrapper>
            <Box sx={{ width: 150, height: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">선 굵기</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentSVG.weight}
                  label="weight"
                  name="weight"
                  onChange={handleChange}
                >
                  <MenuItem value="1">얇게</MenuItem>
                  <MenuItem value="3">보통</MenuItem>
                  <MenuItem value="5">굵게</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </ToolItemWrapper>
          <ToolItemWrapper>
            <Box sx={{ width: 150, height: 100 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">채우기</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentSVG.fillColor}
                  label="fillColor"
                  name="fillColor"
                  style={{ color: `${currentSVG.fillColor}` }}
                  onChange={handleChange}
                >
                  <MenuItem style={{ color: "grey" }} value="none">
                    투명
                  </MenuItem>
                  <MenuItem style={{ color: "black" }} value="black">
                    검정
                  </MenuItem>
                  <MenuItem style={{ color: "red" }} value="red">
                    빨강
                  </MenuItem>
                  <MenuItem style={{ color: "orange" }} value="orange">
                    주황
                  </MenuItem>
                  <MenuItem style={{ color: "green" }} value="green">
                    초록
                  </MenuItem>
                  <MenuItem style={{ color: "blue" }} value="blue">
                    파랑
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </ToolItemWrapper>
          ;
        </ToolArea>
      </ToolWrapper>
    </>
  );
}
export default Tool;
