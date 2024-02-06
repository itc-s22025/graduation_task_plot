// pages/aotPost/index.js
import FrameLayout from "../../components/frameLayout";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import Header from "../../components/header";
import { PrismaClient } from "../../../backend/node_modules/@prisma/client";

const prisma = new PrismaClient();

const UserPosts = ({ posts, userName }) => {
    const router = useRouter();
    const { userId } = router.query;
    const [newPost, setNewPost] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io();
        setSocket(socket);

        // クリーンアップ関数
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        // 新しい投稿を受信した場合の処理
        socket.on('newPost', (newPost) => {
            // 新しい投稿を更新
            setNewPost(newPost);
        });

        // クリーンアップ関数
        return () => {
            socket.off('newPost');
        };
    }, [socket]);

    const handleNewPost = async () => {
        // 新しい投稿をデータベースに保存
        await prisma.post.create({
            data: {
                content: newPost,
                userId: parseInt(userId, 10),
            },
        });

        // WebSocketを通じて新しい投稿をブロードキャスト
        socket.emit('newPost', newPost);
    };

    return (
        <div>
            <Header title="Posts"/>
            <FrameLayout/>
            <h1>{userName} Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.content}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
            />
            <button onClick={handleNewPost}>Post</button>
        </div>
    );
};

export async function getServerSideProps({ params }) {
    const userId = params?.userId ? parseInt(params.userId, 10) : null;

    if (!userId) {
        return {
            notFound: true,
        };
    }

    const user = await prisma.user.findUnique({
        where: {id: userId},
    });
//     const user = await prisma.user.findUnique({
//         where: { id: userId },
//     });
//     const posts = await prisma.post.findMany({
//         where: { userId: userId },
//     });
//
    return {
        props: {
            posts,
            userName: user?.name || null,
        },
    };
}

export default UserPosts;