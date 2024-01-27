import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <>
      <div className="flex w-full items-center">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 rounded-full w-48" />
          <Skeleton className="h-3 rounded-full w-96" />
          <Skeleton className="h-3 rounded-full w-60" />
        </div>
        <Skeleton className="h-12 w-28" />
      </div>
      <Skeleton className="h-[3px] w-full" />
      <Skeleton className="h-[500px] w-full" />
    </>
  );
}
