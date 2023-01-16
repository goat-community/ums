import { useState } from "react";

import { ProfileButton } from "../profile-button";

import Introduction from "./components/introduction";
import Survey from "./components/survey";

export default function Flower() {
  const [pageIndex, setPageIndex] = useState<0 | 1>(0);
  const [flower_open, set_flower_open] = useState<boolean>(false);

  const pages = [
    <Introduction
      key={"introduction"}
      onClickContinue={() => setPageIndex(1)}
      onBackClick={() => {
        set_flower_open(false);
        setPageIndex(0);
      }}
    />,
    <Survey
      key="survey"
      onClickBack={() => setPageIndex(0)}
      onDone={() => {
        set_flower_open(false);
        setPageIndex(0);
      }}
      onClose={() => {
        set_flower_open(false);
        setPageIndex(0);
      }}
    />,
  ];

  return (
    <>
      <ProfileButton on_click={() => set_flower_open((prevState) => !prevState)} />
      {flower_open ? pages[pageIndex] : <></>}
    </>
  );
}
