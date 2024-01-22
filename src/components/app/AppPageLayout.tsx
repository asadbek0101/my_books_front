import { ReactNode } from "react";
import Header from "../header/Header";

import "./assets/app-page-layout.scss";

interface Props {
  readonly children: ReactNode;
}

export default function AppPageLayout({ children }: Props) {
  return (
    <div className="app-page-layout">
      <div className="app-page-header">
        <Header />
      </div>
      <div className="app-page-body container">{children}</div>
    </div>
  );
}
