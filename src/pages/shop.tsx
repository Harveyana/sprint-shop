import Products from "../components/Products";
import Recommended from "../components/Recommended";
const Shop = () => {
  return (
    <div className="h-fit overflow-auto px-2 lg:px-8 flex flex-col items-start gap-y-8">
      <h1 className="text-2xl text-left font-bold mb-4">Shop Now</h1>
      <Products/>
      <h1 className="text-2xl text-left font-bold mb-4">Recommended</h1>
      <Recommended/>
    </div>
  );
};

export default Shop;
