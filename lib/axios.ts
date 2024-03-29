import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export const Axios = async () => {
  const cookiesList = cookies();
  const token = cookiesList.get("next__token");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token?.value}`,
    },
  };

  const GET = async (endpoint: string) => {
    const res = await axios.get(`${baseUrl}/${endpoint}`, config);
    return res.data;
  };

  const POST = async (endpoint: string, data: any) => {
    const res = await axios.post(`${baseUrl}/${endpoint}`, data, config);
    return res;
  };

  const DELETE = async (endpoint: string) => {
    const res = await axios.delete(`${baseUrl}/${endpoint}`, config);
    return res;
  };

  return { config, baseUrl, POST, GET, DELETE, token };
};
