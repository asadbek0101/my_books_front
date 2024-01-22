import { Form, Formik } from "formik";
import { CreateBookProps } from "../../api/book/BookDto";
import { object, string } from "yup";
import { useCallback } from "react";
import { update } from "immupdate";

import InputField from "../form/InputField";
import Button from "../ui/Button";

interface Props {
  readonly initialValues: CreateBookProps;
  readonly setInitialValues: (value: any) => void;
  readonly submit: (value: any) => void;
  readonly onClickClose: () => void;
  readonly loading: boolean;
  readonly buttonLoading: boolean;
}

const validationSchema = object({
  title: string().required("Required"),
  cover: string().required("Required"),
  published: string().required("Required"),
  pages: string().required("Required"),
  isbn: string().required("Required"),
  eben: string().required("Required"),
});

export default function BooksForm({
  initialValues,
  setInitialValues,
  submit,
  onClickClose,
  loading = false,
  buttonLoading = false,
}: Props) {
  const onChangeTitle = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          title: event.target.value,
        })
      );
    },
    [setInitialValues]
  );
  const onChangeCover = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          cover: event.target.value,
        })
      );
    },
    [setInitialValues]
  );
  const onChangePages = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          pages: event.target.value,
        })
      );
    },
    [setInitialValues]
  );
  const onChangePublished = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          published: event.target.value,
        })
      );
    },
    [setInitialValues]
  );
  const onChangeISBN = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          isbn: event.target.value,
        })
      );
    },
    [setInitialValues]
  );
  const onChangeEben = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          eben: event.target.value,
        })
      );
    },
    [setInitialValues]
  );

  if (loading) {
    return (
      <div className="loader w-100 h-100 d-flex justify-content-center align-items-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {() => (
        <Form>
          <div className="row">
            <h3>Create a Book</h3>
            <div className="col-6 mt-2">
              <InputField
                name="title"
                label="Title"
                value={initialValues.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="col-6 mt-2">
              <InputField
                name="cover"
                label="Cover"
                value={initialValues.cover}
                onChange={onChangeCover}
              />
            </div>
            <div className="col-6 mt-2">
              <InputField
                name="pages"
                label="Pages"
                value={initialValues.pages}
                onChange={onChangePages}
              />
            </div>
            <div className="col-6 mt-2">
              <InputField
                name="published"
                label="Published"
                value={initialValues.published}
                onChange={onChangePublished}
              />
            </div>
            <div className="col-6 mt-2">
              <InputField
                name="isbn"
                label="ISBN"
                value={initialValues.isbn}
                onChange={onChangeISBN}
              />
            </div>
            <div className="col-6 mt-2">
              <InputField
                name="eben"
                label="Eben"
                value={initialValues.eben}
                onChange={onChangeEben}
              />
            </div>
            <div className="col-7 mt-3">
              <Button
                solidButton
                className="py-2 rounded-1"
                style={{ width: "49%" }}
                onClick={onClickClose}
              >
                Close
              </Button>
              <Button
                className="py-2  rounded-1 ms-2"
                style={{ width: "49%", border: "2px solid #6200ee" }}
                type="submit"
                loading={buttonLoading}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
