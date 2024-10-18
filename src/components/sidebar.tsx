import React, { useState } from "react";
import { useFilter } from "../contexts/FilterContext";

import { useProducts } from "../contexts/ProductsContext";
import cancel from "@/img/cancel.png";
import unknownUser from "@/img/unknownUser.png";
import AddUser from "@/img/AddUser.png";
import Bag from "@/img/icons/Bag.svg";
import Heart from "@/img/icons/Heart.svg";
import Setting from "@/img/icons/Setting.svg";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const SideBar = () => {
  const { handleToggleMenu } = useFilter();
  const { category } = useParams();

  const {
    selectPriceRange,
    applyPriceFilter,
    setPriceRange,
    clearProductFilter,
  } = useProducts();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  const onSetPriceRange = () => {
    clearProductFilter(category);
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    setPriceRange({ min, max });
    applyPriceFilter(min, max);
    handleToggleMenu();
  };

  const onSelectPriceRange = (range:any) => {
    clearProductFilter(category);
    selectPriceRange(range);
    handleToggleMenu();
  };

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

              <h1 className="text-4xl font-bold mb-4 text-[#27141A]">Sprint Shop</h1>

              {/* <div className="mx-auto space-y-1 tracking-wider">
                <h1 className="text-lg text-[#27141A]">Custom Price range</h1>
                <form
                  className="flex gap-x-1 w-full"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSetPriceRange();
                  }}
                >
                  <input
                    type="text"
                    className="bg-gray-200 py-2 outline-none rounded-lg border-[#b1a7a7] w-1/3 text-center border-2"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    type="text"
                    className="bg-gray-200 py-2 outline-none rounded-lg border-[#b1a7a7] w-1/3 text-center border-2"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="text-white rounded-lg py-1 px-4 bg-secondary"
                  >
                    GO
                  </button>
                </form>
              </div> */}

              <div className="me-auto space-y-1 tracking-wider">
                <h1 className="text-lg">Prices</h1>
                {/* <div className="flex gap-y-4 flex-col w-full justify-end items-start font-semibold text-md">
                  <div className="flex justify-center items-center gap-x-3">
                    <input
                      type="radio"
                      name="priceRange"
                      onClick={() => onSelectPriceRange("under100")}
                    />
                    <p>Under #100.00</p>
                  </div>
                  <div className="flex justify-center items-center gap-x-3">
                    <input
                      type="radio"
                      name="priceRange"
                      onClick={() => onSelectPriceRange("100to200")}
                    />
                    <p>#100.00-#200.00</p>
                  </div>
                  <div className="flex justify-center items-center gap-x-3">
                    <input
                      type="radio"
                      name="priceRange"
                      onClick={() => onSelectPriceRange("201to1000")}
                    />
                    <p>#201.00-#1,000.00</p>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="flex flex-col items-start gap-y-5 tracking-wider">
              <button className="py-4 text-left border-[#999999] border-b-[1px] text-[#E6B41D] text-lg w-full">
                OUR CATEGORIES
              </button>
              <div className="flex flex-col items-start gap-y-5 tracking-wider text-secondary text-lg mb-10">
                <NavLink to="/categories/all">
                  <span onClick={handleToggleMenu}>All</span>
                </NavLink>
                <NavLink to="/categories/jewelery">
                  <span onClick={handleToggleMenu}>Jewelery</span>
                </NavLink>
                <NavLink to="/categories/electronics">
                  <span onClick={handleToggleMenu}>Electronics</span>
                </NavLink>
                <NavLink to="/categories/men%27s%20clothing">
                  <span onClick={handleToggleMenu}>mens clothing</span>
                </NavLink>
                <NavLink to="/categories/women%27s%20clothing">
                  <span onClick={handleToggleMenu}>womens clothing</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default SideBar;
