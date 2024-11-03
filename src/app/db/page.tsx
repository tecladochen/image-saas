import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from '@/db/schema';

const db = drizzle(process.env.DATABASE_URL!);





export default async function () {
    const user: typeof usersTable.$inferInsert = {
        name: 'John',
    };

    await db.insert(usersTable).values(user);
    console.log('New user created!')

    const users = await db.select().from(usersTable);
    console.log('Getting all users from the database: ', users)
    return <div>{users.map(user => <div key={user.id}>{user.name}</div>)}</div>
}
