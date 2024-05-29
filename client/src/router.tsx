import React from "react";

import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import { TodoList } from "./Layouts/TodoList/TodoList";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <TodoList />,
  },
]);
