import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Navbar = () => {
  return (
    <div className="z-50 bg-background fixed top-0 flex items-center justify-between w-full px-6">
      <Logo className="w-28" />
      <ModeToggle />
    </div>
  );
};
