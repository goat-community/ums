import { useTranslation } from "react-i18next";
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
  score_type_hint?: boolean;
}

export function ScoreHighLighter(props: ScoreHighLighterProps) {
  const { t } = useTranslation();
  return (
    <ScoreHighlighter
      score={props.isochrone_score}
      large={props.large}
      score_type_hint={props.score_type_hint}
    >
      {!props.large && props.score_type_hint && (
        <>
          {t("isochrone.modes.standard")} {t("insights.score")}{" "}
        </>
      )}
      {props.isochrone_score + "/10"}
    </ScoreHighlighter>
  );
}

const ScoreHighlighter = styled.div<{
  score: number;
  large: boolean;
  score_type_hint: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  margin-left: ${(props) => (props.score_type_hint ? "-45%" : "0")};
  background-color: ${(props) => `rgb(${COLORS[props.score].join(",")})`};
  font-size: ${(props) => (props.large ? "19px" : "12px")};
  width: ${(props) => (props.large ? "65px" : "140px")};
  height: ${(props) => (props.large ? "30px" : "30px")};
  color: ${(props) => (props.score > 4 ? "black" : "white")};
  border-radius: 15px;
`;
