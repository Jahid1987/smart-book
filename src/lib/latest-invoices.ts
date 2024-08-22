import { dbConnect } from "@/db/dbConnect";

export async function getLatestInvoices(){
    const db =  dbConnect()
    const options = {
      projection: { _id: 1, name: 1, amount: 1, image: 1, email: 1 },
    };
    const invoices = await db.collection('invoices').find({}, options).limit(5).sort({createdAt: 1}).toArray()
    
    return invoices
}