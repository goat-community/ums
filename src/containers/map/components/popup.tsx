import { useTranslation } from "react-i18next";
import { Popup } from "react-map-gl";

import { Close } from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { setPopupInfo } from "@context/map";

export default function PopupTooltip() {
  const { t } = useTranslation();
  const popupInfo = useAppSelector((state) => state.map.popupInfo);
  const picking_mode = useAppSelector((state) => state.map.picking_mode);

  const dispatch = useAppDispatch();

  if (!popupInfo) return <></>;

  if (picking_mode) return <></>;

  return (
    <Popup
      style={{
        zIndex: 20,
        minWidth: "220px",
        padding: "0px",
      }}
      maxWidth="320px"
      anchor="bottom"
      longitude={Number(popupInfo.longitude)}
      latitude={Number(popupInfo.latitude)}
      closeButton={false}
      onClose={() => dispatch(setPopupInfo(null))}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 300,
        }}
      >
        <Box position="absolute" top={5} right={5}>
          <IconButton onClick={() => dispatch(setPopupInfo(null))}>
            <Close />
          </IconButton>
        </Box>
        <Typography sx={{ m: 1 }} variant="h4">
          {popupInfo.title}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Table size="small">
          <TableBody>
            {popupInfo.content &&
              Object.keys(popupInfo.content)
                .filter((k) => k !== "color")
                .map((key) => (
                  <TableRow key={popupInfo.uid}>
                    <TableCell align="left" component="th" scope="row">
                      {t(`popup.${key}`).toUpperCase()}
                    </TableCell>
                    {!popupInfo.content["score"] && (
                      <TableCell align="left">{popupInfo.content[key]}</TableCell>
                    )}
                    {popupInfo.content["score"] && (
                      <Chip
                        label={popupInfo.content["score"]}
                        clickable={false}
                        sx={{
                          mb: 1,
                        }}
                        style={{
                          backgroundColor: `rgb(${popupInfo.content[
                            "color"
                          ].toString()})`,
                          color:
                            parseInt(popupInfo.content["score"]?.split(" / ")[0]) < 4
                              ? "white"
                              : "black",
                        }}
                      />
                    )}
                    <Divider />
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Paper>
    </Popup>
  );
}
