import { useCallback, useState } from "react";
import { LoginProps, RegisterProps } from "../../api/auth/AuthDto";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetMySecret, setMyKey } from "../../reducers/authReducer";
import { useAuthContext } from "../../api/auth/AuthApiContext";
import { toast } from "react-toastify";

import AuthLoginForm from "./AuthLoginForm";
import AuthRegisterForm from "./AuthRegisterForm";

export default function AuthFormWrapper() {
  const [formType, setFormType] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { AuthApi } = useAuthContext();

  const [initialValuesLogin, setInitialValuesLogin] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const [initialValuesRegister, setInitialValuesRegister] =
    useState<RegisterProps>({
      email: "",
      password: "",
      confirmPassword: "",
    });

  const login = useCallback(
    (value: any) => {
      setLoading(true);
      AuthApi.Login({ email: value.email, password: value.password })
        .then((resposne) => {
          setLoading(false);
          if (resposne.sign) {
            dispatch(setMyKey({ my_key: resposne.my_key }));
            dispatch(SetMySecret({ secret: resposne.secret }));
            navigate("/books");
            toast.success("User succesfully login!");
          } else {
            toast.error(resposne);
          }
        })
        .catch((error) => console.log(error));
    },
    [navigate, AuthApi]
  );

  const register = useCallback(
    (value: any) => {
      if (value.password === value.confirmPassword) {
        setLoading(true);
        AuthApi.Register({
          email: value.email,
          password: value.password,
          confirmPassword: "",
        })
          .then((resposne) => {
            setLoading(false);
            if (resposne.code === 1) {
              toast.success(resposne.message);
              setFormType("login");
            } else {
              toast.error(resposne.message);
            }
          })
          .catch((error) => console.log(error));
      } else {
        toast.error("Passwords don't same");
      }
    },
    [navigate, AuthApi]
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
