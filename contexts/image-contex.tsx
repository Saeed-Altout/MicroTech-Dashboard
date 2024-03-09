"use client";

import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface StateImageContextProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  handleImage: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => void;
}

const StateImageContext = createContext<StateImageContextProps>({
  files: [],
  setFiles: () => {},
  handleImage: () => {},
});

export default function ImageContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // setFiles((prevFiles) => [
      //   ...prevFiles,
      //   ...Array.from(e.target.files || []),
      // ]);

      setFiles(Array.from(e.target.files || []));

      if (!file.type.includes("image")) return;

      fileReader.onload = () => {
        const imageDataUrl = fileReader.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <StateImageContext.Provider value={{ files, setFiles, handleImage }}>
      {children}
    </StateImageContext.Provider>
  );
}

export const useImageContext = () => useContext(StateImageContext);
