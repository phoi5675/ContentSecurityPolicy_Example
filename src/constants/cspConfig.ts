import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";

const defaultCspConfig: ContentSecurityPolicyType = Object.freeze({
  "default-src": new Set<string>(["'self'"]),
  "script-src": new Set<string>(["'self'"]),
  "img-src": new Set<string>(["'self'"]),
  "style-src": new Set<string>(["'self'"]),
  "frame-src": new Set<string>(["'self'"]),
  "font-src": new Set<string>(["'self'"]),
  "form-action": new Set<string>(["'self'"]),
  "media-src": new Set<string>(["'self'"]),
  "object-src": new Set<string>(["'self'"]),
  "manifest-src": new Set<string>(["'self'"]),
  "connect-src": new Set<string>(["'self'"]),
  "worker-src": new Set<string>(["'self'"]),
});

const cspConfig: ContentSecurityPolicyType = Object.assign(
  {},
  defaultCspConfig
);

export default cspConfig;
