import { useRef } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CspHeaderWrapper from "./components/wrapper/CspHeaderWrapper";
import RouterWrapper from "./components/wrapper/RouterWrapper";
import Pages from "./pages";
import { ContentSecurityPolicyType } from "./utils/ContentSecurityPolicy/ContentSecurityPolicyType";

const App = () => {
  const additionalCspConfigRef = useRef<ContentSecurityPolicyType>({});

  return (
    <div>
      <CspHeaderWrapper ref={additionalCspConfigRef} />
      <BrowserRouter>
        <nav className="nav-link">
          {Pages.map((page, index) => (
            <Link
              className="link"
              key={`link-${index}`}
              to={page.path}
              onClick={() => {
                console.log(`[onClick] pageCspConfig = `, page.pageCspConfig);
                additionalCspConfigRef.current = page.pageCspConfig || {};
              }}
            >
              {page.pathname}
            </Link>
          ))}
        </nav>
        <div className="content">
          <div className="page">
            <Routes>
              {Pages.map((page, index) => (
                <Route
                  key={`page-${index}`}
                  path={page.path}
                  element={
                    <RouterWrapper>
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
