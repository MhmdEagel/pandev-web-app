"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Dispatch, DragEvent, SetStateAction, useRef, useState } from "react";

interface PropTypes {
  onChange: (value: File) => void;
  value: File | undefined;
  isinvalid: string;
  thumbnailPreview: string | null;
  setThumbailPreview: Dispatch<SetStateAction<string | null>>;
}

export default function ThumbnailDropzone(props: PropTypes) {
  const { onChange, value, isinvalid, thumbnailPreview, setThumbailPreview } =
    props;
  const dropzoneInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleThumbnailChange = (selectedFile: File | null) => {
    if (!selectedFile) return;
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }
    const previewUrl = URL.createObjectURL(selectedFile);
    setThumbailPreview(previewUrl);
    onChange(selectedFile);
  };

  const handleDeleteThumbnail = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbailPreview(null);
    onChange(undefined as unknown as File);
  };

  const handleDropzone = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setIsDragging(false);
    if (file) handleThumbnailChange(file);
  };

  const displaySrc =
    thumbnailPreview || (value ? URL.createObjectURL(value) : null);

  return (
    <div
      className={cn(
        "flex border-2 border-dotted cursor-pointer border-black/30 min-h-60 text-muted-foreground",
        isinvalid === "true" && "border-destructive",
        isDragging && "bg-primary/20 scale-[103%]",
      )}
    >
      <input
        ref={dropzoneInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] ?? null;
          handleThumbnailChange(selectedFile);
        }}
      />
      {displaySrc ? (
        <div className="relative m-4 mx-auto">
          <Image
            width={500}
            height={300}
            src={displaySrc}
            alt="thumbnail image"
            className="object-cover aspect-video"
          />
          <Button
            type="button"
            className="absolute -top-3 -right-3"
            size={"icon-lg"}
            onClick={handleDeleteThumbnail}
          >
            <XIcon />
          </Button>
        </div>
      ) : (
        <div
          className={"flex flex-col justify-center items-center flex-1 gap-2"}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onClick={() => {
            dropzoneInputRef.current?.click();
          }}
          onDrop={handleDropzone}
        >
          <UploadIcon className="size-8" />
          <div className="text-center">
            <div>Upload Thumbnail</div>
            <div>Image: jpg/png/webp</div>
          </div>
        </div>
      )}
    </div>
  );
}
