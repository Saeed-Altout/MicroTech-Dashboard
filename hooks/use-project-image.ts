import { create } from "zustand";
import { SetState } from "zustand";
import { ChangeEvent } from "react";

interface FilesState {
  cover: File[];
  logo: File[];
}

interface ProjectStore {
  files: FilesState;
  setFiles: (name: "cover" | "logo", files: File[]) => void;
  handleImage: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
    name: "logo" | "cover"
  ) => void;
}

export const useProjectStore = create<ProjectStore>(
  (set: SetState<ProjectStore>) => ({
    files: {
      cover: [],
      logo: [],
    },
    setFiles: (name, files) =>
      set((state) => ({ ...state, files: { ...state.files, [name]: files } })),
    handleImage: (e, fieldChange, name) => {
      e.preventDefault();
      const fileReader = new FileReader();

      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        set((state) => ({
          ...state,
          files: { ...state.files, [name]: Array.from(e.target.files!!) },
        }));

        if (!file.type.includes("image")) return;

        fileReader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() || "";
          fieldChange(imageDataUrl);
        };

        fileReader.readAsDataURL(file);
      }
    },
  })
);
