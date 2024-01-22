import { useEffect } from "react";
import AppPageLayout from "../components/app/AppPageLayout";
import BooksTab from "../components/books/BooksTab";
import { request } from "../api/request";

export default function BooksContainer() {


  return (
    <AppPageLayout>
      <BooksTab />
    </AppPageLayout>
  );
}
