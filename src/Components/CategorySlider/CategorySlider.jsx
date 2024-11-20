import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000
      };

      const [category,setCategory] = useState([]);

      function getCategories() {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        .then((response)=>{
            setCategory(response.data.data)
            console.log(response.data.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
    getCategories();

    },[])

  return (<>
      <div>
      <h2 className='mt-8 mb-4 font-bold text-pink-600 text-lg'>Shop popular categories</h2>
    <Slider {...settings}>
        
            {category.map((cat)=><div key={cat._id}><img className='w-full cat-image'  src={cat.image}   />
            <h3 className='my-2'>{cat.name}</h3>
            </div> )}
    </Slider>
    </div>
  
  </>

  )
}
