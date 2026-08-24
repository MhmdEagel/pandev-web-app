"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Dispatch, DragEvent, SetStateAction, useRef, useState } from "react";
import { toast } from "sonner";

interface PropTypes {
  onChange: (value: File[]) => void;
  value: File[];
  galleryPreviews: string[];
  setGalleryPreviews: Dispatch<SetStateAction<string[]>>;
}

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function GaleryDropzone(props: PropTypes) {
  const { onChange, value = [], galleryPreviews, setGalleryPreviews } = props;

  const dropzoneInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMediaChange = (selectedFile: File | null) => {
    if (!selectedFile) return;
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Format file harus JPG, PNG, atau WEBP");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }
    const previewUrl = URL.createObjectURL(selectedFile);
    setGalleryPreviews((prev) => [...prev, previewUrl]);
    onChange([...value, selectedFile]);
  };

  const handleDeleteMedia = (index: number) => {
    if (galleryPreviews[index]) {
      URL.revokeObjectURL(galleryPreviews[index]);
    }
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDropzone = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setIsDragging(false);
    if (file) handleMediaChange(file);
  };

  return (
    <div>
      <div className="flex border-2 border-dotted cursor-pointer border-black/30 min-h-60 text-muted-foreground">
        <input
          ref={dropzoneInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] ?? null;
            handleMediaChange(selectedFile);
          }}
        />
        <div
          className={cn(
            "flex flex-col justify-center items-center flex-1 gap-2 border",
            isDragging && "bg-primary/20 scale-[103%]",
          )}
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
            <div>Upload Foto Galeri</div>
            <div>Image: jpg/png/webp</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-4">
        {galleryPreviews.map((item, index) => (
          <div key={item} className="relative">
            <Image
              width={200}
              height={200}
              src={item}
              alt={`gallery image ${index + 1}`}
              className="object-cover aspect-square"
            />
            <Button
              type="button"
              className="absolute -top-1 -right-1"
              size={"icon-lg"}
              onClick={() => handleDeleteMedia(index)}
            >
              <XIcon />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
