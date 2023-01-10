import * as React from "react";
import { useTranslation } from "react-i18next";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { convert_to_pascal } from "@utils";

export function CustomizedAccordions(props: { titles: string[]; values: string[] }) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const { t } = useTranslation();

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      {props.titles.map((title, index: number) => (
        <Accordion
          key={title}
          expanded={expanded === title}
          onChange={handleChange(title)}
        >
          <AccordionSummary aria-controls={`${title}-content`} id={`${title}-header`}>
            <Typography>{convert_to_pascal(title)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {t("profile.reach")} {props.values[index]} {t("profile.minutes")}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
