import axios from "axios";

export async function getItems(endpoint: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}/index`
    );
    return res.data.data;
  } catch (error) {
    return [];
  }
}
