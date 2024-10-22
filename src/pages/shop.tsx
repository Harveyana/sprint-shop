import Products from "../components/Products";
import Recommended from "../components/Recommended";
import { useProducts } from "../contexts/ProductsContext";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

const Shop = () => {
  const {fetchProducts,isLoading} = useProducts()

  useEffect(() => {
    const getProducts = async()=>{
      const data = await fetchProducts()
      console.log(data)
    }

    getProducts()
  }, []);

  if(isLoading){
    return(
      <div>
        <Spinner/>
      </div>
    )
  }
  return (
    <div className="h-fit overflow-auto px-2 lg:px-8 flex flex-col items-start gap-y-8">
      <h1 className="text-2xl text-left font-bold mb-4">Shop Now</h1>
      <Products/>
      <Recommended/>
    </div>
  );
};

export default Shop;
