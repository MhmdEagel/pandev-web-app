"use server";

import { prisma } from "@/lib/prisma";

export async function getTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: "desc" },
      include: {
        transactionItems: true,
      },
    });
    return transactions;
  } catch (error) {
    throw error;
  }
}

export async function getTransactionByUuid(uuid: string) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: uuid },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
}

interface CreatetransactionInput {
  type: string;
  description: string;
  date?: string;
  status?: string;
  transaction_items: {
    name: string;
    price: number;
  }[];
}

export async function createTransaction(data: CreatetransactionInput) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        date: data.date ? new Date(data.date) : new Date(),
        status: data.status || "in_progress",
        transactionItems: {
          createMany: {
            data: data.transaction_items,
          },
        },
      },
    });

    return transaction;
  } catch (error) {
    throw error;
  }
}

interface UpdatetransactionInput {
  uuid: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  status: string;
}

export async function updateTransaction(data: UpdatetransactionInput) {
  try {
    const transaction = await prisma.transaction.update({
      where: { id: data.uuid },
      data: {
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: new Date(data.date),
        status: data.status,
      },
    });

    return transaction;
  } catch (error) {
    throw error;
  }
}

export async function deleteTransaction(uuid: string) {
  try {
    const result = await prisma.transaction.delete({
      where: { id: uuid },
    });
    return result;
  } catch (error) {
    throw error;
  }
}
