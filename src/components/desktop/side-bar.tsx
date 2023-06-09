import { Drawer } from "./drawer";

interface SideBarProps {
  open: boolean;
  children?: React.ReactNode;
}

export function SideBar(props: SideBarProps) {
  const close_drawer = () => {
    return;
  };

  return (
    <Drawer open={props.open} on_close={close_drawer}>
      {props.children || <></>}
    </Drawer>
  );
}
