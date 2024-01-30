"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentBid, setLastBidder } from '../features/room/roomSlice';
import { RootState } from "../lib/store"
import { useEffect, useState } from 'react';
import io, { Socket } from "socket.io-client"

const ItemPage = ({ item }: any) => {
    const dispatch = useDispatch();
    const currentBid = useSelector((state: RootState) => state.room.currentBid);
    const lastBidder = useSelector((state: RootState) => state.room.lastBidder)
    const [socket, setSocket] = useState<Socket | null>(null);

    console.log("globalCurrentBid: ", currentBid)
    console.log("globallastBidder: ", lastBidder)

    const session = useSession();
    const userEmail = session.data?.user?.email;

    const handleBid = () => {
        // if (userEmail) {
        //     dispatch(setLastBidder(userEmail))
        // }

        console.log('hello from handleBid')

        const newBid = currentBid !== null ? (currentBid >= 500 ? currentBid + 100 : currentBid + 50) : 50
        dispatch(setCurrentBid(newBid))

        console.log("newBid client: ", newBid, "userEmail client: ", userEmail)

        socket?.emit('placeBid', { newBid, userEmail });
    };

    useEffect(() => {
        const newSocket = io('http://localhost:3001');

        // Handle socket events
        newSocket.on('connect', () => {
            console.log('Connected to socket server');
            setSocket(newSocket);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        newSocket.on('error', (error) => {
            console.error('Socket error:', error);
            // Handle socket errors
        });

        newSocket.on("bidUpdate", (data) => {
            console.log("hello from bidUpdate: ", data)
            const { currentBid: newCurrentBid, lastBidder: newLastBidder } = data;
            console.log("newCurrentBid: ", newCurrentBid)
            console.log("newLastBidder: ", newLastBidder)
            dispatch(setCurrentBid(newCurrentBid))
            dispatch(setLastBidder(newLastBidder))
        })

        newSocket.on("test", (data) => {
            console.log("testData: ", data)
        })

        // Clean up on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <div>
            {item ? (
                <>
                    <h1 className='text-4xl font-bold'>Current Bid: {currentBid}</h1>
                    <br />
                    <h1 className='text-4xl font-bold'>Raising By: {
                        currentBid! >= 500 ? 100 : 50
                    }</h1>
                    <div>
                        <h2>{item.title}</h2>
                        {item.image && <Image src={item.image} alt={item.title} width={500} height={500} />}
                        <p>Description: {item.description}</p>
                        <p>Base Price: ${item.baseprice}</p>
                    </div>

                    <button
                        className={`w-full bg-blue-500 h-12 rounded-lg mt-4 ${lastBidder === userEmail ? 'blur-sm' : ''}`}
                        onClick={handleBid}
                        disabled={lastBidder === userEmail ? true : false}
                    >
                        Raise
                    </button>
                </>
            ) : (
                <p>Loading item details...</p>
            )
            }

        </div >
    );
};

export default ItemPage;
