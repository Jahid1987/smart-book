import { dbConnect } from "@/db/dbConnect";
import { User } from "@/lib/definitions";

const UsersTable =async ({query, currentPage }: {query: string; currentPage: number}) => {
    
    
    const db = dbConnect()
    const users: User[] = await db.collection('users').find({name: { $regex: query, $options: "i" }}).toArray()
    
    return (
        <div>
            {users.map(user => <p key={user._id}>{user.name}</p>)}
        </div>
    );
};

export default UsersTable;