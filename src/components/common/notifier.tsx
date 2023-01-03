import { useTranslation } from "react-i18next";

import { Button, Snackbar } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { close_notify } from "@context/base/notifier";

import * as D from "@constants/design";

export function NotifierWrapper() {
  const notifierReducer = useAppSelector((state) => state.notifier);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const button_style = { color: D.WHITE_COLOR, minWidth: "auto" };
  const snack_bar_style = {
    bottom: { xs: D.BOTTOM_BAR_HEIGHT + 20, sm: 20, xl: 20, md: 20 },
    maxWidth: "75%",
    zIndex: 3,
  };

  function close_notification() {
    dispatch(close_notify());
  }

  if (notifierReducer.msg) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        key={"bottom" + "right"}
        open={true}
        message={notifierReducer.msg.toString()}
        sx={snack_bar_style}
        onClose={close_notification}
        action={
          <Button
            color="primary"
            size="small"
            sx={button_style}
            onClick={close_notification}
          >
            {t("actions.close")}
          </Button>
        }
      />
    );
  } else {
    return <></>;
  }
}
