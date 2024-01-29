export async function getData(entrypoint: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${entrypoint}/index`,
    { cache: "reload" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
