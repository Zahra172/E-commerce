import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function GetRecentProducts() {
    let { addtoCart } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState("");

    async function addProduct(productId) {
        let response = await addtoCart(productId);
        if (response.status === "success") {
            toast.success('Product added successfully.', {
                duration: 1500,
                position: 'top-center'
            });
            console.log('Added');
        } else {
            toast.error('Product not added.', {
                duration: 1500,
                position: 'top-center'
            });
            console.log('Not added');
        }
    }

    function getProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    let { data, isError, error, isLoading } = useQuery({
        queryKey: ["recentProduct"],
        queryFn: getProducts,
    });

    if (isLoading) {
        return <div className="mx-auto w-full flex justify-center">
            <ClimbingBoxLoader color="pink" />
        </div>
    }
    if (isError) {
        return <div className="mx-auto w-full flex justify-center">
            <h3>{error.message}</h3>
        </div>
    }

    const filteredProducts = data?.data.data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-center my-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="border rounded px-4 py-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="row">
                {filteredProducts.map((element) => (
                    <div key={element.id} className="lg:w-1/6 md:w-3/6 w-full px-2 my-4">
                        <div className="product">
                            <Link to={`/productdetails/${element.id}/${element.category.name}`}>
                                <img src={element?.imageCover} alt={element.title} />
                                <span className="my-2 font-light text-pink-600">
                                    {element.category.name}
                                </span>
                                <h3 className="my-1 font-normal">
                                    {element.title.split(" ").slice(0, 2).join(" ")}
                                </h3>
                                <div className="flex justify-between">
                                    <span>{element.price} EGP</span>
                                    <span>
                                        {element.ratingsAverage}
                                        <i className="fa-solid fa-star text-yellow-500"></i>
                                    </span>
                                </div>
                            </Link>
                            <button onClick={() => addProduct(element.id)} className="btn">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
