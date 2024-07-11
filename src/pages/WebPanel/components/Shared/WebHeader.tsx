import { Fragment, useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import UserIcon from "./../../../../images/user.png";
import CartIcon from "./../../../../images/cart.png";
import SearchIcon from "./../../../../images/search.png";
import LogOutIcon from "./../../../../images/logout.svg";
import CartPopup from "../../Cart/CartPopup/CartPopup";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./../../../../store"
import { logout } from "../../../../store/user/action-Creation";


const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const WebHeader = () => {
  const user = useSelector((state: State) => state.user)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    console.log("Here---")
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    dispatch(logout())
    setIsProfileMenu(false)
    navigate('/')
  }


  return (
    <>
    <header className="bg-gray-300 relative">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between py-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a
            className="-m-1.5 p-1.5 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 font-semibold leading-6 text-gray-800">
              Product
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-800"
                aria-hidden="true"
              />
            </PopoverButton>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-700"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>

          <a href="#" className="font-semibold leading-6 text-gray-800">
            Features
          </a>
          <a href="#" className="font-semibold leading-6 text-gray-800">
            Marketplace
          </a>
          <a href="#" className="font-semibold leading-6 text-gray-800">
            Company
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex -space-x-1 overflow-hidden ml-2 cursor-pointer">
            <svg
              className="stroke-gray-700"
              width="30"
              height="30"
              viewBox="2 2 20 20"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setIsCartPopupOpen(!isCartPopupOpen)}
            >
              <path
                fill="#fff"
                d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                stroke=""
                stroke-width="1.6"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
          
          <div className="flex -space-x-1 overflow-hidden ml-4">
            <p className="content-center">{" | "}</p>
          </div>
          <div 
            className="flex -space-x-1 overflow-hidden ml-4 cursor-pointer"
            onClick={ () => setIsProfileMenu(!isProfileMenu)}>
            {
              user && user?.user_photo ? (
                <>
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-white"
                    src={process.env.REACT_APP_API_URL + user.user_photo}
                    alt=""
                  />
                </>
              ) : (
                <>
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-white"
                    src={UserIcon}
                    alt=""
                  />
                </>
              )
            }
          </div>
          { user.isLoggedIn && isProfileMenu && 
            <>
              <div className="absolute z-10 mt-8 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                <div className="py-1" role="none">
                  <p className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 hover:text-indigo-700">{user?.first_name}{" "}{user?.last_name}</p>
                </div>
                <div className="py-1" role="none">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700" role="menuitem" id="menu-item-0">Edit</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700" role="menuitem" id="menu-item-1">Duplicate</a>
                </div>
                <div className="py-1" role="none">
                  <a 
                  className="block px-4 cursor-pointer py-1 text-sm font-semibold text-gray-700 hover:bg-gray-100" role="menuitem" id="menu-item-6"
                  onClick={logoutHandler}>
                    <img
                      className="inline-block h-5 w-5 mr-2 ring-white"
                      src={LogOutIcon}
                      alt=""
                    />
                    Log out
                  </a>
                </div>
              </div>
            </>
          }
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-100 hover:bg-gray-50"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href=""
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    {
      isCartPopupOpen && 
      <div className="absolute flex justify-center items-center right-0">
        <CartPopup setIsCartPopupOpen={setIsCartPopupOpen} />
      </div>
    }

    
    </>
  );
}

export default WebHeader