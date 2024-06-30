import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import Header from "./Components/Header";

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <Header />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </RecoilRoot>
);
