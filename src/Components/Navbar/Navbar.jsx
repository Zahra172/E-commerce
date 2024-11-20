import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/Context';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  const [darkToggle, setDarkToggle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkToggle) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkToggle]);

  const handleDarkmode = () => {
    setDarkToggle(!darkToggle);
  };

  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('apiToken');
    setUserLogin(null);
    navigate('/login');
  }

  let { cartCounter } = useContext(CartContext);
  let { counter, userName } = useContext(CounterContext);

  return (
    <>
      <nav className="bg-black static z-20 lg:fixed top-0 right-0 left-0 py-2">
        <div className="container mx-auto py-2 flex flex-col lg:flex-row justify-between items-center">
          <div className="flex justify-between items-center w-full lg:w-auto">
            <img src={logo} width={110} className="text-orange-400" alt="freshCart" />
            <button
              className="lg:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className={`lg:flex flex-col lg:flex-row items-center w-full lg:w-auto ${menuOpen ? '' : 'hidden'}`}>
            <ul className="flex flex-col lg:flex-row lg:items-center">
              {userLogin !== null && <>
                <li className="py-2"><NavLink className="mx-2 text-lg text-slate-200 font-light" to="/">Home</NavLink></li>
                <li className="py-2"><NavLink className="mx-2 text-lg text-slate-200 font-light" to="/products">Products</NavLink></li>
                <li className="py-2"><NavLink className="mx-2 text-lg text-slate-200 font-light" to="/brands">Brands</NavLink></li>
                <li className="py-2"><NavLink className="mx-2 text-lg text-slate-200 font-light" to="/categories">Categories</NavLink></li>
                <li className="py-2"><NavLink className="mx-2 text-lg text-slate-200 font-light" to="/wishlist">Wishlist</NavLink></li>
              </>}
            </ul>
            <ul className="flex flex-col lg:flex-row lg:items-center">
              {userLogin == null ? <>
                <li className="py-2"><NavLink className="mx-2 text-lg text-slate-200 font-light" to="/login">Login</NavLink></li>
                <li className="py-2"><NavLink className="mx-2 text-lg text-slate-200 font-light" to="/register">Register</NavLink></li>
              </> : <>
                <li className="py-2"><span className="mx-2 text-lg text-slate-200 font-light cursor-pointer" onClick={logOut}>Logout</span></li>
                <li className="py-2">
                  <NavLink to="/cart">
                    <button className="relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
                      <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="absolute inset-0 object-right-top -mr-6">
                        <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-white text-black">
                          {cartCounter?.numOfCartItems}
                        </div>
                      </span>
                    </button>
                  </NavLink>
                </li>
              </>}
              <li className="flex items-center text-white">
                <i className="fa-brands mx-2 fa-facebook"></i>
                <i className="fa-brands mx-2 fa-twitter"></i>
                <i className="fa-brands mx-2 fa-instagram"></i>
                <i className="fa-brands mx-2 fa-youtube"></i>
              </li>
              <li>
                <button onClick={handleDarkmode} id="theme-toggle" type="button" className="text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-black rounded-lg text-sm p-2.5">
                  <svg id="theme-toggle-dark-icon" className={`w-5 h-5 ${darkToggle ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  <svg id="theme-toggle-light-icon" className={`w-5 h-5 ${darkToggle ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
