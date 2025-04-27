import React, { useContext, useEffect, useState } from 'react';
// import InvoiceForm from './InvoiceFrom';
// import SearchReceipt from './SearchReceipt';
// import heroBanner from '../assets/heroBanner.jpg';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { TypeContext } from '../context/TypeProvider';



const Home = () => {
  const { user, loading } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const { types, setTypes } = useContext(TypeContext);

  const handleLink = (val)=>{
      val && setTypes(val);
      setIsOpen(!isOpen);
  }

  console.log('user : ', user);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>; // Show loading state
  }

  return (
    <>
    <div className="heroBanner">
        {/* <img src={'./saiMill_hero.jpg'} alt="hero banner" className='h-[90vh] w-full' /> */}

        <div className="relative isolate overflow-hidden bg-gray-900">
          {/* Background Gradient Graphic */}
          <div
            className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
              style={{
                clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)'
              }}
            />
          </div>
          {/* Main Content */}
          <div className="mt-[-50px] flex h-screen items-center justify-center">
            <div className="max-w-full flex-shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl lg:pt-8">
              <h1 className="mt-10 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                revolutionize{' '}
                <span className="text-sky-500">your workflow with sai-mill</span></h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Elevate Your Productivity With Sai Mill, Your Records Solution Is On Fingertip
              </p>
              
              {
                !user && (
                  <div className="mt-5 flex items-center justify-center gap-x-6">
                    <Link
                      to="/login"
                      className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                      rel="noreferrer"
                    >
                      Login →
                    </Link>
                  </div>
                )
              }
              {
                user && (
                  <div className="mt-5 flex items-center justify-center gap-x-6">
                        <Link to={ user? "/deliver" : '/login' }  className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                      rel="noreferrer" onClick={()=>''} >
                            {/* <SettingsIcon className="h-6 w-6 mr-3" /> */}
                            Deliver Dal
                        </Link>
                        <div className="relative inline-block text-left">
                        <Link className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                      rel="noreferrer" onClick={()=> setIsOpen(!isOpen) } >
                            {/* <SettingsIcon className="h-6 w-6 mr-3" /> */}
                            New Receipt
                        </Link>

                        {
                          isOpen && (
                          <div class="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                              <div class="py-1" role="none">
                                <Link to={ user? "/type/toor" : '/login' } class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0"  onClick={()=> handleLink('toor')} >Toor</Link>
                                <Link to={ user? "/type/moog" : '/login' } class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1"  onClick={()=> handleLink('moog')} >Moog</Link>
                                <Link to={ user? "/type/udid" : '/login' } class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2"  onClick={()=> handleLink('udid')} >Udid</Link>
                              </div>
                            </div>
                          )
                        }
                        </div>
                  </div>
                )
              }
              
            </div>
          </div>
    </div>

    </div>
    </>
  )
}

export default Home
