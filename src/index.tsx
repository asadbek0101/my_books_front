import React from "react";
import ReactDOM from "react-dom/client";
import AppContainer from "./containers/AppContainer";
import AppLayout from "./components/app/AppLayout";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { configureStore } from "./store/configureStore";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore();

root.render(
  <Provider store={store.store}>
    <AppLayout>
      <BrowserRouter>
        <AppContainer />
        <ToastContainer />
      </BrowserRouter>
    </AppLayout>
  </Provider>
);
