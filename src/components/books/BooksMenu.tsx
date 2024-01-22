import { BookProps } from "../../api/book/BookDto";
import BookCard from "../cards/BookCard";

interface Props {
  readonly data: BookProps[];
  readonly loading?: boolean;
  readonly deleteBook: (value: any) => void;
  readonly editBook: (value: any) => void;
}

export default function BooksMenu({
  data,
  loading,
  editBook,
  deleteBook,
}: Props) {
  if (loading) {
    return (
      <div className="loader w-100 h-100 d-flex justify-content-center align-items-center">
        <h3 className="text-light">Loading...</h3>
      </div>
    );
  }

  if (!loading && !data) {
    return (
      <div className="loader w-100 h-100 d-flex justify-content-center align-items-center">
        <h3 className="text-light">Empty</h3>
      </div>
    );
  }
  return (
    <div className="row mt-3">
      {data &&
        data.map((book: BookProps) => {
          return (
            <div className="col-4 my-2">
              <BookCard data={book} _edit={editBook} _delete={deleteBook} />
            </div>
          );
        })}
    </div>
  );
}
