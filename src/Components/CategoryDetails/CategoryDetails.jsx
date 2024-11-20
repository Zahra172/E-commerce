import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function CategoryDetails() {
    let {_id} = useParams();
    let [category ,setCatecory] = useState(null)
    function getSpecificCategory(first_productid) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${_id}`)
        .then(({data})=> {
            setCatecory(data?._id)
        })
        .catch((error) => {
            
                console.error("Error fetching category:", error);
        })
    }
    useEffect(()=>{
        getSpecificCategory(_id);
       
    },[_id])

  return (
    <div>
      <h1>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>
    </div>
  )
}
