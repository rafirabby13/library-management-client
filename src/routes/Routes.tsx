import { createBrowserRouter } from "react-router";
import App from "../App";
import AllBooks from "@/pages/AllBooks";
import AddBooks from "@/pages/AddBooks";
import BorrowSummary from "@/pages/BorrowSummary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
      {
        path: '/allBooks',
        Component: AllBooks
      },
      {
        path: '/addBooks',
        Component: AddBooks
      },
      {
        path: '/borrowsummary',
        Component: BorrowSummary
      }
    ]
  },
]);