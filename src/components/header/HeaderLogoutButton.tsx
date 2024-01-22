import { useDispatch } from "react-redux";
import { SetMySecret, setMyKey } from "../../reducers/authReducer";
import Button from "../ui/Button";

export default function HeaderLogoutButton() {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(setMyKey({ my_key: "" }));
        dispatch(SetMySecret({ secret: "" }));
        window.location.reload();
      }}
    >
      Logout
    </Button>
  );
}
