import React from "react";
import { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
