import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface AuctionRoom {
    id: number;
    title: string;
    image: string | null;
    description: string | null;
    baseprice: string | null;
    published: boolean;
    authorId: number;
}

interface PageProps {
    auctionRooms: AuctionRoom[];
}

const AuctionRoom: FC<PageProps> = ({ auctionRooms }) => {
    return (
        <div className="page">
            <div className="auction-room-container">
                {auctionRooms.map(room => (
                    <div key={room.id} className="auction-room-card relative">
                        <Image
                            src={room.image!}
                            alt={room.title}
                            width={500}
                            height={500}
                            className="object-cover w-full h-full rounded-md m-2"
                        />
                        <div className="absolute inset-0 flex flex-col justify-between p-4">
                            <div className="top-info">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-white text-lg font-semibold">{room.title}</h2>
                                    <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs">{room.baseprice}</span>
                                </div>
                                <p className="text-white text-sm mb-2">{room.description}</p>
                                <p className="text-white text-sm">{`Author ID: ${room.authorId}`}</p>
                            </div>
                            <Link href={`rooms/${room.id}`}>
                                <p className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600">Enter Room</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuctionRoom;
