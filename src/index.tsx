import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Console from "./components/common/Console";
import "./index.scss";
import Home from "./pages/Home";
import SatisfiedCsp from "./pages/SatisfiedCsp";
import UsingNonceWithRef from "./pages/UsingNonceWithRef";
import ViolatedCsp from "./pages/ViolatedCsp";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <nav className="nav-link">
        <Link className="link" to={"/"}>
          Home
        </Link>
        <Link className="link" to={"/satisfied-csp"}>
          satisfied-csp
        </Link>
        <Link className="link" to={"/using-nonce-with-ref"}>
          using-nonce-with-ref
        </Link>
        <Link className="link" to={"/violated-csp"}>
          violated-csp
        </Link>
      </nav>
      <div className="content">
        <div className="page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/satisfied-csp" element={<SatisfiedCsp />} />
            <Route
              path="/using-nonce-with-ref"
              element={<UsingNonceWithRef />}
            />
            <Route path="/violated-csp" element={<ViolatedCsp />} />
          </Routes>
        </div>
        <div className="console">
          <Console />
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
