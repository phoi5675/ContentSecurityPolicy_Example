import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";
import Home from "./Home";
import InlineStylePage, { ViolatedCspConfig } from "./InlineStylePage";
import JoditPage, { JoditCspConfig } from "./JoditPage";

interface PagesType {
  path: string;
  pathname: string;
  // eslint-disable-next-line no-unused-vars
  Element: () => JSX.Element;
  pageCspConfig?: ContentSecurityPolicyType;
}

const Pages: PagesType[] = [
  {
    path: "/",
    pathname: "Home",
    Element: Home,
  },
  {
    path: "/inline-style",
    pathname: "Inline-style",
    Element: InlineStylePage,
    pageCspConfig: ViolatedCspConfig,
  },
  {
    path: "/jodit",
    pathname: "Jodit",
    Element: JoditPage,
    pageCspConfig: JoditCspConfig,
  },
];
export default Pages;
