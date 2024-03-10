import { Spinner } from "@/components/ui/spinner";

export default function RootLoading() {
    return (
        <div className="h-full w-full flex justify-center items-center text-3xl">
            <Spinner className='h-10 w-10 dark:text-white' />
        </div>
    );
}
