"use client";

import { useEffect, useState } from "react";

export function useResize(prevSize = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleResize = () => {
    const screenX = window.screenX;
    if (screenX <= prevSize) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
