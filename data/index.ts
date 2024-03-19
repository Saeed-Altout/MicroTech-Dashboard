"use server";
import { onError } from "@/lib/error";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
export async function getProjects() {
  const cookiesList = cookies();
  const token = cookiesList.get("next__token");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_PROJECTS}`,
      config
    );

    return res?.data?.data?.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getProjectById(id: string) {
  const cookiesList = cookies();
  const token = cookiesList.get("next__token");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  };

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_PROJECTS}?id=${id}`,
      config
    );
    return res?.data?.data;
  } catch (error) {
    onError(error);
    return null;
  }
}
export async function getConstDataProject() {
  const cookiesList = cookies();
  const token = cookiesList.get("next__token");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_GROUPS}`,
      config
    );

    return res?.data?.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getTechnologies() {
  const cookiesList = cookies();
  const token = cookiesList.get("next__token");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_TECHNOLOGIES}`,
      config
    );
    return res.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getMembers() {
  const cookiesList = cookies();
  const token = cookiesList.get("next__token");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  };

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_MEMBERS}`,
      config
    );
    return res.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getPlatforms() {
  const cookiesList = cookies();
  const token = cookiesList.get("next__token");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  };

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_PLATFORMS}`,
      config
    );
    return res.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getToolsKit() {
  const cookiesList = cookies();
  const token = cookiesList.get("next__token");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_TOOLSKIT}`,
      config
    );
    return res.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getWorkTypes() {
  const cookiesList = cookies();
  const token = cookiesList.get("next__token");
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GET_WORKTYPES}`,
      config
    );

    return res.data.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
