import { useEffect, useState } from "react";

export function useIsMobile() {
  const [is_mobile, set_is_mobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.screen.width <= 780) {
      set_is_mobile(true);
    } else {
      set_is_mobile(false);
    }
  }, []);

  return is_mobile;
}
