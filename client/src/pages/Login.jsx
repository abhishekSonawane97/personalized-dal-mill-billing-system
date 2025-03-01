import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProvider, { UserContext } from '../context/UserProvider';
const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Vite



const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
  const { fetchUser } = useContext(UserContext);

    // Mock authentication function
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Reset error message
        setError('');
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            setTimeout(()=> {setError("")}, 3000);
            return;
        }

        // You can replace this with an actual API call
        let res = await fetch(`${BASE_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        
        if (res.ok) {
            res = await res.json();
            localStorage.setItem("token", res.accessToken );
            console.log(' result : ', res.message, res.accessToken);
            fetchUser();
            navigate('/')
            
        } else {
            setError('Login failed. Please try again.');
            console.error("Failed to login:", res.status, res.statusText, error);
        }
    };

    return (
        <div className="h-[89vh] overflow-hidden overflow-y-auto relative isolate  bg-gray-900">
            
            {/* <div className="relative isolate overflow-hidden bg-gray-900"> */}
            {/* Background Gradient Graphic */}
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)'
          }}
        />
      </div>

            <div className="w-full m-0 sm:m-10 shadow sm:rounded-lg flex justify-center flex-1 text-white">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex flex-col items-center">
                        <form onSubmit={handleSubmit} className="w-full flex-1">
                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none p-2 px-4 inline-block text-sm text-white tracking-wide font-medium rounded-md bg-zinc-500 transform translate-y-1/2">
                                    sign In with Name, Email & Password
                                </div>
                            </div>
                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none text-black focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 text-black focus:bg-white mt-5"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none  text-black focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <button
                                    type="submit"
                                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex text-black items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-2">
                                        Sign In
                                    </span>
                                </button>
                                {
                                    error && <p className="mt-4 text-red-500 text-center">{error}</p>
                                }
                                <p className="mt-6 text-xs text-white text-center">Welcome, Admin! Ready to make things happen today.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;