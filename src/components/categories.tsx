
import { useProducts } from "../contexts/ProductsContext";
import { NavLink } from "react-router-dom";

const Categories = () => {

  const {categories} = useProducts();

  return (
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
  );
};

export default Categories;
