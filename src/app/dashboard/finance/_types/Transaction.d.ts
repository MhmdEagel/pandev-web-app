import { Transaction, TransactionItem } from "@prisma/client";

interface ITransactionExtended extends Transaction {
    transactionItems: TransactionItem[]
}

export type {ITransactionExtended}