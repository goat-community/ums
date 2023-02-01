import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/context";

import { setFlowerOpen } from "@context/flower";
import { temprorary_close } from "@context/openers";

import { ProfileButton } from "../profile-button";

import Introduction from "./components/introduction";
import Survey from "./components/survey";

export default function Flower() {
  const dispatch = useAppDispatch();
  const temporary_open = useAppSelector((state) => state.openers.flower_open);
  const flower_open = useAppSelector((state) => state.flower.flower_open);
  const [pageIndex, setPageIndex] = useState<0 | 1>(0);

  const pages = [
    <Introduction
      key={"introduction"}
      onClickContinue={() => setPageIndex(1)}
      onBackClick={() => {
        dispatch(setFlowerOpen(false));
        setPageIndex(0);
        dispatch(temprorary_close("flower_open"));
      }}
    />,
    <Survey
      key="survey"
      onClickBack={() => setPageIndex(0)}
      onDone={() => {
        dispatch(setFlowerOpen(false));
        setPageIndex(0);
        dispatch(temprorary_close("flower_open"));
      }}
      onClose={() => {
        dispatch(setFlowerOpen(false));
        setPageIndex(0);
        dispatch(temprorary_close("flower_open"));
      }}
    />,
  ];

  return (
    <>
      <ProfileButton on_click={() => dispatch(setFlowerOpen(!flower_open))} />
      {flower_open || temporary_open ? pages[pageIndex] : <></>}
    </>
  );
}
