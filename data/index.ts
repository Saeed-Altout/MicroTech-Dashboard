import { onError } from "@/lib/error";
import { Axios } from "@/lib/axios";

export async function getProjects() {
  const { GET } = await Axios();

  try {
    const res = await GET(`${process.env.PROJECT}`);
    return res?.data?.data;
  } catch (error) {
    onError(error);
    return [];
  }
}

export async function getProjectById(id: string) {
  const { GET } = await Axios();
  try {
    const res = await GET(`${process.env.PROJECT}?id=${id}`);
    return res?.data;
  } catch (error) {
    onError(error);
    return null;
  }
}

export async function getTechnologies() {
  const { GET } = await Axios();
  try {
    const res = await GET(`${process.env.TECHNOLOGY}`);
    return res?.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getConstDataProject() {
  const { GET } = await Axios();
  try {
    const res = await GET(`${process.env.GET_GROUP}`);
    return res?.data;
  } catch (error) {
    onError(error);
    return [];
  }
}

export async function getMembers() {
  const { GET } = await Axios();
  try {
    const res = await GET(`${process.env.MEMBER}`);
    return res?.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getPlatforms() {
  const { GET } = await Axios();
  try {
    const res = await GET(`${process.env.PLATFORM}`);
    return res?.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getToolsKit() {
  const { GET } = await Axios();
  try {
    const res = await GET(`${process.env.TOOL}`);
    return res?.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
export async function getWorkTypes() {
  const { GET } = await Axios();
  try {
    const res = await GET(`${process.env.WORK_TYPES}`);
    return res?.data;
  } catch (error) {
    onError(error);
    return [];
  }
}
