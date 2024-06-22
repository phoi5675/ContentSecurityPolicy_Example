import { useEffect } from "react";
import { ContentSecurityPolicyType } from "../utils/ContentSecurityPolicy/ContentSecurityPolicyType";

export const ViolatedCspConfig: ContentSecurityPolicyType = {
  "default-src": new Set<string>(["'none'"]),
};

export const ViolatedCsp = () => {
  useEffect(() => {
    console.log(`Violated CSP loaded`);
  }, []);
  return (
    <div>
      {/* TODO: 내용 채우기 */}
      <h1 style={{ backgroundColor: "red" }}>ViolatedCsp</h1>
    </div>
  );
};

export default ViolatedCsp;
