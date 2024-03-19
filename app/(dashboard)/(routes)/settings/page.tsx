import { SettingsClient } from "./components/client";

export default async function SettingsPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5">
        <SettingsClient initialData={[]} />
      </div>
    </div>
  );
}
