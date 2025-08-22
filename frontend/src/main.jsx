import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import "./index.css";
import { csrfFetch, restoreCSRF } from "./redux/csrf";
//import App from './App'; ?

const store = configureStore();
//if (process.env.NODE_ENV !== 'production') {
  //window.store = store;
//} *?
if (import.meta.env.MODE !== "production") {
  restoreCSRF()
  window.csrfFetch = csrfFetch
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} /> 
    </ReduxProvider>
  </React.StrictMode>
);
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// ); *?
