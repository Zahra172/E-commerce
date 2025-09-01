import React from "react";

export default function Footer() {
  return (
    <div className=" bg-gray-50  text-black dark:text-white dark:bg-gray-700">
      <div className="pt-11 w-[85%]  pb-11  px-6">
        <div className="my-3 ">
          <h2 className="text-2xl my-1 font-semibold">Get the FreshCart app</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We will send you a link, open it in your phone to download the app.
          </p>
        </div>
        <form className="pb-10 w-full flex flex-col sm:flex-row gap-4 mx-4">
          <div className="relative w-full sm:w-3/4 mx-auto">
            <div className="absolute inset-y-0 start-0 flex items-center pl-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M10.036 8.278L19.294.488A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="text"
              id="email-address-icon"
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
            />
          </div>
          <button className="bg-[#00c950] w-full sm:w-1/4 hover:bg-pink-600 p-2 rounded-lg text-white mt-4 sm:mt-0">
            Share app link
          </button>
        </form>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <div className="mb-4 sm:mb-0">
            <ul className="flex flex-wrap space-x-4 items-center justify-center">
              <li className="text-lg font-medium">Payment partners:</li>

              <li>
                <i className="fab fa-amazon-pay text-2xl"></i>
              </li>
              <li>
                <i className="fab fa-cc-mastercard text-2xl"></i>
              </li>
              <li>
                <i className="fab fa-cc-paypal text-2xl"></i>
              </li>
              <li>
                <i className="fab fa-cc-amex text-2xl"></i>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-wrap space-x-4 items-center justify-center">
              <li className="text-lg font-medium">
                Get deliveries with FreshCart:
              </li>

              <li>
                <i className="fab fa-apple text-2xl"></i>
              </li>
              <li>
                <i className="fab fa-google-play text-2xl"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
