import { MongoClient, ServerApiVersion } from "mongodb";
let db:any
export function dbConnect(){
  if(db) return db
    try {
        const uri = `mongodb+srv://book-store:H2g5qw20d2JzDF2t@cluster0.6iad9fh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        const client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            },
          });
        db =  client.db('smart-book')
        return db
    } catch (error) {
        throw new Error('Data base is not connected.')
    }
}