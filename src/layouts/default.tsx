import { Outlet } from 'react-router-dom';
import SideBar from '../components/sidebar';
import ShopHeader from '../components/shopHeader';

function DefaultLayout() {
  return (
    <div className="layout bg-white h-screen">
      {/* <header className='text-blue-500'>Header</header> */}
      
      <div className='w-full h-full items-center justify-center gap-x-4 '>

        <section className='w-full h-full flex justify-between overflow-hidden'>
          <aside className='w-[20%] h-full'>
            <SideBar />
          </aside>  
          <main className='w-[78%] h-full overflow-auto pb-4'>
           <ShopHeader/>
            <Outlet />
          </main>
        </section>

      </div>
      
      {/* <footer>Footer</footer> */}
    </div>
  );
}

export default DefaultLayout;