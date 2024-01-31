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

    // getting currentBid and lastBidder from the redux store
    const currentBid = useSelector((state: RootState) => state.room.items[item.id]?.currentBid)
    const lastBidder = useSelector((state: RootState) => state.room.items[item.id]?.lastBidder)

    const [socket, setSocket] = useState<Socket | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(60);
    const session = useSession();
    const userEmail = session.data?.user?.email;

    const handleBid = () => {
        let newBid = currentBid !== null ? (currentBid >= 500 ? currentBid + 100 : currentBid + 50) : 50

        // Check if newBid is NaN or not a valid number
        if (isNaN(newBid) || !isFinite(newBid)) {
            newBid = 50; // Set a default bid amount if newBid is NaN or not a valid number
        }

        console.log("bid: ", newBid, "bidder: ", userEmail, "itemId: ", item.id)

        dispatch(setCurrentBid({ bid: newBid, itemId: item.id }))
        dispatch(setLastBidder({ bidder: userEmail!, itemId: item.id }))
        setTimer(60);
        socket?.emit('placeBid', { newBid, userEmail, itemId: item.id });
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

        // setting the bid and bidder on update
        newSocket.on("bidUpdate", (data) => {
            const { currentBid: newCurrentBid, lastBidder: newLastBidder, itemId: newItemId } = data;

            dispatch(setCurrentBid({ bid: newCurrentBid, itemId: newItemId }))
            dispatch(setLastBidder({ bidder: newLastBidder, itemId: newItemId }))
        })

        // Clean up on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);


    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    clearInterval(timerId);
                    // TODO: Update product status to "Sold"
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [timer]);

    useEffect(() => {
        setIsButtonDisabled(lastBidder === userEmail)
    }, [lastBidder, userEmail])

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
                        disabled={isButtonDisabled}
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
