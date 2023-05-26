import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';

const uri = process.env.MONGO_URI as string
const client = new MongoClient(uri);
client.connect();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    console.log(session)
    if (session) {
        const { time } = req.query
        try {
            const database = client.db('Task-1');
            const Projects = database.collection('Projects');
            const data = await Projects.find({ 'time': time }).toArray();
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


