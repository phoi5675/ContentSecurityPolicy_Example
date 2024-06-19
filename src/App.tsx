import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Console from "./components/common/Console";
import Home from "./pages/Home";
import SatisfiedCsp from "./pages/SatisfiedCsp";
import UsingNonceWithRef from "./pages/UsingNonceWithRef";
import ViolatedCsp from "./pages/ViolatedCsp";
import CspHeaderWrapper from "./utils/CspHeaderWrapper";

const App = () => {
  return (
    <div>
      <CspHeaderWrapper />
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
    </div>
  );
};

export default App;
