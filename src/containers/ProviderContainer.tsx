import { SWRConfig } from "swr";
import { ReactNode } from "react";
import { useShallowEqualSelector } from "../hooks/useShallowSelector";
import { ApiProvider } from "../api/ApiContext";
import { keySelector, secretSelector } from "../reducers/authReducer";

interface Props {
  readonly children: ReactNode;
}

export function ProviderContainer({ children }: Props) {
  const my_key = useShallowEqualSelector(keySelector);
  const secret = useShallowEqualSelector(secretSelector);

  return (
    <ApiProvider data={{ my_key, secret }}>
      <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>
    </ApiProvider>
  );
}
