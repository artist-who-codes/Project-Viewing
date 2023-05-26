import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

const protectedApiHandler: NextApiHandler = async (req, res) => {
    // Retrieve the session using next-auth getSession()
    const session = await getSession({ req });

    if (session) {
        // User is authenticated, perform the API logic here
        res.status(200).json({ message: 'Authenticated user' });
    } else {
        // User is not authenticated, return 401 Unauthorized
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default protectedApiHandler;