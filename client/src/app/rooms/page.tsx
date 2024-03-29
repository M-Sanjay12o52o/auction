import { FC } from 'react';
import { db } from '@/db/script';
import AuctionRoom from '../../components/AuctionRoom';

const AuctionPage: FC = async () => {
    const posts = await db.item.findMany();

    return <AuctionRoom auctionRooms={posts} />;
};

export default AuctionPage;

