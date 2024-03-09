import { GET, api } from "@/lib/api";

export async function getMembers() {
  const { baseUrl } = api();

  const url = `${baseUrl}/member`;

  const res = await GET(url);

  return res;
}
export async function getMemberById(id: string) {
  const { baseUrl } = api();
  const url = `${baseUrl}/member`;
  const res = await GET(url, id);
  return res;
}
