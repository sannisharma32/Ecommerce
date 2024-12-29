import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { currency } from '../src/App.jsx';
import axios from 'axios';
import { backendUrl } from '../src/App.jsx';


const List = () => {
  const [listproduct, setListproduct] = useState([]); 


  const fetchlist = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log(response.data); 
  
      if (response.data.success) {
        setListproduct(response.data.products || []);
      } else {
        toast.error(response.data.message || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'An error occurred while fetching the data');
      setListproduct([]); // Fallback to empty array on error
    }
  };

  useEffect(() => {
    fetchlist();
  },[]);

  return (
    <>
      <p className="mb-2">All products</p>
      <div className="flex flex-col gap-2">
        {/* Table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* Product list */}
        {
          listproduct.map((_item, index) => (
            <div key={index}>
              <img src={_item.image[0]} alt="" />
              <p>{_item.name}</p>
              <p>{_item.category}</p>
              <p>{currency}{_item.price}</p>
              <p>X</p>

            </div>


            
          ))
        }
      </div>
    </>
  );
};

export default List;