import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";

const defaultCspConfig: ContentSecurityPolicyType = Object.freeze({
  "default-src": new Set<string>(["'self'"]),
  "script-src": new Set<string>([
    "'self'",
    "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.4/", // NOTE: Jodit 페이지 진입하기 위해서는 해당 url 필요
  ]),
  "img-src": new Set<string>(["'self'", "data:"]),
  "style-src": new Set<string>(["'self'"]),
  "frame-src": new Set<string>(["'self'"]),
});

const cspConfig: ContentSecurityPolicyType = Object.assign(
  {},
  defaultCspConfig
);

export default cspConfig;
