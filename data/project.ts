import axios from "axios";

export async function getProjects() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/project/index`
    );
    return res.data.data.data;
  } catch (error) {
    return [];
  }
}

export async function getProjectById(id: string) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/project/index?id=${id}`
    );
    return res.data.data;
  } catch (error) {
    return [];
  }
}
export async function getConstData() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/project/get_groups`
    );
    return res.data.data;
  } catch (error) {
    return [];
  }
}
