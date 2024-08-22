import { dbConnect } from "@/db/dbConnect";
import { WithId } from "mongodb";
import { LatestInvoice } from "./definitions";

export async function getLatestInvoices(){
    const db =  dbConnect()
    const options = {
      projection: { _id: 1, name: 1, amount: 1, image: 1, email: 1 },
    };

    const invoices = await db.collection<LatestInvoice>('invoices').find({}, options).limit(5).toArray();
    
    return invoices
}