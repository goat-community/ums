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

const TEXT_COLORS = {
  10: "#000",
  9: "#283648",
  8: "#283648",
  7: "#283648",
  6: "#283648",
  5: "#283648",
  4: "#283648",
  3: "#000",
  2: "#fff",
  1: "#fff",
  0: "#283648",
};

interface ScoreHighLighterProps {
  isochrone_score: number;
  large?: boolean;
  score_type_hint?: boolean;
  with_margin?: boolean;
}

export function ScoreHighLighter(props: ScoreHighLighterProps) {
  const { t } = useTranslation();
  return (
    <ScoreHighlighter
      score={props.isochrone_score}
      large={props.large}
      score_type_hint={props.score_type_hint}
      with_margin={props.with_margin}
    >
      {!props.large && props.score_type_hint && <>{t("insights.score")} </>}
      {props.isochrone_score + "/10"}
    </ScoreHighlighter>
  );
}

const ScoreHighlighter = styled.div<{
  score: number;
  large: boolean;
  score_type_hint: boolean;
  with_margin: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => (props.with_margin ? "10px" : 0)};
  margin-left: ${(props) => (props.score_type_hint ? "-45%" : "0")};
  background-color: ${(props) => `rgb(${COLORS[props.score].join(",")})`};
  font-size: ${(props) => (props.large ? "19px" : "12px")};
  width: ${(props) => (props.large ? "65px" : "90px")};
  height: ${(props) => (props.large ? "30px" : "30px")};
  color: ${(props) => TEXT_COLORS[props.score]};
  border-radius: 15px;
`;
