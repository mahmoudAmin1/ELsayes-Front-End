import { createBrowserRouter } from "react-router-dom";
import Home from "./manager/Home";
import View from "./manager/View";
import MyLayout from "./components/Layout";
import Delete from "./manager/Delete";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Update from "./manager/Update";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MyLayout children={<Home />} />,
  },
  {
    path: "/Show/:name",
    element: <MyLayout children={<View />} />,
  },
  {
    path: "/Update/:name",
    element: <MyLayout children={<Update />} />,
  },
  {
    path: "Delete/:id",
    element: <MyLayout children={<Delete />} />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Profile",
    element: <MyLayout children={<Profile />} />,
  },
]);
