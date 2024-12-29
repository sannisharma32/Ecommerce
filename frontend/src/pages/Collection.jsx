import React, { useContext, useState, useEffect } from 'react'
import { Shopcontext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../component/Title';
import ProductItem from '../component/ProductItem';

const Collection = () => {
  const{search,showSearch}=useContext(Shopcontext)
  const { products } = useContext(Shopcontext)
  const [showFilter, setshowFilter] = useState(false);
  const [category, setcategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [sortType, setsortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setcategory(prev => [...prev, e.target.value])
    }
  }


  const toggleSubCategory = (e) => {
    if (SubCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))

    } else {
      setSubCategory(prev => [...prev, e.target.value])

    }
  }

  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    setFilterProducts(products)



  }, []);


  const applyFilter = () => {
    let productsCopy = products.slice()
    if(showSearch && search){
       productsCopy=productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    if(category.length>0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))

    }
    if(SubCategory.length>0){
      productsCopy = productsCopy.filter(item => SubCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const shortProduct = () => {
    let fpCopy = [...filterProducts]; // Ensure immutability
    switch (sortType) {
      case 'low-high':
        setFilterProducts(
          fpCopy.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0))
        );
        break;
  
      case 'high-low':
        setFilterProducts(
          fpCopy.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0))
        );
        break;
  
      default:
        applyFilter(); // Ensure this is intentional
        break;
    }
  };
  


  useEffect(() => {
    applyFilter()

  }, [category, SubCategory ,search,showSearch]);

 useEffect(() => {
  shortProduct()
  
 
 }, [sortType]);
  return (


    <div className=" flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* FILTER OPETION */}
      <div className="min-w-60">
        <p onClick={() => setshowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2' > FILTER
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? ' ' : 'hidden'} sm:block`}>

          <p className=' mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light  text-gray-700">

            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>

            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} /> WoMen
            </p>

            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>
        {/* subgtegry  */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? ' ' : 'hidden'} sm:block`}>

          <p className=' mb-3 text-sm font-medium'>TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light  text-gray-700">

            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topware
            </p>

            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottom ware
            </p>

            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> winterware
            </p>
          </div>
        </div>
      </div>
      {/*wright side */}

      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTION'} />
          {/* PRODUCTS] SHORT */}
          <select onChange={(e)=>setsortType(e.target.value) } className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent"> Sort by: Relavent</option>
            <option value="low-high"> Sort by: Low to High </option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* map product */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>

    </div>


  )
}

export default Collection

