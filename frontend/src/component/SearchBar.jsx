import React, { useContext, useState, useEffect } from 'react';
import { Shopcontext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setsearch, setshowSearch, showSearch } = useContext(Shopcontext);

  const [Visible, setVisible] = useState(false);
  const location = useLocation();

  // useEffect(() => {
  //   // Check if the URL includes 'collection', if not, hide the search bar
  //   if (location.pathname.includes('Collection')) {
  //     setVisible(true);
  //   } else {
  //     setVisible(false);
  //   }
  // }, [location.pathname]); // Dependency on pathname to trigger effect on route change

   useEffect(() => {
          setshowSearch(false); // Hide search bar when navigating to any page
      }, [location, setshowSearch]); // Trigger when the location changes
  

  return showSearch  ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img className="w-4" src={assets.search_icon} alt="Search icon" />
      </div>
      <img
        onClick={() => setshowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt="Close icon"
      />
    </div>
  ) : null;
};

export default SearchBar;
