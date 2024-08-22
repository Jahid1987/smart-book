'use server'
import { dbConnect } from "@/db/dbConnect";

export async function getTotalCount(collection: string, query?: {}){
    const db = dbConnect()
    const count = await db.collection(collection).countDocuments(query)
    return count
}