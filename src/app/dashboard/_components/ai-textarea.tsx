import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontalIcon } from "lucide-react";
import { KeyboardEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface PropTypes {
  sendMessage: (message: string) => void;
}

const formSchema = z.object({
  message: z.string().min(1, "Pesan wajib diisi"),
});

export default function AiTextarea(props: PropTypes) {
  const { sendMessage } = props;

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    sendMessage(data.message);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(form.getValues());
    }
  };

  return (
    <div className="relative">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              onKeyDown={handleKeyDown}
              placeholder="Tulis pertanyaan Anda.."
              className="resize-none h-28 overflow-y-auto"
            />
          )}
        />
        <Button size={"icon"} className="absolute right-2 bottom-2">
          <SendHorizontalIcon />
        </Button>
      </form>
    </div>
  );
}
