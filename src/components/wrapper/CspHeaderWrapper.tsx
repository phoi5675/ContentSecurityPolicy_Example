import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import cspConfig from "../../constants/cspConfig";
import {
  ContentSecurityPolicySrcType,
  ContentSecurityPolicyType,
} from "../../utils/ContentSecurityPolicy/ContentSecurityPolicyType";

interface CspHeaderWraapperProps {
  additionalConfig?: ContentSecurityPolicyType;
}

const CspHeaderWrapper = forwardRef<
  ContentSecurityPolicyType,
  CspHeaderWraapperProps
>(
  (
    { additionalConfig }: CspHeaderWraapperProps,
    ref: ForwardedRef<ContentSecurityPolicyType>
  ) => {
    const cspContentRef = useRef<string>("");

    console.log(`[CspHeaderWrapper] ref = `, ref);

    useEffect(() => {
      console.log(`[CspHeaderWrapper] callback ref = `, ref);
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

      // console.log("", cspConfig);
      console.log(`[CspHeaderWrapper] result of cspContent = ${cspContent}`);
      cspContentRef.current = cspContent;
      console.log(
        `[CspHeaderWrapper] cspContentRef = ${cspContentRef.current}`
      );

      console.log("csp loaded");
    }, []);

    return (
      <Helmet>
        <meta
          httpEquiv="Content-Security-Policy"
          content={cspContentRef.current || ""}
        />
      </Helmet>
    );
  }
);
export default CspHeaderWrapper;
