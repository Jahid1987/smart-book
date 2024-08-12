import { dbConnect } from "@/db/dbConnect"

export function CRUD(collection: string){
    // craete doc in collection
    async function createDoc(doc:{}){
        try {
            // connect to db

            // save it to the db
            
            // return response 
            return ('ok')
        } catch (error) {
            console.log(error)
            throw new Error(`Could not creat doc in ${collection}`)
        }
    }

    // update doc in collection
    async function updateDoc(updateDoc:{}){
        try {
            // connect to db

            // save it to the db

            // return response 
            return (`Created doc in ${collection}`)
        } catch (error) {
            console.log(error)
            throw new Error(`Could not creat doc in ${collection}`)
        }
    }

    // get single doc from collection
    async function getDoc(query: string): Promise<{}>{
        try {
            // connect to db

            // find the specific doc from the specific collection
            const res = await fetch(`https://jsonplaceholder.typicode.com/${collection}/${query}`)
            const doc = await res.json()
            // return response 
            return (doc)
        } catch (error) {
            console.log(error)
            throw new Error(`Could not found the doc in ${collection}`)
        }
    }

    // get all docs from collection
    async function getDocs(query?:string){
        try {
            // connect to db
            const db = await dbConnect()
            // find all docs from the specific collection
            const docs = await db.collection(collection).find().toArray()
            
            // return response 
            return (docs)
        } catch (error) {
            console.log(error)
            throw new Error(`Could not found docs in ${collection} collection`)
        }
    }
    return {createDoc, updateDoc, getDoc, getDocs}

}