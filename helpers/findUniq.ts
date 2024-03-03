import axios from "axios";

export async function findUniq({
  id,
  entrypoint,
}: {
  id: any;
  entrypoint: string;
}) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${entrypoint}/index?id=${+id}`
    );
    if (res.data.data === null) {
      return null;
    }
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
}
