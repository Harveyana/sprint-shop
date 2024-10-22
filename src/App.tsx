import { Routes, Route } from "react-router-dom";
// import Home from "./pages/home";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Category from "./pages/category";

import NotFound from "./pages/notFound";
import Shop from "./pages/shop";
import DefaultLayout from "./layouts/default";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="/product/:id" element={<Product />} />
          <Route path="/category/:category" element={<Category />} />
          <Route index element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route> 
        
      </Routes>
      <ToastContainer />
      
    </>
  );
}

export default App;

