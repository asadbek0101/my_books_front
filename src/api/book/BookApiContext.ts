import { useMemo } from "react";

import { useApiBase } from "../ApiContext";
import { BookApi } from "./BookApi";

interface Props {
  readonly BookApi: BookApi;
}

export function useBookContext(): Props {
  const data = useApiBase();

  const api = useMemo(() => new BookApi(data), [data]);

  return {
    BookApi: api,
  };
}
