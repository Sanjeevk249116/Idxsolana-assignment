import React from "react";
import AuthenticateRouter from "./routers/AuthenticateRouter";
import { UnAuthenticateRouter } from "./routers/UnAuthenticateRouter";


function App() {
  const token = localStorage.getItem("notes-token");
  return token ? <AuthenticateRouter /> : <UnAuthenticateRouter />;
}

export default App;
