import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  categories: string[];
  isLoading: boolean;
  error: string | null;
  filterByCategory: (category: string) => void;
  clearProductFilter: (category: string) => void;
  // setPriceRange: (range: { min: number; max: number }) => void;
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
  // const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
  //   min: 0,
  //   max: Infinity,
  // });
 

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

  function clearProductFilter(category: string) {
    setPriceRange({ min: 0, max: Infinity });
    filterByCategory(category);
    console.log("cleared");
  }

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

  // function applyPriceFilter(min: number, max: number) {
  //   filterByCategory(category);

  //   const filteredProducts = currentCategory.filter(
  //     (product) => product.price >= min && product.price <= max
  //   );

  //   setCurrentCategory(filteredProducts);
  //   setPriceRange({ min, max });
  // }

  // function selectPriceRange(range: string) {
  //   setSelectedPriceRange(range);
  //   switch (range) {
  //     case "under100":
  //       applyPriceFilter(0, 100);
  //       break;
  //     case "100to200":
  //       applyPriceFilter(100, 200);
  //       break;
  //     case "201to1000":
  //       applyPriceFilter(201, 1000);
  //       break;
  //     default:
  //       applyPriceFilter(0, Infinity);
  //   }
  // }

  // async function searchProducts(query: string) {
  //   setIsLoading(true);
  //   try {
  //     const searched = products.filter(
  //       (product) =>
  //         product.title.toLowerCase().includes(query.toLowerCase()) ||
  //         product.category.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setSearchedProducts(searched);

  //     return searched;
  //   } catch (error) {
  //     console.error("Error searching products:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // function addProductToRecentlyViewed(productId: number) {
  //   let recentlyViewed =
  //     JSON.parse(localStorage.getItem("recentlyViewedProducts")) || [];

  //   const existingIndex = recentlyViewed.indexOf(productId);
  //   if (existingIndex !== -1) {
  //     recentlyViewed.splice(existingIndex, 1);
  //   }

  //   recentlyViewed.unshift(productId);

  //   if (recentlyViewed.length > 5) {
  //     recentlyViewed.pop();
  //   }

  //   localStorage.setItem(
  //     "recentlyViewedProducts",
  //     JSON.stringify(recentlyViewed)
  //   );
  //   setRecentlyViewedProducts(recentlyViewed);
  // }

  const fetchProducts = async()=> {
    setIsLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      
      // setProducts((prevProducts) => {
      //   prevProducts = [];
      //   prevProducts.push(data);
      //   return prevProducts;
      // });

      setProducts(data)

      // setCurrentCategory(data);
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

      // setProducts((prevProducts) => {
      //   prevProducts = [];
      //   prevProducts.push(data);
      //   return prevProducts;
      // });

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
        categories,
        isLoading,
        error,
        filterByCategory,
        clearProductFilter,
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