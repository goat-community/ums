import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { temprorary_close } from "@context/openers";

import { ProfileButton } from "../profile-button";

import Introduction from "./components/introduction";
import Survey from "./components/survey";

export default function Flower() {
  const dispatch = useAppDispatch();
  const temporary_open = useAppSelector((state) => state.openers.flower_open);

  const [pageIndex, setPageIndex] = useState<0 | 1>(0);
  const [flower_open, set_flower_open] = useState<boolean>(false);

  const pages = [
    <Introduction
      key={"introduction"}
      onClickContinue={() => setPageIndex(1)}
      onBackClick={() => {
        set_flower_open(false);
        setPageIndex(0);
        dispatch(temprorary_close("flower_open"));
      }}
    />,
    <Survey
      key="survey"
      onClickBack={() => setPageIndex(0)}
      onDone={() => {
        set_flower_open(false);
        setPageIndex(0);
        dispatch(temprorary_close("flower_open"));
      }}
      onClose={() => {
        set_flower_open(false);
        setPageIndex(0);
        dispatch(temprorary_close("flower_open"));
      }}
    />,
  ];

  return (
    <>
      <ProfileButton on_click={() => set_flower_open((prevState) => !prevState)} />
      {flower_open || temporary_open ? pages[pageIndex] : <></>}
    </>
  );
}
