import axios, { AxiosRequestConfig } from "axios";
import { onError } from "@/lib/error";

export const refresh = async () => {
  const config: AxiosRequestConfig = {
    headers: {},
  };

  try {
    await axios.get(`${process.env.NEXT_PUBLIC_REFRESH}`, config);
  } catch (error) {
    onError(error);
  }
};
