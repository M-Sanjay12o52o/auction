"use client"

import axios from 'axios';
import React, { FC, useState } from 'react';

interface pageProps { }

const AddItems: FC<pageProps> = ({ }) => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: "",
        baseprice: "",
        status: "NOT_IN_STOCK",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios.post("/api/additems", {
            title: formData.title,
            description: formData.description,
            image: formData.image,
            baseprice: formData.baseprice,
            status: formData.status,
        });

        setFormData({
            title: '',
            image: '',
            description: "",
            baseprice: "",
            status: "NOT_IN_STOCK",
        })
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-sm bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <input
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <input
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <input
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="image"
                    placeholder="Image url"
                    value={formData.image}
                    onChange={handleInputChange}
                />
                <input
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="baseprice"
                    placeholder="Base Price $$"
                    value={formData.baseprice}
                    onChange={handleInputChange}
                />
                <select
                    name='status'
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="IN_STOCK">IN_STOCK</option>
                    <option value="SOLD">SOLD</option>
                    <option value="NOT_IN_STOCK">NOT_IN_STOCK</option>
                </select>
                <button
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddItems;
