"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProjectState = createContext({
  data: [],
  item: {},
  loading: false,
  fetchProject: (id: any): void => {},
});
export function ProjectContext({ children }: any) {
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const fetchProjects = () => {
    try {
      setLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/project/index`)
        .then((res) => res.data.data.data)
        .then((data) => setData(data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProject = ({ id }: { id: any }) => {
    try {
      setLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/project/index?id=${id}`)
        .then((data) => setItem(data.data));
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchProjects();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <ProjectState.Provider value={{ data, loading, item, fetchProject }}>
      {children}
    </ProjectState.Provider>
  );
}

export const useStateContext = () => useContext(ProjectState);
