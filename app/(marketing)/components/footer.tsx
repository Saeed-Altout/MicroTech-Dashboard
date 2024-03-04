import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="flex items-center justify-end w-full p-6 bg-background z-50">
      <Button variant="ghost" size="sm">
        Privacy Policy
      </Button>
      <Button variant="ghost" size="sm">
        Terms & Conditions
      </Button>
    </div>
  );
};
