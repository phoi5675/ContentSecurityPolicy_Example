import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SwitchCsp, { SwitchCspState } from "./components/SwitchCsp";
import CspHeaderWrapper from "./components/wrapper/CspHeaderWrapper";
import RouterWrapper from "./components/wrapper/RouterWrapper";
import cspConfig from "./constants/cspConfig";
import Pages from "./pages";
import cspSetter from "./utils/CspSetter";

const App = () => {
  const [state, setState] = useState<SwitchCspState>({
    isHttpsEnabled: false,
    isNonceEnabled: false,
    isUnsafeInlineEnabled: false,
  });

  const cspMetaTagRef = useRef<HTMLMetaElement | null>(null);

  // App 컴포넌트가 마운트 될 때, <meta> 태그를 찾아서, ref에 저장한다.
  useEffect(() => {
    const cspElem = document.getElementById(
      "Content-Security-Policy"
    ) as HTMLMetaElement;
    if (cspElem) {
      cspMetaTagRef.current = cspElem;
    }

    // 새로고침 하는 경우에도 기본 CSP를 적용한다.
    cspSetter({
      additionalCspConfig: cspConfig,
      cspMetaTagRef,
    });
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
                // 페이지 이동 시, 해당 페이지에 사전 설정된 CSP로 변경한다.
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
          <div className="csp-switch-wrapper">
            <div className="csp-switch">
              <SwitchCsp state={state} setState={setState} />
            </div>
          </div>
          <div className="page-wrapper">
            <div className="page-content">
              <Routes>
                {Pages.map((page, index) => (
                  <Route
                    key={`page-${index}`}
                    path={page.path}
                    element={
                      <RouterWrapper cspMetaTagRef={cspMetaTagRef}>
                        <page.Element />
                      </RouterWrapper>
                    }
                  />
                ))}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
