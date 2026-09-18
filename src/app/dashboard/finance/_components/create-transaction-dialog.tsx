"use client";

import { createTransaction } from "@/app/actions/transaction";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { PlusIcon, XIcon } from "lucide-react";

const formSchema = z.object({
  type: z.string().min(1, "Tipe wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  status: z.string().min(1, "Status wajib diisi"),
  transaction_items: z
    .array(
      z.object({
        name: z.string().min(1, "Nama item wajib diisi"),
        price: z.coerce.number().min(1, "Harga wajib diisi"),
      }),
    )
    .min(1, "Minimal 1 item transaksi"),
});

interface PropTypes {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}

export default function CreateTransactionDialog(props: PropTypes) {
  const { open, setOpen, refetch } = props;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      status: "",
      transaction_items: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast.success("Berhasil membuat transaksi");
      form.reset();
      setOpen(false);
      refetch();
    },
    onError: (error) => {
      toast.error(`Gagal membuat data keuangan: ${error.message}`);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "transaction_items",
  });

  const transactionItemsError = form.formState.errors.transaction_items;

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const container = formRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [fields.length]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="border-b pb-2">
          <DialogTitle>Buat Transaksi</DialogTitle>
          <DialogDescription>
            Isi form di bawah ini untuk menambahkan transaksi
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          className="max-h-100 overflow-y-auto"
          onSubmit={(e) => form.handleSubmit(onSubmit)(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <FieldGroup className="gap-3">
            <Controller
              control={form.control}
              name="type"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Tipe Transaksi</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Pilih tipe transaksi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="INCOME">Pemasukan</SelectItem>
                        <SelectItem value="EXPENSE">Pengeluaran</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="description-form">Deskripsi</FieldLabel>
                  <Input
                    {...field}
                    id="description-form"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    placeholder="Deskripsi transaksi..."
                  />
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="date"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="date-form">Tanggal</FieldLabel>
                  <Input
                    {...field}
                    id="date-form"
                    type="date"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="status"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="in_progress">Diproses</SelectItem>
                        <SelectItem value="complete">
                          Selesai / Lunas
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
            <Field>
              <FieldLabel>Item Transaksi</FieldLabel>
              <Button
                className="w-fit! text-sm"
                type="button"
                size={"sm"}
                variant={"outline"}
                onClick={() => append({ name: "", price: 0 })}
              >
                <PlusIcon /> Tambah
              </Button>
              {fields.map((field, index) => (
                <div className="flex gap-2 items-end" key={field.id}>
                  <Controller
                    control={form.control}
                    name={`transaction_items.${index}.name`}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel
                          htmlFor={`transaction-item-name-${index}`}
                          className="text-xs"
                        >
                          Nama Item
                        </FieldLabel>
                        <Input
                          {...field}
                          id={`transaction-item-name-${index}`}
                          placeholder="Nama item..."
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name={`transaction_items.${index}.price`}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel
                          className="text-xs"
                          htmlFor={`transaction-item-name-${index}`}
                        >
                          Harga
                        </FieldLabel>
                        <Input
                          id={`transaction-item-name-${index}`}
                          type="number"
                          min={0}
                          aria-invalid={fieldState.invalid}
                          placeholder="0"
                          value={String(field.value ?? "")}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        <FieldError>{fieldState.error?.message}</FieldError>
                      </Field>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size={"icon"}
                    onClick={() => remove(index)}
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
              <FieldError>{transactionItemsError?.message}</FieldError>
            </Field>
          </FieldGroup>
          <Button
            type="submit"
            className="w-full h-10 mt-4"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                Menyimpan...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
