import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Button, Typography } from "@mui/material";

import Icon from "@images/icon.png";

interface ProfileButtonProps {
  on_click: () => void;
}

export function ProfileButton(props: ProfileButtonProps) {
  const { t } = useTranslation();

  return (
    <Section>
      <Button variant="contained" onClick={props.on_click} size="large">
        <img src={Icon} width="22" height="22" alt="icon" style={{ marginBottom: 2 }} />
        <Typography variant="h5" color="white" ml={1}>
          {t("actions.flower")}
        </Typography>
      </Button>
    </Section>
  );
}

const Section = styled.section`
  z-index: 2;
  position: fixed;
  padding-right: env(safe-area-inset-right, 70px);
  padding-top: env(safe-area-inset-bottom, 70px);
  top: 50px;
  right: 50px;
`;
