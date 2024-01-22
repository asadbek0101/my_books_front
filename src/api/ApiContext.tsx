import React, { ReactElement, ReactNode, useContext, useMemo } from "react";
import { API_HOST } from "../constants/AppConstants";

export interface ApiContextDataProps {
  readonly host?: string;
  readonly my_key?: string;
  readonly secret?: string;
  readonly logout?: () => void;
}

export interface ApiContextProps {
  readonly host?: string;
  readonly my_key?: string;
  readonly secret?: string;
  readonly logout?: () => void;
}

export interface ApiProviderProps {
  readonly children: ReactNode;
  readonly data?: ApiContextDataProps;
}

function createContentValue(apiData: ApiContextDataProps): ApiContextProps {
  return {
    ...apiData,
    host: API_HOST,
  };
}

export const ApiContext = React.createContext<ApiContextProps>(
  createContentValue({})
);

export function ApiProvider({
  data = {} as ApiContextDataProps,
  ...props
}: ApiProviderProps): ReactElement<object> {
  const value = useMemo(() => createContentValue(data), [data]);

  return <ApiContext.Provider {...props} value={value} />;
}

export function useApiBase(): ApiContextProps {
  return useContext(ApiContext);
}
