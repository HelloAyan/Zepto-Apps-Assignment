import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Wishlist from "../pages/Wishlist";
import BookList from "../components/BookList";
import SingleBook from "../pages/SingleBook";
import BookDetails from "../pages/BookDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <BookList />,
            },
            {
                path: "/wishlist",
                element: <Wishlist />,
            },
            {
                path: "/single-book",
                element: <SingleBook />,
            },
            {
                path: "/single-book/:id",
                element: <BookDetails />,
            },
        ],
    },
]);

export default router;