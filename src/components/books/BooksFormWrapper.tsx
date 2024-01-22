import { useCallback, useEffect, useState } from "react";
import BooksForm from "./BooksForm";
import { CreateBookProps } from "../../api/book/BookDto";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useBookContext } from "../../api/book/BookApiContext";

interface Props {
  readonly onClickClose: () => void;
}

export default function BooksFormWrapper({ onClickClose }: Props) {
  const [formLoading, setFormLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<CreateBookProps>({
    title: "",
    cover: "",
    published: "",
    pages: "",
    isbn: "",
    eben: "",
  });

  const { bookId } = useParams();
  const { BookApi } = useBookContext();

  useEffect(() => {
    if (Boolean(bookId)) {
      setFormLoading(true);
      BookApi.GetOneBook(Number(bookId))
        .then((response) => {
          console.log(response);
          setInitialValues(response.data.data);
          setFormLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [bookId]);

  const submit = useCallback(
    (value: any) => {
      setButtonLoading(true);
      if (bookId) {
        BookApi.UpdateBook({
          ...value,
        })
          .then((response) => {
            window.location.reload();
            toast.success(response.data.message);
            setButtonLoading(false);
          })
          .catch((error) => console.log(error));
      } else {
        BookApi.CreateBook({
          ...value,
        })
          .then((response) => {
            window.location.reload();
            toast.success(response.data.message);
            setButtonLoading(false);
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
      buttonLoading={buttonLoading}
    />
  );
}
