"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface FormFooterProps {
  onClose?: () => void;
  loading: boolean;
  label: string;
}

export const FormFooter = ({ label, onClose, loading }: FormFooterProps) => {
  return (
    <div className="pt-6 flex items-center justify-end gap-4 w-full">
      {onClose!! && (
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
      )}
      <Button disabled={loading} type="submit">
        {label} {loading && <Spinner className="ml-2 text-white" />}
      </Button>
    </div>
  );
};
