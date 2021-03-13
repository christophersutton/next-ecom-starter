import { Transition } from "@headlessui/react";
import { useUI } from '../context.tsx'

export const Sidebar = ({ children, isOpen }) => {
  
  return (
    <Transition
      show={isOpen}
      enter="transform transition ease-in-out duration-900 sm:duration-900"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-900 sm:duration-900"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <section
            className="absolute inset-y-0 right-0 pl-10 max-w-full flex"
            aria-labelledby="slide-over-heading"
          >
            <div className="w-screen max-w-md">
              <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                <div className="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
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

export const SidebarHeader = (props) => {
  
  const { closeSidebar } = useUI();
  const { title } = props;

  return (
    <div className="px-4 sm:px-6">
      <div className="flex items-start justify-between">
        <h2
          id="slide-over-heading"
          className="text-lg font-medium text-gray-900"
        >
          {title}
        </h2>
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
  );
};

