"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Edit, ImagePlus, Images } from "lucide-react";

import { AxiosData } from "@/lib/axios";

import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GalleryImages } from "./gallery-images";
import { GalleryForm } from "./form";

const axiosData = new AxiosData();

export const ClientGallery = () => {
  const [data, setData] = useState<any | null>(null);
  const params = useParams();

  useEffect(() => {
    axiosData
      .fetchData(`project/index?id=${params.id}`)
      .then((fetchedData) => {
        if (fetchedData.images) {
          setData(fetchedData.images);
        }
      })
      .catch(() => {
        setData(null);
      });
  }, [params]);

  if (!!data || params.id === "new") {
    return (
      <div className="mx-5">
        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="bg-background">
            <TabsTrigger value="gallery">
              <Images className="h-4 w-4 mr-2" /> Gallery
            </TabsTrigger>
            <TabsTrigger value="upload">
              <ImagePlus className="h-4 w-4 mr-2" /> Upload
            </TabsTrigger>
            <TabsTrigger value="edit">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent value="gallery">
            <GalleryImages initialData={data || []} />
          </TabsContent>
          <TabsContent value="upload">
            <GalleryForm />
          </TabsContent>
          <TabsContent value="edit">form edit image</TabsContent>
        </Tabs>
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
