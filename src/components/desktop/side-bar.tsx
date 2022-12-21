import { Drawer } from "./drawer";

interface SideBarProps {
  open: boolean;
  children?: React.ReactNode;
}

export function SideBar(props: SideBarProps) {
  return <Drawer open={props.open}>{props.children || <></>}</Drawer>;
}
