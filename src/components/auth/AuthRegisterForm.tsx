import { Form, Formik } from "formik";
import { RegisterProps } from "../../api/auth/AuthDto";
import { useCallback } from "react";
import { update } from "immupdate";
import { object, string } from "yup";
import InputField from "../form/InputField";
import Button from "../ui/Button";

interface Props {
  readonly loading: boolean;
  readonly initialValues: RegisterProps;
  readonly setInitialValues: (value: any) => void;
  readonly submit: (value: any) => void;
  readonly onChangeFormType: () => void;
}

const validationSchema = object({
  email: string().required("Required!"),
  password: string().required("Required!"),
  confirmPassword: string().required("Required!"),
});

export default function AuthRegisterForm({
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

  const onChangeConfirmPassword = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          confirmPassword: event.target.value,
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
              <h3>Sign Up</h3>
            </div>
            <div className="col-12 mt-3">
              <InputField
                name="username"
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
            <div className="col-12 mt-3">
              <InputField
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Repaet the password"
                value={initialValues.confirmPassword}
                onChange={onChangeConfirmPassword}
              />
            </div>
            <div className="col-12 mt-5">
              <Button className="w-100 py-2" type="submit" loading={loading}>
                Submit
              </Button>
            </div>
            <div className="col-12 text-center mt-2">
              <p>
                Already signed up?{" "}
                <span
                  className="text-primary"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={onChangeFormType}
                >
                  Go to sign in.
                </span>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
