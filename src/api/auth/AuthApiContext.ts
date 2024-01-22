import { useCallback, useMemo } from "react";

import { useApiBase } from "../ApiContext";
import { AuthApi } from "./AuthApi";
import { useDispatch } from "react-redux";

interface Props {
  readonly AuthApi: AuthApi;
  readonly logout: () => void;
}

export function useAuthContext(): Props {
  const dispatch = useDispatch();
  const data = useApiBase();

  const api = useMemo(() => new AuthApi(data), [data]);

  const logoutHandler = useCallback(() => {}, [dispatch]);

  return {
    AuthApi: api,
    logout: logoutHandler,
  };
}
