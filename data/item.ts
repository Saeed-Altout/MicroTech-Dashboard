"use server";

import { refreshToken } from "@/actions/refresh-token";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getItems(endpoint: string) {
  const cookiesList = cookies();
  const token = cookiesList.get("token");

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}/index`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    // if (error instanceof AxiosError) {
    //   switch (error.response?.status) {
    //     case 400:
    //       return { error: error.response?.data.message };
    //     case 401:
    //       refreshToken(() => {
    //         getItems(endpoint);
    //       });
    //     case 403:
    //       cookiesList.delete("name");
    //       cookiesList.delete("email");
    //       cookiesList.delete("refresh_token");
    //       cookiesList.delete("token");
    //       redirect("/auth/login");
    //     case 404:
    //       redirect("/error/not-found");
    //     default:
    //       redirect("/error/un-known");
    //   }
    // }
    return [];
  }
}

export async function getMembers() {
  // const cookiesList = cookies();
  // const token = cookiesList.get("token");

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/member/index`
      // {
      //   headers: {
      //     Authorization: `Bearer ${token?.value}`,
      //   },
      // }
    );
    return res.data.data;
  } catch (error) {
    // if (error instanceof AxiosError) {
    //   switch (error.response?.status) {
    //     case 400:
    //       return { error: error.response?.data.message };
    //     case 401:
    //       refreshToken(() => {
    //         getItems(endpoint);
    //       });
    //     case 403:
    //       cookiesList.delete("name");
    //       cookiesList.delete("email");
    //       cookiesList.delete("refresh_token");
    //       cookiesList.delete("token");
    //       redirect("/auth/login");
    //     case 404:
    //       redirect("/error/not-found");
    //     default:
    //       redirect("/error/un-known");
    //   }
    // }
    return [];
  }
}
