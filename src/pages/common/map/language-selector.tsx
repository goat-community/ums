import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Paper } from "@mui/material";
import Fab from "@mui/material/Fab";

import * as D from "@constants/design";

import ArrowPopper from "@pages/common/map/arrow-popper";

import ListTile from "./list-tile";

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const items = [
    {
      value: "english",
      title: "English",
      thumbnail: "https://i.imgur.com/GSmdPhLm.png",
    },
    {
      value: "deutsch",
      title: "Deutsch",
      thumbnail: "https://i.imgur.com/2fdveV0m.png",
    },
  ];
  const abbreviations = {
    english: "en",
    deutsch: "de",
  };
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(() => {
    let abbreviationValue = i18n.language;
    if (abbreviationValue === "en-US") {
      abbreviationValue = "en";
    }
    const language = Object.keys(abbreviations).find(
      (key) => abbreviations[key] === abbreviationValue
    );
    const itemIndex = items.findIndex((item) => item.value === language);
    return [itemIndex];
  });

  return (
    <>
      <ArrowPopper
        content={
          <Paper sx={{ maxWidth: 300, overflow: "auto" }}>
            <ListTile
              items={items}
              selected={selected}
              thumbnailBorder="circular"
              thumbnailWidth={30}
              thumbnailHeight={30}
              onChange={(value) => {
                setSelected(value);
                setOpen(false);
              }}
            />
          </Paper>
        }
        open={open}
        placement="top"
        arrow={false}
        onClose={() => setOpen(false)}
      >
        <Fab
          onClick={() => {
            if (items.length > 2) {
              setOpen(!open);
            } else {
              const languageIndex = selected[0] === 0 ? 1 : 0;
              setSelected([languageIndex]);
              const lang = abbreviations[items[languageIndex].value];
              i18n.changeLanguage(lang);
            }
          }}
          size="small"
          sx={{ backgroundColor: D.WHITE_COLOR, color: D.BLACK_COLOR }}
        >
          <img
            style={{ borderRadius: "50%" }}
            width={26}
            height={26}
            src={items[selected[0]].thumbnail}
          />
        </Fab>
      </ArrowPopper>
    </>
  );
}
