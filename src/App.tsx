import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie";
import SwitchCsp, {
  SwitchCspState,
  switchCspDict,
} from "./components/SwitchCsp";
import CspHeaderWrapper from "./components/wrapper/CspHeaderWrapper";
import RouterWrapper from "./components/wrapper/RouterWrapper";
import cspConfig from "./constants/cspConfig";
import Pages from "./pages";
import { ContentSecurityPolicySrcType } from "./types/ContentSecurityPolicyType";
import { getCookie, setCookie } from "./utils/cookieUtil";
import cspSetter from "./utils/cspSetter";

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

  useEffect(() => {
    const cookieState = getCookie("state") as SwitchCspState | null;
    if (cookieState) {
      setState(cookieState);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
  const onChangeHandler = (event?: any, state?: SwitchCspState) => {
    // 스위치 토글하거나 페이지 이동하는 경우, state 및 변경된 CSP 값을 쿠키에 저장하고 페이지 새로고침하여
    // CSP 값이 다음 페이지 로딩 때 적용될 수 있도록 함
    const mergedConfig = Object.assign({}, cspConfig);

    if (state) {
      for (const [isEnabled, enabledCspConfig] of Object.entries(
        switchCspDict
      )) {
        if (isEnabled in state && state[isEnabled]) {
          for (const [src, policy] of Object.entries(enabledCspConfig)) {
            const _src = src as ContentSecurityPolicySrcType;
            mergedConfig[_src] = new Set<string>([
              ...Array.from(mergedConfig[_src]!),
              ...Array.from(policy),
            ]);
          }
        }
      }
    }

    const cspContent = cspSetter({
      additionalCspConfig: mergedConfig,
    });

    const cookieOpts: CookieSetOptions = {
      expires: dayjs().add(1, "hour").toDate(),
    };
    // CSP content 쿠키에 저장
    setCookie("cspContent", cspContent, cookieOpts);
    // state가 있는 경우, 쿠키에 저장
    if (state) {
      setCookie("state", state, cookieOpts);
    }
  };

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
                onChangeHandler();
                window.location.href = page.path;
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
                onChangeHandler={onChangeHandler}
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
                      <RouterWrapper>
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
