import { useEffect, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import AuthContainer from "./AuthContainer";
import BooksContainer from "./BooksContainer";
import NotFoundContainer from "./NotFoundContainer";
import { useShallowEqualSelector } from "../hooks/useShallowSelector";
import { keySelector, secretSelector } from "../reducers/authReducer";

export default function AppContainer() {
  const location = useLocation();

  const navigate = useNavigate();

  const secret = useShallowEqualSelector(secretSelector);
  const key = useShallowEqualSelector(keySelector);

  const isAuthourized = useMemo(
    () => Boolean(secret) && Boolean(key),
    [secret, key]
  );

  useEffect(() => {
    if (location.pathname === "/" || !isAuthourized) {
      navigate("/auth");
    }
  }, [navigate, location.pathname, isAuthourized]);

  return (
    <Routes>
      <Route path="/auth" element={<AuthContainer />} />
      {isAuthourized && (
        <Route path="/books/:bookId?" element={<BooksContainer />} />
      )}
      <Route path="*" element={<NotFoundContainer />} />
    </Routes>
  );
}
