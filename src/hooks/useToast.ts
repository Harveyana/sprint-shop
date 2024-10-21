
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TypeOptions } from 'react-toastify';


export default function useToast() {

  const notify = (message:string,type?:(TypeOptions|undefined)) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      type:type || 'default'
      // transition: 'Bounce',
      });
  };

  return {
    notify,
  };
}