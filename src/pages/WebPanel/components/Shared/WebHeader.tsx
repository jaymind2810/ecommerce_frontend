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
import { successToast } from "../../../../store/toast/actions-creation";
import { getCartItemsDetails } from "../../../../requests/WebPanel/CartRequests";
import { ActionType } from "../../../../store/cart/action-Types";


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
  const cart = useSelector((state: State) => state.cart)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isProfileMenu, setIsProfileMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ProfilePopupRef = useRef<HTMLElement | any>();
  const CartPopupRef = useRef<HTMLElement | any>();

  useEffect(() => {
    setCartCount(cart?.cart?.length)
  }, [cart]);

  const handleClickOutside = (event: any) => {
    if (!ProfilePopupRef?.current?.contains(event.target)) {
      setIsProfileMenu(false)
    }
    if (!CartPopupRef?.current?.contains(event.target)) {
      setIsCartPopupOpen(false)
    }
  };

  useEffect(() => {
    const listener = document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileMenu, isCartPopupOpen]); // Re-attach listener on state change

  const logoutHandler = () => {
    console.log("Here---")
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    dispatch(logout())
    setIsProfileMenu(false)
    dispatch(
      successToast({
        toast: true,
        message: "Log out Successfully !!",
      })
    );
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
                viewBox="0 0 1024 1024" 
                className="w-8 h-8" version="1.1" 
                xmlns="http://www.w3.org/2000/svg" fill="#000000"
                onClick={() => setIsCartPopupOpen(!isCartPopupOpen)}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M845.4 383H758c-16.6 0-30-13.4-30-30s13.4-30 30-30h87.4c16.6 0 30 13.4 30 30s-13.5 30-30 30zM662.3 383H263.1c-16.6 0-30-13.4-30-30s13.4-30 30-30h399.2c16.6 0 30 13.4 30 30s-13.5 30-30 30z" fill="#4f46e5"></path>
                  {/* <path d="M433.2 873.2m-55 0a55 55 0 1 0 110 0 55 55 0 1 0-110 0Z" fill="#4f46e5"></path>
                  <path d="M854.5 873.2m-55 0a55 55 0 1 0 110 0 55 55 0 1 0-110 0Z" fill="#4f46e5"></path> */}
                  <path d="M889.8 722.1h-511c-37.7 0-68.4-30.7-68.4-68.4v-1.4L274.5 270v-0.2-0.2l-6-55.4c-8.6-86.8-57.6-117.5-97.3-128.1L101.5 69c-16.1-4-32.3 5.9-36.3 22s5.9 32.3 22 36.3l68.9 16.9c16.2 4.3 28.1 12.4 36.6 24.7 8.6 12.4 14 29.7 16.1 51.4l6 55.6 35.6 379.3c0.8 70.1 58.1 126.9 128.4 126.9h511c16.6 0 30-13.4 30-30s-13.4-30-30-30z" fill="#45484C"></path>
                  <path d="M840.3 197.8H381c-16.6 0-30 13.4-30 30s13.4 30 30 30h459.3c30.2 0 54.9 24.3 55.5 54.3l-19.9 226.5-0.1 1.3v1.3c0 30.6-24.9 55.5-55.5 55.5H436c-16.6 0-30 13.4-30 30s13.4 30 30 30h384.3c63.2 0 114.7-51.1 115.5-114.1L955.7 316l0.1-1.3v-1.3c0-63.8-51.8-115.6-115.5-115.6z" fill="#45484C"></path>
                  <path d="M408.5 842.1c7.2 0 13.1 5.9 13.1 13.1s-5.9 13.1-13.1 13.1-13.1-5.9-13.1-13.1 5.9-13.1 13.1-13.1m0-60c-40.4 0-73.1 32.7-73.1 73.1s32.7 73.1 73.1 73.1 73.1-32.7 73.1-73.1-32.7-73.1-73.1-73.1zM823.1 842.1c7.2 0 13.1 5.9 13.1 13.1s-5.9 13.1-13.1 13.1-13.1-5.9-13.1-13.1 5.9-13.1 13.1-13.1m0-60c-40.4 0-73.1 32.7-73.1 73.1s32.7 73.1 73.1 73.1 73.1-32.7 73.1-73.1-32.7-73.1-73.1-73.1z" fill="#45484C"></path>
                </g>
              </svg>
              <span className="align-middle bg-sky-500 h-5 item-center rounded-full text-sm text-center w-5 z-50">{cartCount}</span>
            </div>
            {
              isCartPopupOpen &&
              <div 
                className="absolute flex justify-center items-center mt-8 right-4 rounded-lg ring-1 ring-black ring-opacity-5 bg-white shadow-lg"
                ref={CartPopupRef}
                >
                <CartPopup setIsCartPopupOpen={setIsCartPopupOpen} />
              </div>
            }

            <div className="flex -space-x-1 overflow-hidden ml-2">
              <p className="content-center">{" | "}</p>
            </div>
            <div
              className="flex -space-x-1 overflow-hidden ml-4 cursor-pointer"
              onClick={() => setIsProfileMenu(true)}>
              {
                user.isLoggedIn && user?.user_photo ? (
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
            {user.isLoggedIn && isProfileMenu &&
              <>
                <div
                  className="absolute z-10 mt-8 w-56 origin-top-right divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  ref={ProfilePopupRef}>
                  <div className="py-1" role="none">
                    <p className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 hover:text-indigo-700">{user?.first_name}{" "}{user?.last_name}</p>
                  </div>
                  <div className="py-1" role="none">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700" role="menuitem" id="menu-item-0">Edit</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-700" role="menuitem" id="menu-item-1">Duplicate</a>
                  </div>
                  <div className="py-1" role="none">
                    <a
                      className="block px-4 cursor-pointer py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100" role="menuitem" id="menu-item-6"
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




    </>
  );
}

export default WebHeader