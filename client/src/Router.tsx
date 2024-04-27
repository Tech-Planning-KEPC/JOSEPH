import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";
import Upload from "./Routes/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "/upload", element: <Upload /> },
    ],
  },
]);

export default router;
