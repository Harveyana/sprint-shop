import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Post from "./pages/post";
// import About from "./pages/about";
import NotFound from "./pages/notFound";
import Shop from "./pages/shop";
import DefaultLayout from "./layouts/default";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<NotFound />} />
        </Route> 
        
      </Routes>
    </>
  );
}

export default App;
