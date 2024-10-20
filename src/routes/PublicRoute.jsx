import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Wishlist from "../pages/Wishlist";
import BookList from "../components/BookList";
import SingleBook from "../pages/SingleBook";

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
        ],
    },
]);

export default router;