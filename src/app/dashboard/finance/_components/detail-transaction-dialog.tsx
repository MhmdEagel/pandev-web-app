import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ITransactionExtended } from "../_types/Transaction";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DownloadIcon, PrinterIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertToIDR } from "@/lib/utils";
import { pdf } from "@react-pdf/renderer";
import TransactionDocument from "./transaction-document";
import { saveAs } from "file-saver";

interface PropTypes {
  transaction: ITransactionExtended | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DetailTransactionDialog(props: PropTypes) {
  const { transaction, open, setOpen } = props;

  const handleDownload = async (transaction: ITransactionExtended | null) => {
    if (transaction) {
      const filename = `INVOICE-${transaction.id}`;
      const blob = await pdf(
        <TransactionDocument transaction={transaction} />,
      ).toBlob();
      saveAs(blob, filename);
      return;
    }
    return;
  };

  if (transaction) {
    let totalPrice = 0;
    transaction.transactionItems.map((item) => (totalPrice += item.price));
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-lg">
          <DialogHeader className="flex-row items-center px-4 pt-4">
            <Image
              src={"/assets/common/logo.png"}
              width={50}
              height={50}
              alt="Brand Logo"
            />
            <div>
              <DialogTitle className="text-primary font-bold!">
                Pandev
              </DialogTitle>
              <DialogDescription>Digital Agency Indonesia</DialogDescription>
            </div>
          </DialogHeader>
          <div className="uppercase font-bold text-primary flex items-center gap-4">
            <div className="h-1 w-full bg-primary"></div>
            <div>TRANSACTION</div>
            <div className="h-1 w-1/8 bg-primary"></div>
          </div>
          <div>
            <div className="mb-2">
              Tanggal:{" "}
              <span className="text-muted-foreground">
                {format(transaction?.date.toISOString(), "dd-MM-yyyy")}
              </span>
            </div>
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Item Transaksi</TableHead>
                  <TableHead>Harga</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaction.transactionItems.map((item, index) => (
                  <TableRow key={`transaction-item-${index}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{convertToIDR(item.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="ml-auto w-fit bg-primary text-white p-3 font-semibold">
            Total: {convertToIDR(totalPrice)}
          </div>
          <DialogFooter>
            <Button
              onClick={() => handleDownload(transaction)}
              variant={"outline"}
            >
              <PrinterIcon /> Cetak Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
