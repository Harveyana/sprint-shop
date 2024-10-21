import { createContext, useContext} from "react";
// import useLocalStorage from "../hooks/useLocalstorage"
import usePersistState from "../hooks/usePersistState";

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

const CartContext = createContext<CartContextData | any>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = usePersistState('cart',[]);


  const handleAddToCart = (product: CartItem) => {
    const productIndex = cart.findIndex((item:CartItem) => item.id === product.id);
  
    if (productIndex === -1) {
      // If product does not exist in the cart, add it with initial quantity
      setCart([...cart, product]);
    } else {
      // If product exists in the cart, increase its quantity
       cart[productIndex].quantity += 1;
      setCart(cart);
    }
  };


  const handleDeleteFromCart = (productId: number) => {
    setCart(cart.filter((item:CartItem) => item.id !== productId));
  };

  const isInCart = (productId: number) => {
    return cart?.some((item:any) => String(item.id) === String(productId));
  };

  const increaseQuantity = (productId: number) => {

    const updated = cart.map((item:CartItem) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item
    })
    setCart(updated)
  };

  const decreaseQuantity = (productId: number) => {
    const updated = cart.map((item:CartItem) => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
    })
    setCart(updated)
  };


  const handleClearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.length;

  const totalPriceCost = cart.reduce((acc:number, item:CartItem) => {
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