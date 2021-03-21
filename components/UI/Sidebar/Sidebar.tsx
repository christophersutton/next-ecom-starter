import { FC } from 'react'
import { Transition } from "@headlessui/react";

interface Props {
  children: any
  isOpen: boolean
  sidebarView: string
  closeSidebar: () => void
}

const Sidebar: FC<Props> = ({ children, isOpen, sidebarView, closeSidebar }) => {
  console.log(sidebarView);
  return (
    <Transition
      show={isOpen}
      enter="transition ease-in-out duration-300 transform"
        enterFrom="transform -translate-x-full"
        enterTo="transform translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="transform translate-x-0"
        leaveTo="transform -translate-x-full"
    >
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <section
            className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
            aria-labelledby="slide-over-heading"
          >
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="pt-8 sm:px-6">
                  <div className="flex items-start justify-between">
                  <div className="relative">
                    
                    <h4 className="text-xl">{ sidebarView === "CART" ? 'My Cart' : ''}</h4>
                  </div>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        onClick={() => closeSidebar()}
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <span className="sr-only">Close panel</span>
                        {/* <!-- Heroicon name: outline/x --> */}
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="min-h-0 flex-1 flex flex-col py-2 ">
                  {children}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Transition>
  );
};

export default Sidebar