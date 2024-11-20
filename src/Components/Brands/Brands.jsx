import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [counter, setCounter] = useState();
  useEffect(() => {}, []);

  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategory
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClimbingBoxLoader color="pink" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const categories = data?.data?.data || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link to={`/categorydetails/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
