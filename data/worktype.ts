import { GET, api } from "@/lib/api";

export async function getWorkTypes() {
  const { baseUrl } = api();
  const url = `${baseUrl}/work_types`;
  const res = await GET(url);
  return res;
}
export async function getWorkTypesById(id: string) {
  const { baseUrl } = api();
  const url = `${baseUrl}/work_types`;
  const res = await GET(url, id);
  return res;
}
