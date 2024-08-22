import { MongoClient } from "mongodb";

export function dbConnect(){
    try {
        const uri = `mongodb+srv://book-store:H2g5qw20d2JzDF2t@cluster0.6iad9fh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        const client = new MongoClient(uri);
        const db =  client.db('smart-book')
        return db
    } catch (error) {
        throw new Error('Data base is not connected.')
    }
}