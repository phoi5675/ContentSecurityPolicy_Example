import { ContentSecurityPolicyType } from "../utils/ContentSecurityPolicy/ContentSecurityPolicyType";

const cspConfig: ContentSecurityPolicyType = {
  "default-src": new Set<string>(["'self'"]),
};

export default cspConfig;
