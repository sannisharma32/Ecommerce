import React, { useContext ,useState,useEffect } from 'react'
import { Shopcontext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({category,subcategory}) => {
    const {products}=useContext(Shopcontext);
    const [related, setrelated] = useState([])
    useEffect(() => {

        if(products.length>0){
            let productcopy=products.slice();
            productcopy=productcopy.filter((item)=>category ==item.category);
            productcopy=productcopy.filter((item)=>subcategory ==item.subcategory);

            setrelated(productcopy.slice(0,5));

            
        }
      
    }, [products])
    
  return (
    <div className='my-24 '> 
    <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"}  text2={'products'}/>

    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {
            related.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
        }
    </div>


      

    </div>
  )
}

export default RelatedProduct
