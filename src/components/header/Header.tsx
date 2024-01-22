import { useState } from "react";
import Logo from "../ui/Logo";
import HeaderSearchForm from "./HeaderSearchForm";
import HeaderSearchLabel from "./HeaderSearchLabel";
import HeaderNotificationsButton from "./HeaderNotificationsButton";
import HeaderProfileButton from "./HeaderProfileButton";
import "./assets/header.scss";
import HeaderLogoutButton from "./HeaderLogoutButton";

export default function Header() {
  const [searchFormType, setSearchFormType] = useState<"label" | "input">(
    "label"
  );

  return (
    <header>
      <div className="container">
        <div className="logo-and-search-button">
          <Logo />
          {searchFormType === "input" && (
            <HeaderSearchForm
              onChangeFormType={() => setSearchFormType("label")}
            />
          )}
          {searchFormType === "label" && (
            <HeaderSearchLabel
              onChangeFormType={() => setSearchFormType("input")}
            />
          )}
        </div>
        <div className="notifications-and-profile">
          <HeaderNotificationsButton />
          <HeaderProfileButton />
          <HeaderLogoutButton />
        </div>
      </div>
    </header>
  );
}
