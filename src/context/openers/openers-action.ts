import { close, open } from "./openers-reducer";

export function temprorary_open(component_to_open: string) {
  return (dispatch: CallableFunction) => {
    dispatch(open(component_to_open));
  };
}

export function temprorary_close(component_to_close: string) {
  return (dispatch: CallableFunction) => {
    dispatch(close(component_to_close));
  };
}
