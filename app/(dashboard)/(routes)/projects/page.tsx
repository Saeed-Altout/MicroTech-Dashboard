import { Client } from "./_components/client";

export default async function Projects() {
  return (
    <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-272px)] ">
      <div className="space-y-6">
        <Client />
      </div>
    </div>
  );
}
