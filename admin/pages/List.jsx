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
        setListproduct(response.data.product || []);
      } else {
        toast.error(response.data.message || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'An error occurred while fetching the data');
      setListproduct([]);  
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`, 
        { id }, // Pass the `id` in the request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log(response.data);
      
      
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchlist();
      }else{
        toast.error(response.data.message || 'An error occurred');
      }

      
    } catch (error) {
      
    }
  }

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
    <div
      className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
      key={index}
    >
      <img className="w-12 h-12 object-cover rounded-md" src={_item.image[0]} alt={_item.name} />
      <p className="truncate" title={_item.name}>{_item.name}</p>
      <p className="truncate" title={_item.category}>{_item.category}</p>
      <p className="truncate">{currency}{_item.price}</p>
      <p
        className="text-right md:text-center cursor-pointer text-lg text-red-500 hover:underline"
        onClick={() => removeProduct(_item._id)} 
      >
        X
      </p>
    </div>
  ))
}

        
      </div>
    </>
  );
};

export default List;