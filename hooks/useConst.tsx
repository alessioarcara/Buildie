import { useRef } from "react";

export const useConst = <T,>(initialvalue: T | (() => T)): T => {
  const ref = useRef<{ value: T }>();

  if (ref.current === undefined) {
    ref.current = {
      value:
        typeof initialvalue === "function"
          ? (initialvalue as Function)()
          : initialvalue,
    };
  }

  return ref.current.value;
};
