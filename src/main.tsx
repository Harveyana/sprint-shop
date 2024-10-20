import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import {FilterProvider} from "./contexts/FilterContext.tsx"
import { ProductsProvider } from "./contexts/ProductsContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
   
    <React.StrictMode>
      <FilterProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
         </CartProvider>
        </ProductsProvider>
      </FilterProvider>
    </React.StrictMode>
  </BrowserRouter>
);
