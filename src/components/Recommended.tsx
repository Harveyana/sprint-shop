import {useEffect,useState} from "react";

import Product from "./Product";

import { useProducts } from "../contexts/ProductsContext";

interface product  {
  id: number;
  title:string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating:{rate: number, count: number}

}

const Recommended = () => {

  const {getRecommendations,query} = useProducts()

  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    const getProducts = async()=>{
      const data = await getRecommendations()
      setProducts(data)
    }
    getProducts()
  }, [query]);


  return (
    <div className="w-full flex flex-col items-start">
      {products.length ? <h1 className="text-2xl text-left font-bold mb-4">Recommended</h1>:<></>}
      
      <div className=" w-full h-fit overflow-x-auto overflow-y-hidden">

        <div className="w-fit h-fit flex justify-center gap-4 lg:gap-8">
          {products.map((product:Product) => (
            <Product 
              key={product.id + product.title}
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              description={product.description}
              rating={product.rating}
              image={product.image}
            />
          ))}
        </div>

      </div>
    </div>
    
  ); 
};

export default Recommended;
