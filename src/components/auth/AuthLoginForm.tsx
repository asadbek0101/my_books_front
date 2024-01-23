import { Form, Formik } from "formik";
import { LoginProps } from "../../api/auth/AuthDto";
import { useCallback } from "react";
import { update } from "immupdate";
import { object, string } from "yup";

import InputField from "../form/InputField";
import Button from "../ui/Button";

interface Props {
  readonly loading: boolean;
  readonly initialValues: LoginProps;
  readonly setInitialValues: (value: any) => void;
  readonly submit: (value: any) => void;
  readonly onChangeFormType: () => void;
}

const validationSchema = object({
  email: string().required("Required!"),
  password: string().required("Required!"),
});

export default function AuthLoginForm({
  loading,
  initialValues,
  setInitialValues,
  onChangeFormType,
  submit,
}: Props) {
  const onChangeEmail = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          email: event.target.value,
        })
      );
    },
    [setInitialValues]
  );

  const onChangePassword = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          password: event.target.value,
        })
      );
    },
    [setInitialValues]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
      enableReinitialize={true}
    >
      {() => (
        <Form>
          <div className="row py-2">
            <div className="col-12 text-center">
              <h3>Sign In</h3>
            </div>
            <div className="col-12 mt-3">
              <InputField
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={initialValues.email}
                onChange={onChangeEmail}
              />
            </div>
            <div className="col-12 mt-3">
              <InputField
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                value={initialValues.password}
                onChange={onChangePassword}
              />
            </div>
            <div className="col-12 mt-5">
              <Button className="w-100 py-2" type="submit" loading={loading}>
                Submit
              </Button>
            </div>
            <div className="col-12 text-center mt-2">
              <p>
                You didn't sign up?{" "}
                <span
                  className="text-primary"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={onChangeFormType}
                >
                  Go to sign up.
                </span>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
