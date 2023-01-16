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
      <Button variant="contained" onClick={props.on_click}>
        <img src={Icon} width="18" height="18" alt="icon" style={{ marginBottom: 1 }} />
        <Typography variant="h6" ml={1}>
          {t("actions.flower")}
        </Typography>
      </Button>
    </Section>
  );
}

const Section = styled.section`
  z-index: 2;
  position: fixed;
  padding-right: env(safe-area-inset-right, 50px);
  padding-top: env(safe-area-inset-bottom, 50px);
  top: 50px;
  right: 50px;
`;
