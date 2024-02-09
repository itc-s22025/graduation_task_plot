const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId, newIcon, newBio } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {profileImg: newIcon, bio: newBio},
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
module.exports = handler