import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import logo from "@/img/logo.png";
import searchIcon from "../assets/img/search.svg";
import cart from "../assets/img/cart.svg";

// import { useMenu } from "@/contexts/MenuContext";

const ShopHeader = () => {
  // const { handleToggleMenu, handleToggleSearch } = useMenu();
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   navigate(`/search-result/${searchQuery}`);
  //   // handleToggleSearch();
  //   // setSearchQuery("");
  // };

  return (
    <div className="w-full z-20 sticky top-0 left-0 mx-auto bg-white flex justify-between items-center lg:gap-x-5">
    
      <div className="flex justify-center gap-x-6 items-center w-full p-3 py-6 ">
        <form onSubmit={()=>{}} className="w-[30%] relative text-black">
          <input
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            className="pl-10 pr-4 py-3 bg-[#F8FAFC] rounded-xl outline-none w-full bg-transparent placeholder:text-white"
            placeholder="Search"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7"/></svg>
         
        </form>
        <nav className="flex justify-center items-center gap-x-4 tracking-wider text-[#27141A] text-[20px]">
          {/* <NavLink to="/track-order">Track Order</NavLink> */}
          {/* <NavLink to="/faq">FAQs</NavLink> */}
          {/* <NavLink to="/login">Login</NavLink> */}
          <NavLink
            to="/cart"
            className="flex gap-x-1 items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M9 20a1 1 0 1 1 0 2a1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2M3.495 2.631l.105.07l1.708 1.28a2 2 0 0 1 .653.848l.06.171h12.846a2 2 0 0 1 1.998 2.1l-.013.148l-.457 3.655a5 5 0 0 1-4.32 4.34l-.226.023l-7.313.61l.26 1.124H17.5a1 1 0 0 1 .117 1.993L17.5 19H8.796a2 2 0 0 1-1.906-1.393l-.043-.157l-2.74-11.87L2.4 4.3a1 1 0 0 1 .985-1.723zM18.867 7H6.487l1.595 6.906l7.6-.633a3 3 0 0 0 2.728-2.617z"/></g></svg>
            <p>Cart</p>
          </NavLink>
        </nav>

      </div>
      
    </div>
  );
};

export default ShopHeader;
