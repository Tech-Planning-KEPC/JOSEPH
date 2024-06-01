import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";
import Upload from "./Routes/Upload";
import Scan from "./Routes/Scan";
import View from "./Routes/View";
import ConfirmItem from "./Routes/ConfirmItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "/upload", element: <Upload /> },
      { path: "/scan", element: <Scan /> },
      { path: "/view", element: <View /> },
      { path: "/upload/:id", element: <ConfirmItem /> },
    ],
  },
]);

export default router;