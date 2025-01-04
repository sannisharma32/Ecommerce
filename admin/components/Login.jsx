import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../src/App.jsx';
import { toast } from 'react-toastify';

const Login = ({settoken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onSubmithandler = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        try {
            setError(null); 
            const response = await axios.post(`${backendUrl}/api/user/adminlogin`, {
                email,
                password,
            });
            if(response.data.success){
                settoken(response.data.token) 

            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {

           console.log(error)
           toast.error(error.message)
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r w-full">
            <div className="bg-white shadow-lg px-10 py-8 rounded-lg max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Admin Panel
                </h1>
                <form onSubmit={onSubmithandler}>
                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}
                    <div className="mb-5">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Email Address
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="rounded-md w-full px-4 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                            type="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="rounded-md w-full px-4 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        className="mt-4 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 w-full text-white rounded-md py-2 text-lg font-semibold transition duration-200 shadow-md hover:shadow-lg"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Forgot your password?{' '}
                    <a href="#" className="text-indigo-600 hover:underline">
                        Reset here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
