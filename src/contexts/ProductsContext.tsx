import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import usePersistState from "../hooks/usePersistState";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductsContextData {
  products: Product[];
  query: string;
  categories: string[];
  isLoading: boolean;
  error: string | null;
  getRecommendations:()=> Promise<Product[]>;
  saveQuery:(category: string) => void;
  filterByCategory: (category: string) => void;
  fetchProducts: () => Promise<Product[]>;
  fetchCategories: () => Promise<string[]>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  fetchProductById: (id: number) => Promise<Product | null>;
 
}

const ProductsContext = createContext<ProductsContextData | null>(null);

function ProductsProvider({ children }:{ children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = usePersistState('query','');
 

  const fetchCategories = async()=> {
    setIsLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();

      setCategories(data)

      console.log(data);
      return data;

    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Products could not be loaded");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  function filterByCategory(category: string) {
    console.log(category)
    if (category === 'all') {
        return products;
    } else {
      const data = products.filter((product) => product.category === category)
      console.log(data)
      setProducts(data);
      return data
    }

  }

  const getRecommendations = () => {
    const filtered = products.filter((product:Product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    return filtered
  };

  const saveQuery = (keyword:string)=>{
    setQuery(keyword)
  }

  const fetchProducts = async()=> {
    setIsLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      setProducts(data)
      console.log(data);
      return data;

    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Products could not be loaded");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchProductsByCategory(category: string) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const data = await response.json();
      console.log(data)

      setProducts(data)

      return data;

    } catch (error) {
      console.error("Error fetching products by category:", error);
      setError("Could not load products for the selected category");
    } finally {
      setIsLoading(false);
    }
  }

  const fetchProductById = async (id: number) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch product:", error);
      return null;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        saveQuery,
        getRecommendations,
        categories,
        isLoading,
        error,
        filterByCategory,
        fetchProducts,
        fetchProductsByCategory,
        fetchProductById,
        fetchCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) throw new Error("useProducts must be used within a ProductsProvider");
  return context
}

export { ProductsProvider, useProducts };