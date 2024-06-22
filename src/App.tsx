import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CspHeaderWrapper from "./components/wrapper/CspHeaderWrapper";
import RouterWrapper from "./components/wrapper/RouterWrapper";
import cspConfig from "./constants/cspConfig";
import Pages from "./pages";
import { ContentSecurityPolicyType } from "./utils/ContentSecurityPolicy/ContentSecurityPolicyType";

const App = () => {
  const [additionalConfig, setAdditonalConfig] = useState<
    ContentSecurityPolicyType | undefined
  >(cspConfig);

  return (
    <div>
      <CspHeaderWrapper additionalConfig={additionalConfig} />
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
              {Pages.map((page, index) => (
                <Route
                  key={`page-${index}`}
                  path={page.path}
                  element={
                    <RouterWrapper
                      additionalConfig={page.pageCspConfig}
                      setAdditionalConfig={setAdditonalConfig}
                    >
                      <page.Element />
                    </RouterWrapper>
                  }
                />
              ))}
            </Routes>
          </div>
          <div className="console">{/* <Console /> */}</div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
