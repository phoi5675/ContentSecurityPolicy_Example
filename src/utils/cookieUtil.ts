import { Cookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

export type CookieNameType = "state" | "cspContent";

export const setCookie = (
  name: CookieNameType,
  value: string | object,
  options?: CookieSetOptions
) => {
  if (typeof value === "object") {
    return cookies.set(name, JSON.stringify(value), { ...options });
  }
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: CookieNameType) => {
  const cookie = cookies.get(name);
  try {
    if (cookie !== undefined) {
      return JSON.parse(cookie);
    }
  } catch (error) {
    return cookie;
  }
};
