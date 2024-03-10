"use server";

import { cookies } from "next/headers";

export const Cookie = async () => {
  const cookiesList = cookies();

  const deleteCookies = () => {
    cookiesList.delete("name");
    cookiesList.delete("email");
    cookiesList.delete("refresh_token");
    cookiesList.delete("token");
    return null;
  };

  const deleteCookie = (name: string) => {
    cookiesList.delete(name);
    return null;
  };

  const setCookie = (name: string, value: string) => {
    cookiesList.set(name, value);
    return null;
  };

  const getCookie = (name: string) => {
    const cookie = cookiesList.get(name);
    return cookie;
  };

  const hasCookie = (name: string) => {
    const isExistingCookie = cookiesList.has(name);
    if (!isExistingCookie) {
      return false;
    }
    return true;
  };

  return { deleteCookies, deleteCookie, getCookie, setCookie, hasCookie };
};
