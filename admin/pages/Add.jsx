import React from 'react'
import { assets } from '../src/assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../src/App.jsx'
import { toast } from 'react-toastify'


const Add = ({ token }) => {
  const [image1, setimage1] = useState(false)
  const [image2, setimage2] = useState(false)
  const [image3, setimage3] = useState(false)
  const [image4, setimage4] = useState(false)


  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [category, setcategory] = useState('')
  const [subCategory, setsubCategory] = useState('')
  const [price, setprice] = useState('')
  const [sizes, setsizes] = useState([])
  const [bestseller, setbestseller] = useState(false)

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('price', price);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestseller', bestseller);

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      // Get the token from localStorage (or wherever it is stored)
      const token = localStorage.getItem('token'); // or another source
      if (!token) {
        console.error("Token is missing. Please log in again.");
        return;
      }

      // If the token exists, include it in the request headers
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          'Authorization': `Bearer ${token}` // Include token in Authorization header
        }
      });

      if(response.data.success){
        toast.success(response.data.message)
        setname('');
        setdescription('');
        setcategory('');
        setsubCategory('');
        setprice('');
        setsizes([]);
        setbestseller(false);
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error("Error submitting form:", error.response || error.message || error);
    }
  };





  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div className="">
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-3'>
          <label htmlFor="image1">
            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" style={{ width: '80px' }} />

            <input onChange={(e) => setimage1(e.target.files[0])} type="file" id='image1' hidden />

          </label>
          <label htmlFor="image2">
            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" style={{ width: '80px' }} />

            <input onChange={(e) => setimage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" style={{ width: '80px' }} />

            <input onChange={(e) => setimage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" style={{ width: '80px' }} />

            <input onChange={(e) => setimage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setname(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Typer here' required />
      </div>
      <div className="w-full">
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setdescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='write content here ' required />
      </div>
      <div className="flex flex-row sm:flex-col gap-3 w-full sm:gap-8">

        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setcategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kid">Kid </option>

          </select>
        </div>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setsubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="bottom">bottom</option>
            <option value="Winterwear">Winterwear </option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product price </p>
          <input onChange={(e) => setprice(e.target.value)} value={(price)} className='w-full px-3 py-2 sm:w-[120px] ' type="Number" placeholder='25' />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Size</p>
        <div className="flex gap-3">
          {/* S Size */}
          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`cursor-pointer text-white px-4 py-2 rounded ${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
                }`}
              style={{
                backgroundColor: sizes.includes("S") ? "#FBCFE8" : "#475569",
              }}
            >
              S
            </p>
          </div>

          {/* M Size */}
          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`cursor-pointer text-white px-4 py-2 rounded ${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
                }`}
              style={{
                backgroundColor: sizes.includes("M") ? "#FBCFE8" : "#475569",
              }}
            >
              M
            </p>
          </div>

          {/* L Size */}
          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`cursor-pointer text-white px-4 py-2 rounded ${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
                }`}
              style={{
                backgroundColor: sizes.includes("L") ? "#FBCFE8" : "#475569",
              }}
            >
              L
            </p>
          </div>

          {/* XL Size */}
          <div
            onClick={() =>
              setsizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`cursor-pointer text-white px-4 py-2 rounded ${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
                }`}
              style={{
                backgroundColor: sizes.includes("XL") ? "#FBCFE8" : "#475569",
              }}
            >
              XL
            </p>
          </div>

          {/* XXL Size */}
          <div
            onClick={() => {
              setsizes((prev) => {
                const newSizes = prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"];
                console.log(newSizes); // Check updated sizes
                return newSizes;
              });
            }}
          >
            <p
              className={`cursor-pointer text-white px-4 py-2 rounded ${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
                }`}
              style={{
                backgroundColor: sizes.includes("XXL") ? "#FBCFE8" : "#475569",
              }}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className=" gap-3 mt-2">
        <input onChange={() => setbestseller(prev => !prev)} checked={bestseller} type="checkbox" name="" id="bestseller" />
        <label className='cursor-pointer ' htmlFor="bestseller">Add to best seller</label>
      </div>

      <button
        type="submit"
        style={{
          width: "7rem",       // Equivalent to w-28 (28 x 0.25rem = 7rem)
          paddingTop: "0.5rem", // Equivalent to py-2 (2 x 0.25rem = 0.5rem)
          paddingBottom: "0.5rem",
          marginTop: "1rem",   // Equivalent to mt-4 (4 x 0.25rem = 1rem)
          backgroundColor: "black", // Equivalent to bg-black
          color: "white",      // Set text color explicitly for visibility
        }}
      >
        Submit
      </button>
    </form>
  )
}

export default Add
