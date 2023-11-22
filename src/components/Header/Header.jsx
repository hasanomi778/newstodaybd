import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState('Home');

  useEffect(() => {
    const currentPath = location.pathname;
    const menuItemMapping = {
      '/': 'Home',
      '/news': 'News',
      '/about': 'About',
      '/contact': 'Contact',
    };
    setActiveMenuItem(menuItemMapping[currentPath] || 'Home');
  }, [location]);

  return (
    <div className="container">
      <header className='flex justify-between items-center py-4'>
        <div className='flex items-center w-[20%]'>
          <Link to="/" className='w-[40%]'>
            <img src={require('../../assets/images/android-chrome-512x512.png')} alt="" />
          </Link>
          <span className='text-base text-[#696969] italic pl-2 py-3 ml-2 border-l border-[#ddd] leading-4'>Take a look what's going on</span>
        </div>
        <div className='w-[70%] flex justify-end items-center'>
          <ul className='flex mx-[-16px]'>
            <li className={`text-lg font-medium text-slate-900 hover:text-[#EE4736] p-2 mx-2 duration-300 ${activeMenuItem === 'Home' ? 'text-[rgb(238,71,54)]' : ''}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`text-lg font-medium text-slate-900 hover:text-[#EE4736] p-2 mx-2 duration-300 ${activeMenuItem === 'News' ? 'text-[rgb(238,71,54)]' : ''}`}>
              <Link to="/news">News</Link>
            </li>
            <li className={`text-lg font-medium text-slate-900 hover:text-[#EE4736] p-2 mx-2 duration-300 ${activeMenuItem === 'About' ? 'text-[rgb(238,71,54)]' : ''}`}>
              <Link to="/about">About</Link>
            </li>
            <li className={`text-lg font-medium text-slate-900 hover:text-[#EE4736] p-2 mx-2 duration-300 ${activeMenuItem === 'Contact' ? 'text-[rgb(238,71,54)]' : ''}`}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <form action="">
            <div className='relative w-[350px] ml-8'>
              <input type="text" className='h-[48px] w-full border border-[#ddd] rounded focus:outline-[#EE4736] pl-[10px] pr-20'/>
              <button className='absolute top-[50%] translate-y-[-50%] h-[80%] right-[5px] bg-[#EE4736] hover:bg-[#CB3C2E] text-white font-medium text-base px-3 rounded duration-300'>Search</button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Header;