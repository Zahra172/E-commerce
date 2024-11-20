import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import style from './Ctegories.module.css'
import { ClimbingBoxLoader } from 'react-spinners'
import { Link } from 'react-router-dom'


export default function Categories() {
    const [counter , setCounter]=useState()
    useEffect(()=>{},[])

    function getCategory() {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data, isLoading , isError , error} = useQuery({
      queryKey: ['getCategories'],
      queryFn: getCategory
  });
  console.log(data?.data?.data);
  if (isLoading) {
    return <div className="mx-auto w-full flex justify-center ">
<ClimbingBoxLoader color="pink"/>

    </div>
}
if (isError) {
  return <div>Error: {error.message}</div>;
}
const categories = data?.data?.data || [];
  return (<>
  
  <div className='flex flex-wrap justify-around w-full '>
    {categories.map((product)=> (
      
      <div key={product._id} className="w-1/4 px-4 py-8 " >
        <Link to={`/categorydetails/${product.id}`}>
        <div className='rounded-md'>
        <img src={product.image} className='w-full h-[350px]'/>
        <div className='px-3 py-2  text-center'>
        <h3>{product.name}</h3>
        </div>
        </div>
        </Link>
      </div>
      
))}



  </div>
  </>
    
  )
}
