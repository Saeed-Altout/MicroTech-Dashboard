"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { AxiosData } from "@/lib/axios";
import { ProjectForm } from "./form";
import { ProjectColumn } from "../../_components/columns";
import { Spinner } from "@/components/ui/spinner";

const axiosData = new AxiosData();

export const ClientProject = () => {
  const [data, setData] = useState<ProjectColumn | null>(null);
  const [constData, setConstData] = useState<any>({});
  const params = useParams();

  useEffect(() => {
    axiosData
      .fetchData(`project/index?id=${params.id}`)
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch(() => {
        setData(null);
      });

    axiosData
      .fetchData("project/get_groups")
      .then((fetchedData) => {
        setConstData(fetchedData);
      })
      .catch(() => {
        setConstData({});
      });
  }, [params]);

  if (!!data || params.id === "new") {
    return (
      <div className="mx-5">
        <ProjectForm initialData={data} constData={constData} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[500px]">
      <Spinner size="lg" className="mr-2" />
      Data is fetching now...
    </div>
  );
};
