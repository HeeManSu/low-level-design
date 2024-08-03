import { Prisma } from "@prisma/client";
import prisma from "../config/prisma-client";


export const transaction = (callback: (trx: Prisma.TransactionClient) => Promise<any>): Promise<any> =>  {
    return prisma.$transaction(callback);
}