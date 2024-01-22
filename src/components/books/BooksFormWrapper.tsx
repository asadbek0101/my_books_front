import { useCallback, useEffect, useState } from "react";
import BooksForm from "./BooksForm";
import { CreateBookProps } from "../../api/book/BookDto";
import { request } from "../../api/request";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  readonly onClickClose: () => void;
}

export default function BooksFormWrapper({ onClickClose }: Props) {
  const [formLoading, setFormLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<CreateBookProps>({
    title: "",
    cover: "",
    published: "",
    pages: "",
    isbn: "",
    eben: "",
  });

  const { bookId } = useParams();

  useEffect(() => {
    if (Boolean(bookId)) {
      setFormLoading(true);
      request
        .get(`GetBook/${bookId}`)
        .then((response) => {
          setInitialValues(response.data.data.data);
          setFormLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [bookId, request]);

  const submit = useCallback(
    (value: any) => {
      if (bookId) {
        request
          .put(`/UpdateBook`, {
            ...value,
          })
          .then((response) => {
            window.location.reload();
            toast.success(response.data.message);
          })
          .catch((error) => console.log(error));
      } else {
        request
          .post(`/CreateBook`, {
            ...value,
          })
          .then((response) => {
            window.location.reload();
            toast.success(response.data.message);
          })
          .catch((error) => console.log(error));
      }
    },
    [bookId]
  );

  return (
    <BooksForm
      loading={formLoading}
      initialValues={initialValues}
      setInitialValues={setInitialValues}
      onClickClose={onClickClose}
      submit={submit}
    />
  );
}
