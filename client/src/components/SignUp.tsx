"use client"

import axios from 'axios';
import React, { FC, useState } from 'react';

interface pageProps { }

const SignUp: FC<pageProps> = ({ }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const userData = {
        //     username: formData.username,
        //     email: formData.email,
        //     password: formData.password,
        // };

        await axios.post("/api/signup", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="w-full max-w-sm bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <input
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <input
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
