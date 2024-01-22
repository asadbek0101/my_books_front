import { useCallback, useState } from "react";
import { LoginProps, RegisterProps } from "../../api/auth/AuthDto";
import { useNavigate } from "react-router-dom";
import { request } from "../../api/request";
import { useDispatch } from "react-redux";
import { SetMySecret, setMyKey } from "../../reducers/authReducer";
import { toast } from "react-toastify";

import AuthLoginForm from "./AuthLoginForm";
import AuthRegisterForm from "./AuthRegisterForm";

export default function AuthFormWrapper() {
  const [formType, setFormType] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [initialValuesLogin, setInitialValuesLogin] = useState<LoginProps>({
    username: "",
    password: "",
  });

  const [initialValuesRegister, setInitialValuesRegister] =
    useState<RegisterProps>({
      username: "",
      password: "",
      confirmPassword: "",
    });

  const login = useCallback(
    (value: any) => {
      setLoading(true);
      request
        .post(`/Login`, { email: value.username, password: value.password })
        .then((resposne) => {
          setLoading(false);
          if (resposne.data.data.sign) {
            dispatch(setMyKey({ my_key: resposne.data.data.my_key }));
            dispatch(SetMySecret({ secret: resposne.data.data.secret }));
            navigate("/books");
            toast.success("User succesfully login!");
          } else {
            toast.error(resposne.data.data);
          }
        })
        .catch((error) => console.log(error));
    },
    [request, navigate]
  );

  const register = useCallback(
    (value: any) => {
      setLoading(true);
      request
        .post(`/Register`, { email: value.username, password: value.password })
        .then((resposne) => {
          setLoading(false);
          if (resposne.data.data) {
            toast.success("User Created!");
            setFormType("login");
          } else {
            toast.error(resposne.data.data);
          }
        })
        .catch((error) => console.log(error));
    },
    [request]
  );

  return (
    <div className="p-4">
      {formType === "login" && (
        <AuthLoginForm
          onChangeFormType={() => setFormType("register")}
          initialValues={initialValuesLogin}
          setInitialValues={setInitialValuesLogin}
          submit={login}
          loading={loading}
        />
      )}
      {formType === "register" && (
        <AuthRegisterForm
          onChangeFormType={() => setFormType("login")}
          initialValues={initialValuesRegister}
          setInitialValues={setInitialValuesRegister}
          submit={register}
          loading={loading}
        />
      )}
    </div>
  );
}
