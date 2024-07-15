import { createBrowserRouter } from "react-router-dom";
import App from "./src/App";
import Homepage from "./src/compenents/Homepage/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
]);
