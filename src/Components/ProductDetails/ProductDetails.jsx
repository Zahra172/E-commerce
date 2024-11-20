import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function ProductDetails() {
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  let {addToWishlist, removeItems} = useContext(WishlistContext);

  async function toggleWishlist(productId) {
    if (isLiked) {
      // إذا كان العنصر في الـ wishlist، قم بإزالته
      let response = await removeItems(productId);
      if (response.data.status === 'success') {
        toast.success("Product removed from wishlist");
        setIsLiked(false);
      } else {
        toast.error("Failed to remove product from wishlist");
      }
    } else {
      // إذا لم يكن العنصر في الـ wishlist، أضفه
      let response = await addToWishlist(productId);
      if (response.data.status === 'success') {
        toast.success("Product added to wishlist");
        setIsLiked(true);
      } else {
        toast.error("Failed to add product to wishlist");
      }
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  var set = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };
  let { id, category } = useParams();
  console.log(id);
  const [productDetails, setProductDetails] = useState(null); //دا هيبقي object ومش هعمل ماب عشان هوا عنصر واحد بس اللي راجع
  const [relatedProduct, setrelatedProduct] = useState([]);

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProductDetails(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  let { addtoCart, setCartCounter } = useContext(CartContext);

  async function addProduct(productId) {
    const response = await addtoCart(productId);
    console.log("Add product response:", response);
   

    if (response.status === "success") {
      toast.success("Product added successfully.", {
        duration: 1500,
        position: "top-center",
      });
      console.log("Added");
    } else {
      toast.error("Product not added.", {
        duration: 1500,
        position: "top-center",
      });
      console.log("Not added");
    }
  }

  function RelatedProduct(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((response) => {
        // setProductDetails(response.data.data)
        let allProduct = response.data.data;
        let related = allProduct.filter(
          (product) => product.category.name == category
        );
        setrelatedProduct(related);
        console.log(allProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getProductDetails(id);
    RelatedProduct(category);
  }, [id, category]);
  return (
    <>
      {loading ? (
        <div className="lds-spinner  text-pink-700">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <div className="row ">
            <div className="w-1/4">
              <Slider {...settings}>
                {productDetails?.images.map((src) => (
                  <img
                    className="w-full rounded-lg"
                    key={productDetails.id}
                    src={src}
                    alt={productDetails?.title}
                  />
                ))}
              </Slider>
              {/* <img className='w-full rounded-lg' src={productDetails?.imageCover} alt={productDetails?.title}/> */}
            </div>
            <div className="w-3/4 px-10 py-6">
              <h1 className=" text-pink-600 font-bold ">
                {productDetails?.title}
              </h1>
              <p className="my-6">{productDetails?.description}</p>
              <div className="">
                <span className="font-semibold block my-4">
                  Price : <span>{productDetails?.price} EGP</span>
                </span>
                <span className="font-semibold">Rating : </span>{" "}
                <span>
                  {productDetails?.ratingsAverage}{" "}
                  <i className="fa-solid fa-star text-yellow-500"></i>
                </span>
              </div>
              <div className="flex items-center gap-4">
  <button
    onClick={() => addProduct(productDetails.id)}
    className="px-4 py-2 w-1/3 bg-pink-700 my-5 rounded-md"
  >
    add to cart
  </button>
  
  <svg
  onClick={() => {
    toggleWishlist(productDetails.id);
  }}
  xmlns="http://www.w3.org/2000/svg"
  fill={isLiked ? "red" : "none"}
  viewBox="0 0 24 24"
  stroke="currentColor"
  className={`w-12 h-12 cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-500'} transform rotate-180 overflow-visible`}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M11.049 2.927C10.259 1.765 8.9 1.765 8.11 2.927 6.759 4.472 3 8.29 3 11.7c0 3.412 2.588 5.79 5.539 5.79 1.65 0 3.083-.852 4.461-2.317 1.378 1.465 2.811 2.317 4.461 2.317 2.951 0 5.539-2.378 5.539-5.79 0-3.41-3.759-7.228-5.11-8.773z"
  />
</svg>

</div>

    
            </div>
          </div>
          <h3 className=" font-semibold text-pink-700 text-lg mt-7 mb-4">
            Related products
          </h3>

          <div className="">
            <Slider {...set}>
              {relatedProduct.map((product) => (
                <div className="related-product-item px-3 border " key={product.id}>
                  <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                    <img className="w-full rounded-lg " src={product?.imageCover} alt={product.title} />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </>
  );
}
