import axios from "axios";

export async function findMany({ entrypoint }: { entrypoint: string }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${entrypoint}/index`
  );

  return res.data.data;
}
