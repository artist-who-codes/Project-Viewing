import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

const uri = process.env.MONGO_URI as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (session) {
        try {
            const client = new MongoClient(uri);
            await client.connect();
            const database = client.db('Task-1');
            const Tasks = database.collection('Tasks');
            const data = await Tasks.find().toArray();
            res.status(200).json(data)
        }
        catch (error) {
            console.log("error");
            res.status(404).json({ error })
        }
    }
    else {
        res.status(404).json({ message: "Unauthorised" })
    }
}
