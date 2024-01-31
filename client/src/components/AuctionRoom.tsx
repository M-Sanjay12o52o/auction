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
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {auctionRooms.map(room => (
                    <div key={room.id} className="auction-room-card bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={room.image!}
                            alt={room.title}
                            width={500}
                            height={500}
                            className="object-cover w-full h-60"
                        />
                        <div className="p-4">
                            <h2 className="text-white text-lg font-semibold mb-2">{room.title}</h2>
                            <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs mb-2">{room.baseprice}</span>
                            <p className="text-gray-300 text-sm mb-4">{room.description}</p>
                            <div className="flex justify-between text-gray-300 text-sm">
                                <p>{`Author ID: ${room.authorId}`}</p>
                                <p>{`Item ID: ${room.id}`}</p>
                            </div>
                            <Link href={`rooms/${room.id}`}>
                                <p className="block bg-blue-500 text-white px-4 py-2 mt-4 rounded-md text-center hover:bg-blue-600">Enter Room</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuctionRoom;
