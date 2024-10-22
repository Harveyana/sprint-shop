
import { NavLink } from "react-router-dom";
import Categories from "./categories";

const SideBar = () => {

  return (
 
      <div className="w-full bg-white h-full z-20 left-0 overflow-y-auto border-r border-gray-300 ">
        <div className="w-full h-full relative">

          <div className="pt-10 px-6 space-y-4">

            <div className="flex flex-col gap-y-4">

              <NavLink to="/">
                <h1 className="text-4xl font-bold mb-4 text-[#27141A]">Sprint Sh<span className="text-[#E6B41D]">o</span>p</h1>
              </NavLink>

            </div>
            <Categories/>
          </div>
        </div>
      </div>
 
  );
};

export default SideBar;
