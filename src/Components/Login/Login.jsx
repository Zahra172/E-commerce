import React, { useContext, useState } from 'react';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { UserContext } from '../../Context/UserContext';

export default function Register() {

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase and be 6-10 characters long").required('Password is required'),
  });

  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let { setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  function handleLogin(formValues) {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues)
      .then((ApiResponse) => {
        if (ApiResponse?.data.message === "success") {
          localStorage.setItem('apiToken', ApiResponse.data.token);
          setUserLogin(ApiResponse.data.token);
          navigate('/');
          setIsLoading(false);
        }
      })
      .catch((ApiResponse) => {
        setApiError(ApiResponse?.response?.data?.message);
        setIsLoading(false);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{apiError}</div>}
      <div className="py-8 max-w-xl mx-auto">
        <h2 className="text-4xl mb-8 font-bold text-pink-700">Login now</h2>
        <form className="mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              placeholder=" "
            />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
          </div>
          {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.email}</div>}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              placeholder=" "
            />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
          </div>
          {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.password}</div>}
          <button type="submit" className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
          </button>
          <p className="my-3">Don't have an account? <span className="underline font-semibold text-pink-700"><Link to={'/register'}>Register now</Link></span></p>
        </form>
      </div>
    </>
  );
}
