import React from "react";
import ReactDOM from "react-dom";
import AppWrapper from "./AppWrapper";
import App from "./App";

import { AuthProvider } from "./contexts/authentication";
import { MsgPopupProvider } from "./contexts/msgPopup";

ReactDOM.render(
  <AppWrapper>
    <AuthProvider>
      <MsgPopupProvider>
        <App />
      </MsgPopupProvider>
    </AuthProvider>
  </AppWrapper>,
  document.getElementById("root")
);
