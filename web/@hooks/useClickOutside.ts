import { useEffect } from "react";

const useClickOutside = (
  onClickOutside: () => void,
  ele: string | HTMLElement
) => {
  const element = typeof ele === "string" ? document.getElementById(ele) : ele;

  useEffect(() => {
    const onClick = (evt) => {
      if (
        element &&
        (evt.target === element || element?.contains(evt.target as Node))
      )
        return;
      onClickOutside();
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [element]);
};

export default useClickOutside;
