import axios from "axios";
import { createContext} from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
    
    let headers ={
        token : localStorage.getItem('apiToken')
    }
    function getWishlistItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {headers: headers}
        ).then((response)=>response)
        .catch((error)=>error)
    }
    function addToWishlist(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId: productId,
        },
    {
        headers: headers
    }).then((response)=>response)
    .catch((error)=>error)
    }

    function removeItems(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {headers: headers}
        ).then((response)=>response)
        .catch((error)=>error)
    }

    return <WishlistContext.Provider value={{addToWishlist,getWishlistItems,removeItems}}>
        {props.children}
    </WishlistContext.Provider>
}