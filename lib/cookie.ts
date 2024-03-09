"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const deleteCookies = () => {
  const cookiesList = cookies();

  cookiesList.delete("name");
  cookiesList.delete("email");
  cookiesList.delete("refresh_token");
  cookiesList.delete("token");
};

export const deleteCookie = (name: string) => {
  const cookiesList = cookies();
  cookiesList.delete(name);
};

export const setCookie = (name: string, value: string) => {
  const cookiesList = cookies();
  cookiesList.set(name, value);
};

export const getCookie = (name: string) => {
  const cookiesList = cookies();
  const cookie = cookiesList.get(name);
  return cookie;
};

export const hasCookie = (name: string, route?: string) => {
  const cookiesList = cookies();

  const isExistingCookie = cookiesList.has(name);

  if (!isExistingCookie) {
    redirect(route || "/auth/login");
  }

  const cookie = getCookie(name);

  return cookie;
};
