import axios from "axios";
import { api } from "@/lib/api";
import { onError } from "@/lib/error";

export async function getTechnologies() {
  const { baseUrl, config } = api();

  const url = `${baseUrl}/technology`;

  try {
    const res = await axios.get(`${url}/index`, config);
    return res.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getTechnologyById(id: string) {
  const { baseUrl, config } = api();

  const url = `${baseUrl}/technology`;

  try {
    const res = await axios.get(`${url}/index?id=${id}`, config);
    return res.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
