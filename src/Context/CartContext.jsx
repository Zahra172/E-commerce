import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export let CartContext = createContext();
export default function CartContextProvider(props) {
  let [headers, setHeaders] = useState({
    token: localStorage.getItem("apiToken"),
  });

  let [cartCounter, setCartCounter] = useState(0);

  function getCartItems() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("apiToken") },
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async function addtoCart(productId) {
    try {
      let response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: { token: localStorage.getItem("apiToken") },
        }
      );
      await getCart();
      return response.data;
    } catch (error) {
      return error;
    }
  }
  function deleteCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function updateCart(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers: { token: localStorage.getItem("apiToken") },
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function checkOut(cartId, url, formValues) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress: formValues,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function getCart() {
    let response = await getCartItems();
    if (response?.data?.numOfCartItems !== undefined) {
      setCartCounter(response.data.numOfCartItems); // ✅ العدد بس
    } else {
      setCartCounter(0); // ✅ لو الكارت فاضي
    }

    console.log(response);
  }
  useEffect(() => {
    
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCounter,
        setCartCounter,
        checkOut,
        addtoCart,
        getCartItems,
        deleteCart,
        updateCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
