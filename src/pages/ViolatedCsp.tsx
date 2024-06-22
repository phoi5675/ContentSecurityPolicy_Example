import { Jodit } from "jodit";
import { useEffect, useRef } from "react";
import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";

export const ViolatedCspConfig: ContentSecurityPolicyType = {
  "default-src": new Set<string>(["'none'"]),
  "style-src": new Set<string>(["'none'"]),
};

export const ViolatedCsp = () => {
  const violatedCspHeaderRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    // Jodit의 타입만 가져오고, 실제 Jodit 스크립트 및 스타일은 public/index.html에서 설정한 cdn에서 가져옴.
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const editor = Jodit.make("#editor");

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
      <textarea id="editor" name="editor"></textarea>
    </div>
  );
};

export default ViolatedCsp;
