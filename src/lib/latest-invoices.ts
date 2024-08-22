import { dbConnect } from "@/db/dbConnect";

export async function getLatestInvoices(){
    const db =  dbConnect()
    const options = {
      projection: { _id: 1, name: 1, amount: 1 },
    };
    const docs = await db.collection('invoices').find({}, options).limit(5).sort({createdAt: 1}).toArray()
    // converting ObjectId into normal id
    const invoices = docs.map((item) => {
        return { ...item, id: item._id.toString() };
      })
      .map(({ _id, ...rest }) => rest);
    return invoices
}