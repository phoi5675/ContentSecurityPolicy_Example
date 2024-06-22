import { useEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CspHeaderWrapper from "./components/wrapper/CspHeaderWrapper";
import RouterWrapper from "./components/wrapper/RouterWrapper";
import Pages from "./pages";
import cspSetter from "./utils/CspSetter";

const App = () => {
  const cspMetaTagRef = useRef<HTMLMetaElement | null>(null);

  // App 컴포넌트가 마운트 될 때, <meta> 태그를 찾아서, ref에 저장한다.
  useEffect(() => {
    const cspElem = document.getElementById(
      "Content-Security-Policy"
    ) as HTMLMetaElement;
    if (cspElem) {
      cspMetaTagRef.current = cspElem;
    }
  }, []);

  return (
    <div>
      <CspHeaderWrapper />
      <BrowserRouter>
        <nav className="nav-link">
          {Pages.map((page, index) => (
            <Link
              className="link"
              key={`link-${index}`}
              to={page.path}
              onClick={() => {
                cspSetter({
                  additionalCspConfig: page.pageCspConfig || {},
                  cspMetaTagRef,
                });
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
