import { useCallback, useState } from "react";

export const useBoolean = (initialState: boolean) => {
  const [boolean, setBoolean] = useState(initialState);

  const toggle = useCallback(() => {
    setBoolean(!boolean);
  }, [boolean]);

  const on = useCallback(() => {
    setBoolean(true);
  }, []);

  const off = useCallback(() => {
    setBoolean(false);
  }, []);

  return [
    boolean,
    {
      toggle,
      on,
      off,
    },
  ] as const;
};
