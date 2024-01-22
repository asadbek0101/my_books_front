import { BookProps } from "../../api/book/BookDto";
import PencilIcon from "../icons/PencilIcon";
import TrashIcon from "../icons/TrashIcon";
import cx from "classnames";
import "./assets/book-card.scss";

interface Props {
  readonly data: BookProps;
  readonly _delete: (value: any) => void;
  readonly _edit: (value: any) => void;
}

export default function BookCard({ data, _edit, _delete }: Props) {
  return (
    <div className="book-card">
      <div className="book-card-actions">
        <button className="_delete_button" onClick={() => _delete(data.id)}>
          <TrashIcon size={12} />
        </button>
        <button className="_edit_button" onClick={() => _edit(data.id)}>
          <PencilIcon size={12} />
        </button>
      </div>
      <div className="book-card-title">
        <span>{data.title}</span>
      </div>
      <div className="book-card-info">
        <span>Cover: {data.cover}</span>
        <span>Pages: {data.pages}</span>
        <span>Published: {data.published}</span>
        <span>Isbn: {data.isbn}</span>
        <div className="mt-2 d-flex justify-content-between">
          <span>Eben: {data.eben}</span>
          <div className={cx("book-card-status-box", {
            "bg-danger": data.status === "1",
            "bg-warning": data.status === "2",
            "bg-success": data.status === "3",
          })}>
            <span>{data.status === "1"? "New" : data.status === "2"? "Reading" : "Finished"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
