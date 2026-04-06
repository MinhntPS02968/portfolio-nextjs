import Cookies from "js-cookie";

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const setCookie = (
  name: string,
  value: string,
  options: Cookies.CookieAttributes = {}
) => {
  Cookies.set(name, value, {
    expires: 7,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    ...options,
  });
};

export const deleteCookie = (name: string) => {
  Cookies.remove(name);
};
