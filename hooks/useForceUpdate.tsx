import { useCallback, useState } from "react";

const useForceUpdate = () => {
  const forceUpdate = useState(false)[1];

  return useCallback(() => {
    forceUpdate((s) => !s);
  }, []);
};

export default useForceUpdate;
