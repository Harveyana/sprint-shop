import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";
import Spinner from "../components/Spinner";
import Recommended from "../components/Recommended";
 import useToast from "../hooks/useToast"


interface Product  {
  id: number;
  title:string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating:{rate: number, count: number}

}

const Product = () => {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading ] = useState(false)
  const { fetchProductById} = useProducts()
  const {handleAddToCart} = useCart()
  const { id } = useParams();

  const {notify} = useToast()


  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev)=> prev - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };


  const onAddTocart=()=>{
    handleAddToCart({
      id:product?.id,
      name:product?.title,
      image: product?.image,
      quantity: quantity,
      price: product?.price,
      category: product?.category
    })
    notify('Added to cart successfully')
  }
 

  useEffect(() => {
    const getProduct = async()=>{
      setLoading(true)
      const data = await fetchProductById(id)
      console.log(data)
      setProduct(data)
      setLoading(false)
    }

    getProduct()
  }, []);

  if(loading){
    return(
      <div>
        <Spinner/>
      </div>
    )
  }

  if(!product){
    return(
      <div className="flex items-center justify-center">
        <h1 className="font-semibold text-[12px] whitespace-nowrap text-[20px]">Product Not Found</h1>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-start justify-center px-2">

      <div
     
          className={`flex flex-col lg:flex-row gap-3 text-secondary w-full relative cursor-pointer bg-white`}
        >
          <div className="w-full lg:w-[50%] py-5 rounded-2xl bg-[#F8FAFC] flex justify-center items-center">
            <img className="w-[40%] bg-[#F8FAFC]" src={product.image} />
          </div>
          
          <div  className="w-full lg:w-[40%] border border-gray-200 rounded-xl flex flex-col gap-4 p-4">
            <div className="w-full flex gap-x-2 my-2">
              <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99008 2.67502C9.36342 1.77752 10.6368 1.77752 11.0101 2.67502L12.7451 6.84752L17.2484 7.20835C18.2184 7.28585 18.6118 8.49585 17.8726 9.12918L14.4418 12.0683L15.4893 16.4625C15.7151 17.4092 14.6859 18.1567 13.8559 17.65L10.0001 15.295L6.14425 17.65C5.31425 18.1567 4.28508 17.4083 4.51092 16.4625L5.55842 12.0683L2.12758 9.12918C1.38842 8.49585 1.78175 7.28585 2.75175 7.20835L7.25508 6.84752L8.99008 2.67502Z" fill="#FBBF24"/>
              </svg>
              <p className="text-[#666666] text-[14px] lg:text-[20px]">{product.rating.rate}</p>
              <p className="text-[#666666] text-[14px] lg:text-[20px] underline">{product.rating.count} reviews</p>
     
            </div>

            <div className="w-full flex flex-col items-start gap-3 justify-center">
              <div className="w-fit px-4 py-2 bg-[#F8F8F8] rounded-full flex gap-x-3 items-center justify-center">
                {/* decrease quantity */}
                <button onClick={()=> handleDecrement()}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white"/>
                    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#E5E7EB"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 11.8674 7.04789 11.7402 7.13313 11.6464C7.21838 11.5527 7.33399 11.5 7.45455 11.5H16.5455C16.666 11.5 16.7816 11.5527 16.8669 11.6464C16.9521 11.7402 17 11.8674 17 12C17 12.1326 16.9521 12.2598 16.8669 12.3536C16.7816 12.4473 16.666 12.5 16.5455 12.5H7.45455C7.33399 12.5 7.21838 12.4473 7.13313 12.3536C7.04789 12.2598 7 12.1326 7 12Z" fill="#111827"/>
                    </g>
                  </svg>
                </button>

                <p className="text-[#666666] text-[14px] lg:text-[16px]">{quantity}</p>
                {/* increase quantity */}
                <button onClick={()=> handleIncrement()}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white"/>
                    <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#E5E7EB"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.1206 7 12.2362 7.04789 12.3214 7.13313C12.4067 7.21838 12.4545 7.33399 12.4545 7.45455V11.5455H16.5455C16.666 11.5455 16.7816 11.5933 16.8669 11.6786C16.9521 11.7638 17 11.8794 17 12C17 12.1206 16.9521 12.2362 16.8669 12.3214C16.7816 12.4067 16.666 12.4545 16.5455 12.4545H12.4545V16.5455C12.4545 16.666 12.4067 16.7816 12.3214 16.8669C12.2362 16.9521 12.1206 17 12 17C11.8794 17 11.7638 16.9521 11.6786 16.8669C11.5933 16.7816 11.5455 16.666 11.5455 16.5455V12.4545H7.45455C7.33399 12.4545 7.21838 12.4067 7.13313 12.3214C7.04789 12.2362 7 12.1206 7 12C7 11.8794 7.04789 11.7638 7.13313 11.6786C7.21838 11.5933 7.33399 11.5455 7.45455 11.5455H11.5455V7.45455C11.5455 7.33399 11.5933 7.21838 11.6786 7.13313C11.7638 7.04789 11.8794 7 12 7Z" fill="#111827"/>
                  </svg>
                </button>

              </div>
              {/* add to cart */}
              <button onClick={()=>{onAddTocart()}} className="flex items-center rounded-full justify-center bg-[#111827] gap-x-2 p-2 px-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3333 4.66666H12.7585C13.8078 4.66666 14.6787 5.47755 14.7534 6.52417L15.1276 11.7625C15.2654 13.6921 13.7372 15.3333 11.8027 15.3333H4.19728C2.26281 15.3333 0.734586 13.6921 0.872412 11.7625L1.24658 6.52417C1.32134 5.47755 2.19222 4.66666 3.2415 4.66666H4.66667V3.99999C4.66667 2.15905 6.15906 0.666656 8 0.666656C9.84094 0.666656 11.3333 2.15905 11.3333 3.99999V4.66666ZM6 4.66666H10V3.99999C10 2.89542 9.10457 1.99999 8 1.99999C6.89543 1.99999 6 2.89542 6 3.99999V4.66666ZM3.2415 5.99999C2.89174 5.99999 2.60144 6.27028 2.57652 6.61915L2.20237 11.8575C2.11966 13.0152 3.03659 14 4.19728 14H11.8027C12.9634 14 13.8803 13.0152 13.7977 11.8575L13.4235 6.61915C13.3986 6.27028 13.1083 5.99999 12.7585 5.99999H3.2415Z" fill="#F8FAFC"/>
                </svg>
                <p className="text-[#FFFFFF] text-[14px] lg:text-[16px] whitespace-nowrap">Add to cart</p>
              </button>



            </div>
          </div>
          
        </div>
        
        <div  className="w-full flex justify-between items-start  my-3 flex-col px-2">
            <span className="w-full flex justify-between  items-start">
              <h1 className="w-[70%] max-h-[20%] text-[16px] lg:text-[28px] font-semibold truncate text-ellipsis overflow-hidden">
                {product.title}
              </h1>
            </span>
            <p className="text-[#666666] text-[12px] lg:text-[16px]">{product.category}</p>
            <p className="lg:w-[50%] text-[#666666] text-[12px] lg:text-[16px]">{product.description}</p>
        </div>

        <Recommended />
        
        
      
    </div>
  );
};

export default Product;
