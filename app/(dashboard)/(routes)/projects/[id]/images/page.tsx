import { ImagesClient } from "./components/client";

import { getProjectById } from "@/data";

export default async function Images({ params }: { params: { id: any } }) {
  const initialData = await getProjectById(params.id);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5">
        <ImagesClient initialData={initialData} />
      </div>
    </div>
  );
}
