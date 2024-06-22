/* eslint-disable no-unused-vars */
export type ContentSecurityPolicySrcType =
  | "default-src"
  | "script-src"
  | "img-src"
  | "style-src"
  | "frame-src"
  | "font-src"
  | "form-action"
  | "media-src"
  | "object-src"
  | "manifest-src"
  | "connect-src"
  | "worker-src";

export type ContentSecurityPolicyType = {
  [key in ContentSecurityPolicySrcType]?: Set<string>;
};
