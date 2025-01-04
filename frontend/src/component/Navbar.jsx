import React, { useContext, useState,useEffect } from 'react';
import { assets } from "../assets/assets.js";
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Shopcontext } from '../context/ShopContext.jsx';

const Navbar = () => {
    const [Visible, setVisible] = useState(null);
    const { setshowSearch, getCartCount,token,setToken,setCartItems,navigate} = useContext(Shopcontext);
    const location = useLocation();

    const Logout = () => {

        navigate('/loging')
        localStorage.removeItem('token');
        setToken('')
        setCartItems({})
      
    }

    // Reset showSearch when the route changes to prevent search bar from being visible on new pages
    useEffect(() => {
        setshowSearch(false); // Hide search bar when navigating to any page
    }, [location, setshowSearch]); // Trigger when the location changes

    return ( 
        <div className='flex items-center justify-between py-5 front-medium'>
            <Link to="/"> <img src={assets.logo} className='w-36' alt="" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/Collection' className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/About' className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/context' className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className="flex items-center gap-6">
                <img onClick={() => setshowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

                <div className="group relative">
                   
                    <img onClick={()=> token? null :navigate('/loging')}  className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                    {/** Dropdown menu */}

                    {
                        token && <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className="cursor-pointer hover:text-black"> My Profile</p>
                            <p onClick={()=>navigate('/order')} className="cursor-pointer hover:text-black"> Order</p>
                            <p onClick={Logout} className="cursor-pointer hover:text-black"> Logout</p>
                        </div>
                    </div>
                    }
                    
                    
                </div>

                <Link to='/Cart' className='relative'>
                    <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'> {getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${Visible ? 'w-full ' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600 ">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img className="bottom-1 h-4 rotate-180 " src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>

                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/'> Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/collection'> COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to='/contact'>CONTACT</NavLink>
                </div>
            </div>

        </div>
    );
}

export default Navbar;
