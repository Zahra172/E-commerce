import React, { useContext, useState } from 'react'
import { Formik, useFormik } from 'formik'
import { Link, useParams} from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'



export default function Ckeckout() {
let {cartId} = useParams();
console.log(cartId)
const [apiError , setapiError] = useState('');
const [isLoading , setisLoading] = useState(false);

let {checkOut} =useContext(CartContext)

let formik = useFormik({
    initialValues: {
          details: "",
          phone: "",
          city: ""
    },
    
    onSubmit :()=> handleCheckout(cartId,'http://localhost:5173'),
  })

async function handleCheckout(cartId , url) {
let {data}=   await checkOut(cartId , url, formik.values);
if(data.status == 'success'){
    window.location.href = data.session.url
}
console.log(data)

}



  return (<>
   {apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {apiError}
</div> : null}
  <div className='py-8 max-w-xl mx-auto'>
    <h2 className='text-4xl mb-8 font-bold text-pink-700'>Chickout now</h2>
  <form className=" mx-auto" onSubmit={formik.handleSubmit}>
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "  />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your details address</label>
  </div>

 
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input type="text" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "  />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your city</label>
  </div>



  <button type="submit" className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
  pay now
    </button>
   
  </form>
  </div>
  </>
    
  )
}
