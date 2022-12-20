import { Link } from "react-router-dom";
import styled from "styled-components";

import { Button, Typography } from "@mui/material";

import Icon from "@images/icon.png";

export function ProfileButton() {
  return (
    <Section>
      <Link to="/flower">
        <Button variant="contained">
          <img
            src={Icon}
            width="18"
            height="18"
            alt="icon"
            style={{ marginBottom: -2 }}
          />
          <Typography variant="h6" ml={1}>
            My Flower
          </Typography>
        </Button>
      </Link>
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
