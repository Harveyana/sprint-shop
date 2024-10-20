import React, { useState } from "react";

import { useProducts } from "../contexts/ProductsContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const SideBar = () => {
  const { category } = useParams();

  const {fetchCategories,categories,isLoading} = useProducts();

 
  const navigate = useNavigate();



  const handleGoToRoute = (route:string) => {
    handleToggleMenu();
    navigate(route);
  };

  return (
 
      <div className="w-full bg-white h-full z-20 left-0 overflow-y-auto border-r border-gray-300 ">
        <div className="w-full h-full relative">

          <div className="pt-10 px-6 space-y-4">

            {/* {productsStore.isInProductPage && ( */}
            <div className="flex flex-col gap-y-4">

              <NavLink to="/shop">
                <h1 className="text-4xl font-bold mb-4 text-[#27141A]">Sprint Shop</h1>
              </NavLink>

            </div>

            <div className="flex flex-col items-start gap-y-5 tracking-wider">
              <button className="py-4 text-left text-[#E6B41D] text-lg w-full">
                OUR CATEGORIES
              </button>
              {categories.length ? <div className="flex flex-col items-start gap-y-5 tracking-wider text-secondary text-[14px] mb-10">
                
                {categories.map((category:string)=>
                  <NavLink key={category} to={`/category/${category}`}>
                    <span className="capitalize">{category}</span>
                  </NavLink>)
                }
              </div>:<></>}
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default SideBar;
