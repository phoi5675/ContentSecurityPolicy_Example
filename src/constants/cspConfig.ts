import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";

const cspConfig: ContentSecurityPolicyType = {
  "default-src": new Set<string>(["'self'"]),
  "style-src": new Set<string>(["'self'"]),
};

export default cspConfig;
