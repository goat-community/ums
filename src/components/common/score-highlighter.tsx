import styled from "styled-components";

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
  background-color: ${(props) =>
    props.score > 6 ? "#4ADD32" : props.score >= 5 ? "#F2E359" : "#ff0017"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  font-size: ${(props) => (props.large ? "19px" : "12px")};
  width: ${(props) => (props.large ? "65px" : "43px")};
  height: ${(props) => (props.large ? "30px" : "22px")};
  border-radius: 15px;
  color: white;
`;
