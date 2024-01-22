import { BaseApi } from "../BaseApi";
import { CreateBookProps, UpdateBookProps } from "./BookDto";

export class BookApi extends BaseApi {
  public GetAllBooks() {
    return this.get("GetAllBooks");
  }

  public GetOneBook(id: number) {
    return this.get(`GetBook/${id}`);
  }

  public CreateBook(json: CreateBookProps) {
    return this.post("CreateBook", { json });
  }

  public UpdateBook(json: UpdateBookProps) {
    return this.put("UpdateBook", { json });
  }

  public DeleteBook(id: number) {
    return this.delete(`DeleteBook/${id}`);
  }
}
