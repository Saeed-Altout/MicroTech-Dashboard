import axios from "axios";

export async function findMany({ entrypoint }: { entrypoint: string }) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${entrypoint}/index`
    );
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data"); // You may want to handle errors more gracefully
  }
}
