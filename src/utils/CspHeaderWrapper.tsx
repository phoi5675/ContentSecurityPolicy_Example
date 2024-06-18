import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import cspConfig from "../constants/cspConfog";
import {
  ContentSecurityPolicySrcType,
  ContentSecurityPolicyType,
} from "./ContentSecurityPolicy/ContentSecurityPolicyType";

export interface CspHeaderWrapperProps {
  // eslint-disable-next-line no-unused-vars
  additionalConfig: ContentSecurityPolicyType;
}

const CspHeaderWrapper = ({ additionalConfig }: CspHeaderWrapperProps) => {
  const cspContentRef = useRef<string>("");

  useEffect(() => {
    const _csp = Object.assign({}, cspConfig);

    // 추가 설정 값이 있는 경우, 기존 설정 값에 추가 설정 값을 append
    // 값 중복을 막기 위해 Set 사용
    if (additionalConfig) {
      for (const [key, value] of Object.entries(_csp)) {
        if (key in additionalConfig) {
          const merged = new Set([
            ...Array.from(value),
            ...Array.from(
              additionalConfig[key as ContentSecurityPolicySrcType] || []
            ),
          ]);
          _csp[key as ContentSecurityPolicySrcType] = merged;
        }
      }
    }

    // 병합한 CSP 정책을 content attribute에 넣기 위해 string으로 변환
    let cspContent = "";
    for (const [key, value] of Object.entries(_csp)) {
      cspContent += `${key} ${Array.from(value).join(" ")};`;
    }

    cspContentRef.current = cspContent;
  }, []);
  return (
    <>
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content={cspContentRef.current}
        />
      </Helmet>
    </>
  );
};

export default CspHeaderWrapper;
