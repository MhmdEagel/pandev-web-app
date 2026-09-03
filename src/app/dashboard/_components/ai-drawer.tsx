"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BotIcon, BrainIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AiTextarea from "./ai-textarea";
import { useMutation } from "@tanstack/react-query";
import { getAiResponse } from "@/actions/ai";
import { Conversation, Interaction } from "@/types/Ai";
import { Spinner } from "@/components/ui/spinner";

export default function AiDrawer() {
  const [open, setOpen] = useState(false);
  const [conversation, setConversations] = useState<Interaction>({
    conversations: [],
  });

  const chatRef = useRef<HTMLDivElement>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      message,
      interaction_id,
    }: {
      message: string;
      interaction_id?: string;
    }) =>
      getAiResponse({
        message,
        interaction_id,
      }),
    onSuccess: (data) => {
      const aiResponse = {
        type: "model_output",
        content: [
          {
            type: "text",
            text: data.text,
          },
        ],
      };
      setConversations((prev) => ({
        id: data.interaction_id,
        conversations: [...prev.conversations, aiResponse],
      }));
    },
  });

  const sendMessage = (message: string) => {
    const userInput = {
      type: "user_input",
      content: [
        {
          type: "text",
          text: message,
        },
      ],
    };
    setConversations((prev) => ({
      ...prev,
      conversations: [...prev.conversations, userInput],
    }));
    mutate({ message, interaction_id: conversation.id });
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversation]);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right" modal={false}>
      <DrawerTrigger asChild>
        <Button className="absolute bottom-5 right-5 flex items-center text-white py-6 rounded-full px-4">
          {open ? <XIcon className="size-5" /> : <BotIcon className="size-5" />}
          AI Assistant
        </Button>
      </DrawerTrigger>
      <DrawerContent className="m-4 shadow-lg w-70! md:w-125! max-h-115 md:max-h-120 lg:max-h-140 ml-4 z-10 rounded-lg border">
        <DrawerHeader className="bg-primary rounded-tr-lg rounded-tl-lg">
          <div className="flex items-center gap-2 ">
            <BrainIcon className="size-10 text-white" />
            <div>
              <DrawerTitle className="text-white">PanDev AI</DrawerTitle>
              <DrawerDescription className="text-white">
                {" "}
                Asisten Pintar & Interaktif PanDev
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>
        <div
          ref={chatRef}
          className="flex flex-col gap-4 h-full overflow-y-auto p-4"
        >
          {conversation.conversations.length > 0 ? (
            <>
              {conversation.conversations.map((item, index) =>
                item.type === "model_output" ? (
                  <div
                    className="w-fit max-w-full"
                    key={`ai-response-${index}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <BotIcon />
                      <div>Iria</div>
                    </div>
                    <div className="border p-4 rounded-2xl rounded-tl-none shadow-md">
                      {item.content[0].text}
                    </div>
                  </div>
                ) : (
                  <div
                    key={`user-response-${index}`}
                    className="border p-4 rounded-2xl rounded-br-none w-fit max-w-3/2 ml-auto shadow-md text-balance"
                  >
                    {item.content[0].text}
                  </div>
                ),
              )}
              <div>
                {isPending && <Spinner variant="ellipsis" />}
              </div>
            </>
          ) : (
            <div className="flex flex-col h-full items-center justify-center">
              <div className="text-lg font-semibold">
                Halo ada yang bisa saya bantu?
              </div>
              <div>Iria siap membantu Anda</div>
            </div>
          )}
        </div>
        <DrawerFooter>
          <AiTextarea sendMessage={sendMessage} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
