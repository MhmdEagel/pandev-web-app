"use client";

import { createPortfolioWizard } from "@/actions/gemini/ai";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowUpIcon,
  MicIcon,
  PaperclipIcon,
  WandSparklesIcon,
} from "lucide-react";
import { Dispatch, KeyboardEvent, SetStateAction, useEffect } from "react";
import { Controller, useForm, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  query: z.string().min(1, "Kueri wajib diisi"),
});

interface PropTypes {
  setValue: UseFormSetValue<any>;
  setTechStacks: Dispatch<SetStateAction<string[]>>;
}

export default function WizardInput(props: PropTypes) {
  const { setValue, setTechStacks } = props;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (query: string) => createPortfolioWizard(query),
    onSuccess: (res) => {
      if (res) {
        toast.success("Berhasil generate form");
        console.log(res.data);
        const { data } = res;
        if (data) {
          setValue("name", data.name ?? "");
          setValue("status", data.status ?? "");
          setValue("category", data.category ?? "");
          setValue("description", data.description ?? "");
          setValue("demo_link", data.demo_link ?? "");
          setValue("repository_link", data.repository_link ?? "");
          setTechStacks(data.tech_stacks ?? []);
        }
      }
    },
    onError: (err) => {
      toast.error(err.message ?? "Terjadi kesalahan");
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutate(data.query);
    form.reset();
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(form.getValues());
      form.reset();
    }
  };

  return (
    <div className="rounded-lg p-0.5 bg-linear-to-b from-blue-300 to-pink-300 ">
      <div className="bg-white rounded-[calc(0.6rem-1px)] p-2">
        <div className="mb-1"></div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="  flex gap-2">
          <div className="text-pink-600 ">
            <WandSparklesIcon className="size-5 self-start" />
          </div>
          <div className="w-full">
            <Controller
              control={form.control}
              name="query"
              render={({ field }) => (
                <textarea
                  {...field}
                  onKeyDown={handleKeyDown}
                  onInput={(e) => {
                    const textarea = e.currentTarget;

                    textarea.style.height = "auto";
                    textarea.style.height = `${textarea.scrollHeight}px`;
                  }}
                  placeholder="AI portfolio wizard..."
                  autoComplete="off"
                  className="focus:outline-none border-none w-full text-sm resize-none overflow-hidden"
                />
              )}
            />
          </div>
        </form>
        <div className="space-x-2 flex w-full justify-end">
          <Button type="button" variant={"ghost"} size={"icon"}>
            <PaperclipIcon />
          </Button>
            <Button type="button" variant={"ghost"} size={"icon"}>
              <MicIcon />
            </Button>
            <Button
              disabled={!form.formState.isValid || isPending}
              variant={"outline"}
            >
              {isPending ? (
                <>
                  <Spinner />
                  <span>Memuat...</span>
                </>
              ) : (
                <>
                  <ArrowUpIcon />
                  <span>Kirim</span>
                </>
              )}
            </Button>
        </div>
      </div>
    </div>
  );
}
