"use client";

import { deleteTransaction, getTransactions } from "@/app/actions/transaction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, convertToIDR } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  PrinterIcon,
  Trash2Icon,
} from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";
import DeleteTransactionDialog from "./delete-transaction-dialog";
import { useState } from "react";
import { ITransactionExtended } from "../_types/Transaction";
import DetailTransactionDialog from "./detail-transaction-dialog";
import { PDFViewer } from "@react-pdf/renderer";
import TransactionDocument from "./transaction-document";

const TABLE_HEADER = [
  "#",
  "Date",
  "Total Amount",
  "Description",
  "Status",
  "Action",
];

interface PropTypes {
  isPending: boolean;
  transactions: ITransactionExtended[] | undefined;
  refetch: () => void;
}

export default function TransactionTable(props: PropTypes) {
  const { transactions, isPending, refetch } = props;

  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransactionExtended | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const {
    mutate: mutateDeleteTransaction,
    isPending: isPendingDeleteTransaction,
  } = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      refetch();
      toast.success("Transaksi berhasil dihapus");
      setSelectedTransaction(null);
    },
    onError: () => {
      toast.error("Gagal menghapus transaksi");
    },
  });

  return (
    <Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_HEADER.map((header) => (
              <TableHead key={`th-${header}`}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((transaction, index) => {
            let totalAmmout = 0;
            transaction.transactionItems.map(
              (item) => (totalAmmout += item.price),
            );

            return (
              <TableRow key={transaction.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {transaction.date.toLocaleDateString()}
                </TableCell>
                <TableCell
                  className={cn(
                    "flex items-center",
                    transaction.type === "INCOME"
                      ? "text-green-700"
                      : "text-red-700",
                  )}
                >
                  {transaction.type === "INCOME" ? (
                    <PlusIcon className="size-4" />
                  ) : (
                    <MinusIcon className="size-4" />
                  )}
                  {convertToIDR(totalAmmout)}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "px-1 text-nowrap w-fit text-xs",
                      transaction.status === "complete"
                        ? "bg-primary"
                        : "bg-amber-600",
                    )}
                  >
                    {transaction.status === "complete"
                      ? "Selesai / Lunas"
                      : "Diproses"}
                  </Badge>
                </TableCell>
                <TableCell className="flex">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="text-muted-foreground"
                      >
                        <EllipsisVerticalIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit">
                      <div className="flex justify-start flex-col gap-2">
                        <Button
                          variant="ghost"
                          className="text-muted-foreground w-fit"
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setOpenDetailDialog(true);
                          }}
                        >
                          <ExternalLinkIcon className="size-4" />
                          Detail
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-muted-foreground w-fit"
                          onClick={() => {}}
                        >
                          <PencilIcon className="size-4" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-muted-foreground w-fit hover:text-destructive"
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          <Trash2Icon className="size-4" />
                          Hapus
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {isPending && (
          <TableCaption className="mb-4">
            <Spinner variant="circle" />
          </TableCaption>
        )}
        {!isPending && transactions?.length === 0 && (
          <TableCaption className="mb-4">Belum ada data transaksi</TableCaption>
        )}
      </Table>
      {/* <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Rows per page</div>
              <Select
                value={limit.toString()}
                onValueChange={(value) => {
                  setLimit(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder={limit.toString()} />
                </SelectTrigger>
                <SelectContent>
                  {[1, 10, 20, 50, 100].map((size) => (
                    <SelectItem key={`limit-${size}`} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {transactions?.totalPages && transactions?.totalPages > 1 ? (
              <Pagination className="w-auto mx-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        page === 1
                          ? setPage(Number(transactions?.totalPages))
                          : setPage(page - 1)
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        page === Number(transactions?.totalPages)
                          ? setPage(1)
                          : setPage(page + 1)
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : (
              ''
            )}
          </div> */}
      <DeleteTransactionDialog
        transactionId={selectedTransaction?.id ?? ""}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        mutateDeleteTransaction={mutateDeleteTransaction}
        isPending={isPendingDeleteTransaction}
      />
      <DetailTransactionDialog
        open={openDetailDialog}
        setOpen={setOpenDetailDialog}
        transaction={selectedTransaction}
      />
    </Fragment>
  );
}
