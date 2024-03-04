import { Github } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <div className="flex items-center gap-5">
      <Button variant="outline" className="w-full">
        <span className="sr-only">GitHub</span>
        <Github className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="w-full">
        <span className="sr-only">Google</span>
        <FaGoogle className="h-4 w-4" />
      </Button>
    </div>
  );
};
