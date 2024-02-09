import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId, newIcon, newBio } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {profileImg: newIcon, bio: newBio},
        });
        res.status(200).josn(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}