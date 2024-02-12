import axios from "axios";

export async function findUniq({
  id,
  entrypoint,
}: {
  id: any;
  entrypoint: string;
}) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${entrypoint}/index?id=${id}`
  );
  const item = res.data.data.data.filter((item: { id: string | number }) => {
    return +item.id === +id && item;
  });

  if (item.length === 0) {
    return null;
  }

  return item[0];
}
