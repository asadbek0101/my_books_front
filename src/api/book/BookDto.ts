export interface BookProps {
  readonly id: number;
  readonly title: string;
  readonly cover: string;
  readonly pages: string;
  readonly published: string;
  readonly isbn: string;
  readonly eben: string;
  readonly status: string;
}

export interface CreateBookProps {
  readonly title: string;
  readonly cover: string;
  readonly pages: string;
  readonly published: string;
  readonly isbn: string;
  readonly eben: string;
}
