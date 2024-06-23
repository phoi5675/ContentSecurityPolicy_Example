import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SwitchCsp, { SwitchCspState } from "./components/SwitchCsp";
import CspHeaderWrapper from "./components/wrapper/CspHeaderWrapper";
import RouterWrapper from "./components/wrapper/RouterWrapper";
import Pages from "./pages";

/**
 * list of TODOs
 * - [ ] xss 예시 추가 및 script-src 스위치 추가(실제로 인라인 스크립트가 실행되지 않는 것을 보여줌)
 * - [ ] nonce 관련 기능 구현 및 nonce 스위치 삭제 -> nonce는 스위치가 굳이 필요한가...?
 * - [ ] Jodit에서 cdn으로 ace editor 추가로 불러서 csp 오류 발생하는 것도 구현
 */

const App = () => {
  const [state, setState] = useState<SwitchCspState>({
    isHttpsEnabled: false,
    isUnsafeInlineEnabled: false,
    isUnsafeHashesEnabled: false,
  });

  const [isLoading, setisLoading] = useState<boolean>(false);

  return (
    <div>
      <CspHeaderWrapper
        state={state}
        isLoading={isLoading}
        setIsLoading={setisLoading}
      />
      <BrowserRouter>
        <nav className="nav-link">
          {Pages.map((page, index) => (
            <Link
              className="link"
              key={`link-${index}`}
              to={page.path}
              onClick={() => {
                setisLoading(true);
              }}
            >
              {page.pathname}
            </Link>
          ))}
        </nav>
        <div className="content">
          <div className="csp-switch-wrapper">
            <div className="csp-switch">
              <SwitchCsp
                state={state}
                setState={setState}
                setIsLoading={setisLoading}
              />
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
                      <RouterWrapper isLoading={isLoading}>
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
