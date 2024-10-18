import { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalstorage"

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  category: string;
}

interface CartContextData {
  cart: CartItem[];
  handleAddToCart: (currentProduct: CartItem) => void;
  handleDeleteFromCart: (productId: number) => void;
  isInCart: (productId: number) => boolean;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  handleClearCart: () => void;
  cartItemCount: number;
  totalPriceCost: number;
}

const CartContext = createContext<CartContextData | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && JSON.stringify(savedCart) !== JSON.stringify(cart)) {
      setCart(savedCart);
    }
  }, [cart, setCart]);

  const handleAddToCart = (currentProduct: CartItem) => {
    setCart((prevCart:any[]) => [...prevCart, currentProduct]);
    console.log("cart");
  };

  const handleDeleteFromCart = (productId: number) => {
    setCart((prevCart:any[]) => prevCart.filter((item) => item.id !== productId));
  };

  const isInCart = (productId: number) => {
    return cart?.some((item:any) => String(item.id) === String(productId));
  };

  const increaseQuantity = (productId: number) => {
    setCart((prevCart:any[]) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decreaseQuantity   
 = (productId: number) => {
    setCart((prevCart:any[]) =>
      prevCart.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.length;

  const totalPriceCost = cart.reduce((acc:number, item:any) => {
    return acc + item.quantity * item.price;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleDeleteFromCart,
        isInCart,
        increaseQuantity,
        decreaseQuantity,
        handleClearCart,
        cartItemCount,
        totalPriceCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context
}

export { CartProvider, useCart };