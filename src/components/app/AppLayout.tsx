import { ReactNode } from "react";
import "./assets/app-layout.scss";

interface Props {
  readonly children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="app-layout">
      <div className="app-layout-background"></div>
      <div className="app-layout-body">{children}</div>
    </div>
  );
}
