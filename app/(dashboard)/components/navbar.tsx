import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  return (
    <nav className="min-h-16 h-16 px-4 transition-all border-b">
      <div className="w-full h-full flex justify-end items-center gap-4">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
};
