import styled from "styled-components";

const COLORS = {
  10: [50, 136, 189],
  9: [102, 194, 165],
  8: [171, 221, 164],
  7: [230, 245, 152],
  6: [255, 230, 80],
  5: [254, 224, 139],
  4: [253, 174, 97],
  3: [244, 109, 67],
  2: [197, 56, 12],
  1: [125, 36, 8],
  0: [168, 168, 168],
};

interface ScoreHighLighterProps {
  isochrone_score: number;
  large?: boolean;
}

export function ScoreHighLighter(props: ScoreHighLighterProps) {
  return (
    <ScoreHighlighter score={props.isochrone_score} large={props.large}>
      {props.isochrone_score + "/10"}
    </ScoreHighlighter>
  );
}

const ScoreHighlighter = styled.div<{ score: number; large: boolean }>`
  background-color: ${(props) => `rgb(${COLORS[props.score].join(",")})`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  font-size: ${(props) => (props.large ? "19px" : "12px")};
  width: ${(props) => (props.large ? "65px" : "43px")};
  height: ${(props) => (props.large ? "30px" : "22px")};
  border-radius: 15px;
  color: ${(props) => (props.score > 4 ? "black" : "white")};
`;
