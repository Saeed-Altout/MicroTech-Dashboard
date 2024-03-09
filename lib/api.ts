"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { onError } from "./error";

export const api = () => {
  const cookiesList = cookies();
  const token = cookiesList.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const config = {
    headers: {
      Authorization: `Bearer ${token?.value}` || "",
    },
  };

  return { config, baseUrl, token };
};

export async function GET(url: string, id?: string) {
  const { config } = api();
  try {
    const res = await axios.get(`${url}/index?id=${id || ""}`, config);
    return res.data.data;
  } catch (error) {
    onError(error);
    if (id) return null;
    return [];
  }
}

export async function POST(url: string, data: any) {
  const { config } = api();
  await console.log(url, data, config);

  if (!url && !data && !config) {
    return null;
  }

  try {
    await axios.post(url, data, config);
  } catch (error) {
    console.log(error);
    onError(error);
  }
}

// import axios from "axios";
// import { onError } from "./error";
// // export const GET = async (endpoint: string, data: any) => {
// // const cookiesList = cookies();
// // const token = cookiesList.get("token");

// //   const res = await axios.post(
// //     `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`,
// //     data,
// //     {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     }
// //   );

// //   return res;
// // };

// export const post = async (endpoint: string, data: any) => {
//   // const cookiesList = cookies();
//   // const token = cookiesList.get("token");

//   // const apiConfig = {
//   //   headers: {
//   //     Authorization: `Bearer ${token?.value}` || "",
//   //   },
//   // };
//   try {
//     const res = await axios.post(`${baseUrl}/${endpoint}`, data);
//     return res;
//   } catch (error) {
//     onError(error);
//   }
// };

// export const GET = async (endpoint: string) => {
//   // const cookiesList = cookies();
//   // const token = cookiesList.get("token");

//   // const apiConfig = {
//   //   headers: {
//   //     Authorization: `Bearer ${token?.value}` || "",
//   //   },
//   // };
//   try {
//     const res = await axios.get(`${baseUrl}/${endpoint}`);
//     return res;
//   } catch (error) {
//     // onError(error);
//   }
// };
