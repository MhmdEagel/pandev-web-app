"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PenIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import AvatarDropzoneDialog from "./avatar-dropzone-dialog";

export default function AvatarForm() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="py-4 px-8 mx-4 border-b flex items-center">
        <div className="w-1/2">
          <div className="font-bold">Avatar</div>
          <div>Edit avatar Anda</div>
        </div>
        <div className="w-full">
          <div className="relative w-fit">
            <Avatar className="size-18">
              <AvatarFallback>
                <UserIcon className="size-10" />
              </AvatarFallback>
            </Avatar>
            <Button onClick={() => { setOpen(true) }} variant={"outline"} className="rounded-full absolute top-0.5 -right-4" size={"icon"}><PenIcon className="size-4" /></Button>
            {/* <Button variant={"destructive"} className="rounded-full absolute -bottom-0.5 -right-4" size={"icon"}><TrashIcon className="size-4" /></Button> */}
          </div>
        </div>
      </div>
      <AvatarDropzoneDialog open={open} setOpen={setOpen} isinvalid="" onChange={(url: string) => { }} value="" />
    </>
  )
}
