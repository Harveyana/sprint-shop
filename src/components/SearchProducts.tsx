import React, { useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import SearchModal from "./SearchModal";


const SearchProducts = () => {

  const {products} = useProducts()

  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false)

  return (
    <div className="w-[60%] lg:w-[30%] relative ">
     
      <button onClick={()=>{setOpen(true)}} className="w-full bg-[#F8FAFC] rounded-xl relative text-black">
        <input
          required
          value={searchQuery}
          readOnly
          type="text"
          className="pl-10 pr-4 py-3 bg-[#F8FAFC] rounded-xl outline-none w-full bg-transparent placeholder:text-black"
          placeholder="Search"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7"/></svg>
         
      </button>

      <SearchModal open={open} setOpen={(value)=>setOpen(value)} />

    </div>
  );
};

export default SearchProducts;
