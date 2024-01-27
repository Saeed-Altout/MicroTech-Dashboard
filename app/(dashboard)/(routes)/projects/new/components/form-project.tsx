"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { projectSchema } from "@/schemas";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";

import {
  Advantages,
  Links,
  Main,
  Members,
  Platforms,
  Technologies,
  Tools,
  WorkTypes,
} from "./form-fileds";
import { toast } from "sonner";

export const FormProject = ({
  technologies,
  tools,
  members,
  work_types,
  platforms,
}: {
  technologies: any;
  tools: any;
  members: any;
  work_types: any;
  platforms: any;
}) => {
  const [stepPage, setStepPage] = useState<number>(1);
  const [isMounted, setIsMounted] = useState(false);

  const handleNext = (e: number) => {
    setStepPage(Number(e) + 1);
    localStorage.setItem("step", String(e + 1));
  };
  const handlePrev = (e: number) => {
    setStepPage(Number(e) - 1);
    localStorage.setItem("step", String(e - 1));
  };

  useEffect(() => {
    setIsMounted(true);
    const currentPage = localStorage.getItem("step");
    if (currentPage) {
      setStepPage(Number(currentPage));
    }
  }, []);
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      functionality: "",
      description: "",
      about: "",
      advantages: [],
      links: [],
      technologies: [],
      tools: [],
      work_types: [],
      platforms: [],
      members: [],
    },
  });

  const renderStepPage = () => {
    switch (stepPage) {
      case 1:
        return <Main form={form} />;
      case 2:
        return (
          <div className="space-y-8">
            <Advantages form={form} />
            <Separator />
            <Links form={form} />
          </div>
        );
      case 3:
        return (
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-start gap-8 mb-8">
            <Technologies data={technologies} form={form} />
            <Tools data={tools} form={form} />
            <WorkTypes data={work_types} form={form} />
            <Platforms data={platforms} form={form} />
            <Members data={members} form={form} />
          </div>
        );
      case 4:
        return (
          <div className="text-center flex flex-col items-center justify-center gap-5">
            <Check className="text-green-500 h-10 w-10" />
            <p className="font-semibold">
              Thank you for create a new project, now you can{" "}
              <span className="underline cursor-pointer">show</span> last
              project you added.
            </p>
          </div>
        );

      default:
        return <Main form={form} />;
    }
  };

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    const promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
        console.log(values);
      }, 2000);
    });

    toast.promise(promise, {
      loading: "Creating a new project...",
      success: "New project created!",
      error: "Failed to create a new project.",
    });
  };

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Progress value={(stepPage * 100) / 4} className={cn("h-2")} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {renderStepPage()}
          <div className="flex justify-center mt-10">
            {stepPage == 4 && <Button type="submit">Create</Button>}
          </div>
        </form>
      </Form>
      <div className="w-full flex gap-5">
        <Button
          type="button"
          variant="outline"
          disabled={stepPage === 1}
          onClick={() => handlePrev(stepPage)}
        >
          <ChevronLeft className="h-4 w-5 mr-2" /> Prev
        </Button>

        <Button
          type="button"
          variant="default"
          disabled={stepPage === 4}
          onClick={() => handleNext(stepPage)}
        >
          Next
          <ChevronRight className="h-4 w-5 ml-2" />
        </Button>
      </div>
    </>
  );
};
