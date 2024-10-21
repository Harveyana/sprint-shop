import React, { useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import SearchProduct from "./SearchProduct";
import { debounce } from 'lodash';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

interface modalProps {
  open:boolean;
  setOpen:(value:boolean)=>void
}

const SearchModal = ({open,setOpen}:modalProps) => {
  interface Product  {
    id: number;
    title:string;
    price: number;
    image: string;
    category: string;
    description: string;
    rating:{rate: number, count: number}
  
  }

  const {products,saveQuery} = useProducts()
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const debouncedHandleSearch = debounce((query: string) => {
    const filtered = products.filter((product:Product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    saveQuery(query)
  }, 100);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    debouncedHandleSearch(query);
  };

  

  return (

    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden p-4 rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >

            <div className="flex flex-col w-full relative ">

              <button onClick={()=>{setOpen(false)}} className="self-end p-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M16.95 8.464a1 1 0 0 0-1.414-1.414L12 10.586L8.464 7.05A1 1 0 1 0 7.05 8.464L10.586 12L7.05 15.536a1 1 0 1 0 1.414 1.414L12 13.414l3.536 3.536a1 1 0 1 0 1.414-1.414L13.414 12z"/></svg>
              </button>
              
              <form onSubmit={()=>{}} className="w-full bg-[#F8FAFC] rounded-2xl relative text-black mb-6">
                <input
                  required
                  value={searchQuery}
                  onChange={handleSearch}
                  type="text"
                  className="pl-10 pr-4 py-4 bg-[#F8FAFC] rounded-xl outline-none w-full bg-transparent placeholder:text-gray-400"
                  placeholder="Search Products"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7"/></svg>
                  
              </form>

              {filteredProducts.length ? <div className="bg-[#F8FAFC] w-full h-[40vh] overflow-auto rounded-xl flex justify-center lg:items-start flex-wrap lg:justify-start my-3 gap-x-1 gap-y-2">
                {filteredProducts.map((product:Product) => (
                <SearchProduct 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  description={product.description}
                  rating={product.rating}
                  image={product.image}
                />
                ))}
              </div>: 
              
              <div className="flex items-center justify-center my-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="7em" height="7em" viewBox="0 0 16 16"><path fill="gray" fill-rule="evenodd" d="M1.75 1a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5zM1 4.75A.75.75 0 0 1 1.75 4H7a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 4.75m9 7.75a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m0 1.5c.834 0 1.607-.255 2.248-.691l1.472 1.471a.75.75 0 1 0 1.06-1.06l-1.471-1.472A4 4 0 1 0 10 14M1.75 7a.75.75 0 0 0 0 1.5H4A.75.75 0 0 0 4 7z" clip-rule="evenodd"/></svg>
              </div>
              
              }


            </div>
        
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SearchModal;
