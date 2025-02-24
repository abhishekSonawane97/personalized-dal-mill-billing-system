import React, { useState, useEffect } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserProvider, { UserContext } from '../../context/UserProvider';
import { TypeContext } from '../../context/TypeProvider';

const Sidebar = () => {

    const { user, setUser } = useContext(UserContext);
    const { types, setTypes } = useContext(TypeContext);
    
    const [isOpen, setIsOpen] = useState(false);

    const sidebarToggle = () => {
        // console.log(isOpen, 'sidebarToggle');
        setIsOpen(!isOpen);
    };

    const handleLink = (val)=>{
        val && setTypes(val);
        setIsOpen(!isOpen);
    }

    // Check for dark mode preference
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
    
    }, [user]);

    return (
        <div className={`flex h-20 bg-gradient-to-r from-indigo-800 to-blue-900 relative items-center ${isOpen ? 'min-h-screen' : '' }`}>
            <aside className={`bg-white dark:bg-gray-800 w-full min-h-screen flex flex-col transition-all absolute left-0 duration-300 ease-in-out transform ${isOpen ? '' : '-translate-x-full z-10'}`}>
                <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-indigo-800  dark:text-white mx-4">Sai Dal Mill</h1>
                    <button onClick={()=>handleLink()} className="text-gray-500 hover:text-indigo-800 dark:text-gray-400 dark:hover:text-white font-bold text-2xl focus:outline-none">X
                        {/* <CloseIcon className="h-6 w-6" /> */}
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto">
                    <ul className="p-4 space-y-2">
                        <li className="menu-item-hover animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <Link to={user? '/' : '/login'} className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300" onClick={handleLink} >
                                    {/* <HomeIcon className="h-6 w-6 mr-3" /> */}
                                    Home
                            </Link>
                        </li>
                        <li className="menu-item-hover animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <Link to={ user? "/search-receipt" : '/login' }className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300" onClick={handleLink} >
                                {/* <SettingsIcon className="h-6 w-6 mr-3" /> */}
                                Search Receipt
                            </Link>
                        </li>
                        <li className="menu-item-hover animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            <Link to={ user? "/type/toor" : '/login' } className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300" onClick={()=> handleLink('toor')} >
                                {/* <MessagesIcon className="h-6 w-6 mr-3" /> */}
                                Toor
                            </Link>
                        </li>
                        <li className="menu-item-hover animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <Link to={ user? "/type/moog" : '/login' }className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300" onClick={()=> handleLink('moog')} >
                                {/* <SettingsIcon className="h-6 w-6 mr-3" /> */}
                                Moog
                            </Link>
                        </li>
                        <li className="menu-item-hover animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <Link to={ user? "/type/udid" : '/login' } className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300" onClick={()=> handleLink('udid')} >
                                {/* <SettingsIcon className="h-6 w-6 mr-3" /> */}
                                Udid
                            </Link>
                        </li>
                        <li className="menu-item-hover animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <Link to={ user? "/Analytics" : '/login' }className="flex items-center p-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-300" onClick={handleLink} >
                                {/* <AnalyticsIcon className="h-6 w-6 mr-3" /> */}
                                Analytics
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                {
                    user? (
                        <Link to="/" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300">
                            <img src="https://i.pravatar.cc/40?img=1" alt="User avatar" className="w-8 h-8 rounded-full mr-3" onClick={()=>handleLink()} />
                            <span className="font-medium">{user.name}</span>
                        </Link>
                    ) : (
                        <Link to="/login" className="flex items-center text-gray-700 dark:text-gray-200 hover:text-indigo-800 dark:hover:text-white transition-colors duration-300" onClick={()=>handleLink()}>
                            <img src="https://i.pravatar.cc/40?img=1" alt="User avatar" className="w-8 h-8 rounded-full mr-3" />
                            <span className="font-medium">Login</span>
                        </Link>
                    )
                }
                </div>
            </aside>
            <div className='flex justify-between w-full px-6'>
            <button onClick={sidebarToggle} className="text-white hover:text-indigo-200 focus:outline-none mb-4 text-6xl flex items-center">
                <h1 className="text-2xl font-bold text-white dark:text-white mx-4">Sai Dal Mill ☰ </h1>
                </button>
            <div className="p-4">
                {
                    user? (
                        <Link to="/" className="flex items-center text-white dark:text-white hover:text-white-800 dark:hover:text-white transition-colors duration-300" onClick={()=>handleLink()}>
                            <img src="https://i.pravatar.cc/40?img=1" alt="User avatar" className="w-8 h-8 rounded-full mr-3" />
                            <span className="font-medium">{user.name}</span>
                        </Link>
                    ) : (
                        <Link to="/login" className="flex items-center text-white dark:text-white hover:text-white-800 dark:hover:text-white transition-colors duration-300" >
                            <img src="https://i.pravatar.cc/40?img=1" alt="User avatar" className="w-8 h-8 rounded-full mr-3" />
                            <span className="font-medium">Login</span>
                        </Link>
                    )
                } 
                </div>
            </div> 
        </div>
    );
}

export default Sidebar;