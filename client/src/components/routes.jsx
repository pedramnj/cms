import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import {createBrowserRouter} from "react-router-dom";
import Home from "../components/index";
import CurrentPost from "../components/CurrentPost";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const router = createBrowserRouter([
  {path: ROOT, element: <Home />},
  {path: LOGIN, element: <Login />},
  {path: REGISTER, element: <Register />},
  {path: "/posts/:postId", element: <CurrentPost />},
]);
