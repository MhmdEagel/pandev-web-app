"use client";

import { createPortfolioWizard } from "@/actions/gemini/ai";
import { deleteMedia, uploadMedia } from "@/actions/media";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowUpIcon,
  ImageIcon,
  MicIcon,
  SquareIcon,
  WandSparklesIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
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

  const [isRecording, setIsRecording] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("type", "audio");
        formData.append("file", audioBlob);
        formData.append("images", JSON.stringify(previews));
        mutate(formData);

        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast.error("Gagal merekam suara");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createPortfolioWizard(formData),
    onSuccess: (res) => {
      if (res) {
        toast.success("Berhasil generate form");
        const { data } = res;
        if (data) {
          setValue("name", data.name ?? "");
          setValue("status", data.status ?? "");
          setValue("category", data.category ?? "");
          setValue("description", data.description ?? "");
          setValue("demo_link", data.demo_link ?? "");
          setValue("repository_link", data.repository_link ?? "");
          setValue("thumbnail", data.thumbnail);
          setValue("galery", data.galery);
          setTechStacks(data.tech_stacks ?? []);
        }
      }
    },
    onError: (err) => {
      toast.error(err.message ?? "Terjadi kesalahan");
    },
  });

  const { mutate: mutateUploadPicture, isPending: isPendingUploadPicture } =
    useMutation({
      mutationFn: ({ file, folder }: { file: File; folder?: string }) =>
        uploadMedia(file, folder),
      onSuccess: (data) => {
        if (data.url) {
          setPreviews((prev) => [...prev, data.url!]);
        }
      },
    });

  const { mutate: mutateDeletePicture, isPending: isPendingDeletePicture } =
    useMutation({
      mutationFn: (url: string) => deleteMedia(url),
    });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("query", data.query);
    formData.append("type", "text");
    formData.append("images", JSON.stringify(previews));
    mutate(formData);
    setPreviews([]);
    form.reset();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && form.watch("query") !== "") {
      e.preventDefault();
      onSubmit(form.getValues());
      form.reset();
    }
  };
  const handleUploadPicture = async (file: File) => {
    mutateUploadPicture({ file });
  };
  const handleDeletePicture = (indexToRemove: number) => {
    const picture = previews.find((_, index) => index === indexToRemove);
    if (picture) {
      mutateDeletePicture(picture);
      setPreviews(previews.filter((_, index) => index !== indexToRemove));
    }
  };

  return (
    <div className="rounded-lg p-0.5 bg-linear-to-b from-blue-300 to-pink-300 relative">
      <div className="bg-white rounded-[calc(0.6rem-1px)] p-2">
        <div className="flex gap-2">
          {previews.map((previewUrl, index) => (
            <div
              key={`wizard-image-${index}`}
              className="mb-3 w-18 h-18 bg-gray-200 rounded-lg relative flex justify-center items-center group"
            >
              <Image
                className="object-cover w-full h-full"
                src={previewUrl}
                width={200}
                height={200}
                alt=""
              />
              <Button
                onClick={() => handleDeletePicture(index)}
                className="absolute -top-1 -right-1 hidden group-hover:inline-flex cursor-pointer"
                size={"icon-xs"}
                variant={"outline"}
                type="button"
              >
                <XIcon />
              </Button>
            </div>
          ))}
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] ?? null;
              if (!selectedFile) return;
              handleUploadPicture(selectedFile);
            }}
          />
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
                  disabled={isRecording && isPending}
                  onInput={(e) => {
                    const textarea = e.currentTarget;

                    textarea.style.height = "auto";
                    textarea.style.height = `${textarea.scrollHeight}px`;
                  }}
                  placeholder={
                    isRecording
                      ? "Sedang mendengarkan..."
                      : isPending
                        ? "Sedang memproses..."
                        : "Generate form portfolio dengan AI Wizard..."
                  }
                  autoComplete="off"
                  className="focus:outline-none border-none w-full text-sm resize-none overflow-hidden"
                />
              )}
            />
          </div>
        </form>
        <div className="space-x-2 flex w-full justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                type="button"
                variant={"ghost"}
                size={"icon"}
              >
                <ImageIcon className="text-pink-600 size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div>Upload gambar</div>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                type="button"
                variant={"ghost"}
                size={"icon"}
              >
                {isRecording ? (
                  <SquareIcon className="text-red-500 animate-pulse size-5" />
                ) : (
                  <MicIcon className="text-pink-600 size-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div>Rekam suara</div>
            </TooltipContent>
          </Tooltip>
          <Button
            disabled={!form.formState.isValid || isPending}
            variant={"outline"}
          >
            {isPending ? (
              <>
                <Spinner variant="circle" className="size-5" />
                <span>Memuat...</span>
              </>
            ) : (
              <>
                <ArrowUpIcon className="size-5" />
                <span>Kirim</span>
              </>
            )}
          </Button>
        </div>
      </div>
      {isPendingUploadPicture || isPendingDeletePicture ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center gap-3 bg-gray-500/25 rounded-lg">
          <Spinner variant="circle" />
        </div>
      ) : null}
    </div>
  );
}
