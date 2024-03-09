import axios from "axios";
import { api } from "@/lib/api";
import { onError } from "@/lib/error";

export async function getPlatforms() {
  const { baseUrl, config } = api();

  const url = `${baseUrl}/platform`;

  try {
    const res = await axios.get(`${url}/index`, config);
    return res.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getPlatformById(id: string) {
  const { baseUrl, config } = api();

  const url = `${baseUrl}/platform`;

  try {
    const res = await axios.get(`${url}/index?id=${id}`, config);
    return res.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
