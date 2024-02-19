import { createBrowserRouter } from "react-router-dom";
import Home from "./manager/Home";
import View from "./manager/View";
import MyLayout from "./components/Layout";
import Delete from "./manager/Delete";
import Login from "./Pages/Login";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Show/:name",
    element: <MyLayout children={<View />} />,
  },
  {
    path: "Delete/:name",
    element: <MyLayout children={<Delete />} />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);
