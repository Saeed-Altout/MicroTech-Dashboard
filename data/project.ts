import axios from "axios";
import { api } from "@/lib/api";
import { onError } from "@/lib/error";

export async function getProjects() {
  const { baseUrl, config } = api();

  const url = `${baseUrl}/project`;

  try {
    const res = await axios.get(`${url}/index`, config);
    return res.data.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}

export async function getProjectById(id: string) {
  const { baseUrl, config } = api();

  const url = `${baseUrl}/project`;

  try {
    const res = await axios.get(`${url}/index?id=${id}`, config);
    return res.data.data;
  } catch (error) {
    onError(error);
    return null;
  }
}
export async function getConstDataProject() {
  const { baseUrl, config } = api();

  const url = `${baseUrl}/project`;

  try {
    const res = await axios.get(`${url}/get_groups`, config);
    return res.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
