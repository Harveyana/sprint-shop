import Products from "../components/Products";
import { useEffect} from "react";
import Recommended from "../components/Recommended";
import { useProducts } from "../contexts/ProductsContext";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const Category = () => {


  
  const { category } = useParams();

  const {fetchProductsByCategory,isLoading} = useProducts()

  useEffect(() => {
    const getProducts = async()=>{
      console.log(category)
      const data = await fetchProductsByCategory(category)
      console.log(data)
    }

    getProducts()
  }, [category]);

  if(isLoading){
    return(
      <div>
        <Spinner/>
      </div>
    )
  }

  return (
    <div className="h-fit overflow-auto px-2 lg:px-8 flex flex-col items-start gap-y-8">
      <h1 className="text-2xl text-left font-bold mb-4 capitalize">{category}</h1>
      <Products/>
      <Recommended/>
    </div>
  );
};

export default Category;
