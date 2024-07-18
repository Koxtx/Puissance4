import { createBrowserRouter } from "react-router-dom";
import App from "./src/App";
import Homepage from "./src/compenents/Homepage/Homepage";
import UserNotConnected from "./src/compenents/ProtectedRoutes/UserNotConnected";
import UserConnected from "./src/compenents/ProtectedRoutes/UserConnected";
import Login from "./src/compenents/Log/Login";
import Register from "./src/compenents/Log/Register";
import Logout from "./src/compenents/Log/Logout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <UserConnected>
            <Homepage />
          </UserConnected>
        ),
      },
      {
        path: "/login",
        element: (
          <UserNotConnected>
            <Login />
          </UserNotConnected>
        ),
      },
      {
        path: "/register",
        element: (
          <UserNotConnected>
            <Register />
          </UserNotConnected>
        ),
      },
      {
        path: "/logout",
        element: (
          <UserConnected>
            <Logout />
          </UserConnected>
        ),
      },
    ],
  },
]);
