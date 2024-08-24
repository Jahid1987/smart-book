import { dbConnect } from "@/db/dbConnect";

export async function fetchFilteredInvoices(query: string, currentPage: number){
    console.log(query, currentPage)
    const db = dbConnect()
    
    try {
        const invoices = await db.collection('invoices').find().skip(currentPage * 6).limit(6).toArray();
        return invoices;
    } catch (error) {
        throw new Error('Filtered invoices are not found')
    }
}