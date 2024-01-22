import { useCallback, useEffect, useState } from "react";
import { useBookContext } from "../../api/book/BookApiContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PlusIcon from "../icons/PlusIcon";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import BooksFormWrapper from "./BooksFormWrapper";
import BooksMenu from "./BooksMenu";

export default function BooksMenuWrapper() {
  const [isFormModal, setIsFormModal] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [isMenuLoading, setIsMenuLoading] = useState(false);

  const { BookApi } = useBookContext();

  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuLoading(true);
    BookApi.GetAllBooks()
      .then((resposne) => {
        setBookList(resposne);
        setIsMenuLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsMenuLoading(false);
      });
  }, []);

  const deleteBook = useCallback(
    (value: any) => {
      BookApi.DeleteBook(value)
        .then((response) => {
          toast.success(response.message);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
    [BookApi]
  );

  const editBook = useCallback((value: any) => {
    navigate(`/books/${value}`);
    setIsFormModal(true);
  }, []);

  return (
    <div>
      <div className="books-menu-header d-flex justify-content-between mt-2">
        <div className="title-and-text">
          <h1 className="text-light">
            You’ve got{" "}
            <span
              style={{
                color: "#6200ee",
              }}
            >
              7 book
            </span>
          </h1>
          <p className="text-light">Your books today</p>
        </div>
        <div className="create-button mt-2">
          <Button
            className="px-3 py-2 d-flex align-items-center gap-2"
            style={{
              borderRadius: "3px",
              fontSize: "14px",
            }}
            onClick={() => {
              navigate("/books");
              setIsFormModal(true);
            }}
          >
            <PlusIcon size={14} />
            Create a Book
          </Button>
        </div>
      </div>
      <BooksMenu
        data={bookList}
        loading={isMenuLoading}
        deleteBook={deleteBook}
        editBook={editBook}
      />
      <Modal
        className="d-flex justify-content-center align-items-center"
        contentClassName="p-4 rounded"
        width="800px"
        show={isFormModal}
        closeHandler={() => setIsFormModal(false)}
      >
        <BooksFormWrapper onClickClose={() => setIsFormModal(false)} />
      </Modal>
    </div>
  );
}
