"use client";

import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export const GalleryImages = ({ initialData = [] }: { initialData: any[] }) => {
  if (initialData.length < 1) {
    return (
      <div className="flex justify-center items-center  w-full h-[200px] text-muted-foreground">
        <AlertCircle className="h-5 w-5 mr-2" /> No images uploaded
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {initialData.map((image, index) => (
        <Card key={index}>
          <CardContent className="h-[300px] overflow-hidden p-0">
            <Image
              src={image.image_url}
              alt={`image-${index}`}
              width={1000}
              height={1000}
              className="object-cover"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
