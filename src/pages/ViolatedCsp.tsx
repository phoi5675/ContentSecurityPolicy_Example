import { useEffect, useRef } from "react";
import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";

export const ViolatedCspConfig: ContentSecurityPolicyType = {
  "default-src": new Set<string>(["'none'"]),
  "style-src": new Set<string>(["'none'"]),
};

const ViolatedCsp = () => {
  const violatedCspHeaderRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    // react의 inline-style은 csp의 영향을 받지 않음.
    // setAttribute로 직접 element를 조작해서 csp 설정되도록 변경
    if (violatedCspHeaderRef.current) {
      violatedCspHeaderRef.current.setAttribute(
        "style",
        "background-color: red;"
      );
    }
  }, []);
  return (
    <div>
      <h1 id="violated-csp-header" ref={violatedCspHeaderRef}>
        ViolatedCsp
      </h1>
    </div>
  );
};

export default ViolatedCsp;
