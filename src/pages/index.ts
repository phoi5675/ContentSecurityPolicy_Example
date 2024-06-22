import { ContentSecurityPolicyType } from "../utils/ContentSecurityPolicy/ContentSecurityPolicyType";
import Home from "./Home";
import SatisfiedCsp from "./SatisfiedCsp";
import UsingNonceWithRef from "./UsingNonceWithRef";
import ViolatedCsp, { ViolatedCspConfig } from "./ViolatedCsp";

interface PagesType {
  path: string;
  // eslint-disable-next-line no-unused-vars
  Element: () => JSX.Element;
  pageCspConfig?: ContentSecurityPolicyType;
}

const Pages: PagesType[] = [
  {
    path: "/",
    Element: Home,
  },
  {
    path: "/satisfied-csp",
    Element: SatisfiedCsp,
  },
  {
    path: "using-nonce-with-ref",
    Element: UsingNonceWithRef,
  },
  {
    path: "violated-csp",
    Element: ViolatedCsp,
    pageCspConfig: ViolatedCspConfig,
  },
];
export default Pages;
