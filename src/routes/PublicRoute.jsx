import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Wishlist from "../pages/Wishlist";
import BookList from "../components/BookList";

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
        ],
    },
]);

export default router;