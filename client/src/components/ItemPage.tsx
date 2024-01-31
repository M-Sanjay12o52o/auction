"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentBid, setLastBidder } from '../features/room/roomSlice';
import { RootState } from "../lib/store";
import { useEffect, useState } from 'react';
import io, { Socket } from "socket.io-client";

const ItemPage = ({ item }: any) => {
    const dispatch = useDispatch();

    const currentBid = useSelector((state: RootState) => state.room.items[item.id]?.currentBid);
    const lastBidder = useSelector((state: RootState) => state.room.items[item.id]?.lastBidder);

    const [socket, setSocket] = useState<Socket | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(60);
    const session = useSession();
    const userEmail = session.data?.user?.email;

    const handleBid = () => {
        let newBid = currentBid !== null ? (currentBid >= 500 ? currentBid + 100 : currentBid + 50) : 50;

        if (isNaN(newBid) || !isFinite(newBid)) {
            newBid = 50;
        }

        dispatch(setCurrentBid({ bid: newBid, itemId: item.id }));
        dispatch(setLastBidder({ bidder: userEmail!, itemId: item.id }));
        setTimer(60);
        socket?.emit('placeBid', { newBid, userEmail, itemId: item.id });
    };

    useEffect(() => {
        const newSocket = io('http://localhost:3001');

        newSocket.on('connect', () => {
            console.log('Connected to socket server');
            setSocket(newSocket);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        newSocket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        newSocket.on("bidUpdate", (data) => {
            const { currentBid: newCurrentBid, lastBidder: newLastBidder, itemId: newItemId } = data;

            dispatch(setCurrentBid({ bid: newCurrentBid, itemId: newItemId }));
            dispatch(setLastBidder({ bidder: newLastBidder, itemId: newItemId }));
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    clearInterval(timerId);
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [timer]);

    useEffect(() => {
        setIsButtonDisabled(lastBidder === userEmail);
    }, [lastBidder, userEmail]);

    return (
        <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">
                Time Left: <span className={`font-medium text-lg ${timer <= 10 && 'text-red-600'}`}>{timer} seconds</span>
            </h1>
            {item ? (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-semibold">{item.title}</h2>
                            <p className="text-gray-500">{item.description}</p>
                            <p className="text-gray-500">Base Price: ${item.baseprice}</p>
                        </div>
                        <div>
                            <Image src={item.image} alt={item.title} width={200} height={200} />
                        </div>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold">Current Bid: ${currentBid}</h2>
                        <p className="text-gray-500">Raising By: ${currentBid! >= 500 ? 100 : 50}</p>
                    </div>
                    <button
                        className={`w-full bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-300 ${lastBidder === userEmail ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        onClick={handleBid}
                        disabled={isButtonDisabled}
                    >
                        Raise Bid
                    </button>
                </>
            ) : (
                <p>Loading item details...</p>
            )}
        </div>
    );
};

export default ItemPage;
