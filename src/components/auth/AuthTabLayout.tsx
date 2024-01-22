import { ReactNode } from "react";
import "./assets/auth-tab-layout.scss";

interface Props {
  readonly children: ReactNode;
}

export default function AuthTabLayout({ children }: Props) {
  return (
    <div className="auth-tab-layout">
      <div className="auth-tab-box">{children}</div>
    </div>
  );
}
