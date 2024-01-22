import BellIcon from "../icons/BellIcon";

import "./assets/header-notifications-button.scss";

export default function HeaderNotificationsButton() {
  return (
    <button className="header-notifications-button">
      <BellIcon color="#000" size={26} />
    </button>
  );
}
