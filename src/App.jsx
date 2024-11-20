// import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import Categories from "./Components/Ctegories/Ctegories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Notfound from "./Components/Notfound/Notfound";
import CounterContextProvider from "./Context/Context";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
// import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import Checkout from "./Components/Checkout/Checkout";
import AllOrders from "./Components/allorders/AllOrders";
import WishlistContextProvider from "./Context/WishlistContext";
import Wishlist from "./Components/Wishlist/Wishlist";







let query = new QueryClient();

let routing = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "wishlist",
      //   element: (
      //     <ProtectedRoute>
      //       <Wishlist/>
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },

      {
        path: "checkout/:cartId",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "categorydetails/:_id",
      //   element: (
      //     <ProtectedRoute>
      //       <CategoryDetails/>
      //     </ProtectedRoute>
      //   ),
      // },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
    <CartContextProvider>
      <WishlistContextProvider>
    <QueryClientProvider client={query}>
        <UserContextProvider>
          <CounterContextProvider>
          <ReactQueryDevtools/>
          <Toaster 
          containerStyle={{
            top: 100,
            left: 20,
            bottom: 20,
            right: 20,
          }}
          />
            <RouterProvider router={routing}>
            
            </RouterProvider>
          </CounterContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
      </WishlistContextProvider>
    </CartContextProvider>

    </>
  );
}

export default App;
