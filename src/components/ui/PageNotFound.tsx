import { useNavigate } from "react-router-dom";
import "./assets/page-not-found.scss";
import Button from "./Button";

export default function PageNotFound() {
  const naviagate = useNavigate();

  return (
    <div className="w-100 h-100 page-not-found-page d-flex justify-content-center align-items-center">
      <div className="page-not-found-box">
        <div className="page-not-found-image">
          <img
            src={require("./assets/page_not_found.png")}
            width="100%"
            height="100%"
            alt=""
          />
        </div>
        <div className="mt-4 d-flex justify-content-center gap-3">
          <button
            className="go_to_home_button"
            onClick={() => naviagate("books")}
          >
            Go Home Page
          </button>
          <button
            className="reload_button"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
