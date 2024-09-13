import React from "react"; import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

//router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//store
import { Provider } from "react-redux";
//reducer
import { store } from "./store";

import Index from "./views/index";
import { IndexRouters } from "./router";
import { SimpleRouter } from "./router/simple-router";
import { DefaultRouter } from "./router/default-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  ...DefaultRouter,
  ...IndexRouters,
  ...SimpleRouter
], { basename: import.meta.env.PUBLIC_URL });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </Provider>
  </StrictMode>,

);
