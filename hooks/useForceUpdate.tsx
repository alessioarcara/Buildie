import { useCallback, useState } from "react";

export const useForceUpdate = () => {
  const forceUpdate = useState(false)[1];

  return useCallback(() => {
    forceUpdate((s) => !s);
  }, []);
};
