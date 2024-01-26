"use client";
import { useEffect, useState } from "react";

export default function useScrollTop(prevScroll = 10) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = () => {
    const scrollX = window.scrollX;
    if (scrollX > prevScroll) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
}
