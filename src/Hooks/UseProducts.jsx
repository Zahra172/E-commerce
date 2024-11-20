import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProducts() {

    function getProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
      }
      let responseObject = useQuery({ 
      queryKey: ["recentProduct"], 
      queryFn: getProducts ,
    //   staleTime:5000,
      refetchInterval: 3000,
    
    });
      console.log(responseObject.data);


  return responseObject;
}
