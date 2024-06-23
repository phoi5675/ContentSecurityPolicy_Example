import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";
import HomePage from "./HomePage";
import InlineStylePage from "./InlineStylePage";
import JoditPage from "./JoditPage";
import XssPage from "./XssPage";

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
    Element: HomePage,
  },
  {
    path: "/xss",
    pathname: "XSS",
    Element: XssPage,
  },
  {
    path: "/inline-style",
    pathname: "Inline-style",
    Element: InlineStylePage,
  },
  {
    path: "/jodit",
    pathname: "Jodit",
    Element: JoditPage,
  },
];
export default Pages;
