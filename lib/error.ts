import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export const onError = async (error: any) => {
  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case 400:
        return error.response?.data.message;
      case 401:
        redirect("/auth/login");
      case 403:
        redirect("/auth/login");
      case 404:
        redirect("/error/not-found");
      case 500:
        redirect("/error/not-found");
      default:
        return "Request failed";
    }
  } else {
    return "Something went wrong!";
  }
};
