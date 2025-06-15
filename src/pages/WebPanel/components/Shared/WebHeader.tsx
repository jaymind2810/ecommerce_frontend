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
import Icon from "./../../../../images/mark.svg";
import LogOutIcon from "./../../../../images/logout.svg";
import CartPopup from "../../Cart/CartPopup/CartPopup";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./../../../../store"
import { logout } from "../../../../store/user/action-Creation";
import { successToast } from "../../../../store/toast/actions-creation";


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
              <svg className="mx-1 w-7 h-7" stroke="currentColor" fill="#4f46e5" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" fontSize="24" height="1em" width="1em"><g fill="#4f46e5"><rect x="40" y="21" width="4" height="23"></rect><rect x="34" y="28" width="4" height="16"></rect><rect x="28" y="23" width="4" height="21"></rect><rect x="22" y="29" width="4" height="15"></rect><rect x="16" y="32" width="4" height="12"></rect><rect x="10" y="30" width="4" height="14"></rect><rect x="4" y="34" width="4" height="10"></rect></g><g fill="#4f46e5"><polygon points="40.1,9.1 34,15.2 30,11.2 20,21.2 15,16.2 4.6,26.6 7.4,29.4 15,21.8 20,26.8 30,16.8 34,20.8 42.9,11.9"></polygon><polygon points="44,8 35,8 44,17"></polygon></g></svg>
              {/* <img
                className="h-8 w-auto"
                src={Icon}
                alt=""
              /> */}
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
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
            <div className="flex -space-x-1 overflow-hidden ml-2 cursor-pointer">
              <svg 
                viewBox="0 0 1024 1024" 
                className="w-8 h-8" version="1.1" 
                xmlns="http://www.w3.org/2000/svg" fill="#000000"
                onClick={() => setIsCartPopupOpen(!isCartPopupOpen)}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M845.4 383H758c-16.6 0-30-13.4-30-30s13.4-30 30-30h87.4c16.6 0 30 13.4 30 30s-13.5 30-30 30zM662.3 383H263.1c-16.6 0-30-13.4-30-30s13.4-30 30-30h399.2c16.6 0 30 13.4 30 30s-13.5 30-30 30z" fill="#4f46e5"></path>
                  {/* <path d="M433.2 873.2m-55 0a55 55 0 1 0 110 0 55 55 0 1 0-110 0Z" fill="#4f46e5"></path>
                  <path d="M854.5 873.2m-55 0a55 55 0 1 0 110 0 55 55 0 1 0-110 0Z" fill="#4f46e5"></path> */}
                  <path d="M889.8 722.1h-511c-37.7 0-68.4-30.7-68.4-68.4v-1.4L274.5 270v-0.2-0.2l-6-55.4c-8.6-86.8-57.6-117.5-97.3-128.1L101.5 69c-16.1-4-32.3 5.9-36.3 22s5.9 32.3 22 36.3l68.9 16.9c16.2 4.3 28.1 12.4 36.6 24.7 8.6 12.4 14 29.7 16.1 51.4l6 55.6 35.6 379.3c0.8 70.1 58.1 126.9 128.4 126.9h511c16.6 0 30-13.4 30-30s-13.4-30-30-30z" fill="#45484C"></path>
                  <path d="M840.3 197.8H381c-16.6 0-30 13.4-30 30s13.4 30 30 30h459.3c30.2 0 54.9 24.3 55.5 54.3l-19.9 226.5-0.1 1.3v1.3c0 30.6-24.9 55.5-55.5 55.5H436c-16.6 0-30 13.4-30 30s13.4 30 30 30h384.3c63.2 0 114.7-51.1 115.5-114.1L955.7 316l0.1-1.3v-1.3c0-63.8-51.8-115.6-115.5-115.6z" fill="#45484C"></path>
                  <path d="M408.5 842.1c7.2 0 13.1 5.9 13.1 13.1s-5.9 13.1-13.1 13.1-13.1-5.9-13.1-13.1 5.9-13.1 13.1-13.1m0-60c-40.4 0-73.1 32.7-73.1 73.1s32.7 73.1 73.1 73.1 73.1-32.7 73.1-73.1-32.7-73.1-73.1-73.1zM823.1 842.1c7.2 0 13.1 5.9 13.1 13.1s-5.9 13.1-13.1 13.1-13.1-5.9-13.1-13.1 5.9-13.1 13.1-13.1m0-60c-40.4 0-73.1 32.7-73.1 73.1s32.7 73.1 73.1 73.1 73.1-32.7 73.1-73.1-32.7-73.1-73.1-73.1z" fill="#45484C"></path>
                </g>
              </svg>
              <span className="align-middle bg-sky-500 h-4 item-center rounded-full text-xs text-center w-4 z-10">{cartCount}</span>              
            </div>
            {
              isCartPopupOpen &&
              <div 
                className="absolute flex justify-center items-center top-16 right-4 rounded-lg ring-1 ring-black ring-opacity-5 bg-white shadow-lg"
                ref={CartPopupRef}
                >
                <CartPopup setIsCartPopupOpen={setIsCartPopupOpen} />
              </div>
            }

            <div className="pl-1 flex">
              <svg className="w-7 h-7" fill="#45484C" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="-15.36 -15.36 542.72 542.72" stroke="#4f46e5" stroke-width="5.12"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.024"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M65.192,272.872c-3.979-4.342-10.727-4.641-15.071-0.659c-1.233,1.13-2.509,2.27-3.825,3.427 c-4.425,3.888-4.862,10.627-0.975,15.053c2.111,2.401,5.056,3.628,8.019,3.628c2.5,0,5.01-0.874,7.036-2.653 c1.431-1.257,2.817-2.498,4.156-3.726C68.876,283.963,69.172,277.215,65.192,272.872z"></path> <path d="M72.339,265.417c1.856,1.292,3.979,1.913,6.083,1.913c3.373,0,6.692-1.597,8.765-4.575 c17.563-25.238,20.206-50.18,23.705-95.725c0.452-5.874-3.943-11.002-9.819-11.453c-5.891-0.451-11.001,3.946-11.452,9.819 c-3.296,42.902-5.519,64.445-19.943,85.174C66.309,255.404,67.503,262.053,72.339,265.417z"></path> <path d="M398.336,147.832c1.069,5.012,5.495,8.446,10.422,8.446c0.735,0,1.484-0.077,2.234-0.237 c5.76-1.228,9.438-6.894,8.208-12.655c-0.439-2.064-0.925-4.142-1.442-6.177c-1.452-5.709-7.259-9.162-12.966-7.71 c-5.709,1.452-9.161,7.257-7.709,12.966C397.532,144.233,397.954,146.039,398.336,147.832z"></path> <path d="M465.484,275.453c-31.224-25.969-38.083-51.269-42.433-101.768c-0.507-5.87-5.679-10.221-11.543-9.711 c-5.869,0.506-10.217,5.674-9.711,11.542c4.698,54.531,13.383,85.849,50.046,116.339c1.994,1.658,4.411,2.466,6.815,2.466 c3.06,0,6.098-1.31,8.208-3.846C470.632,285.945,470.013,279.22,465.484,275.453z"></path> <path d="M441.904,314.239c-0.142-0.284-0.295-0.559-0.463-0.828c-2.579-4.601-5.867-8.114-9.823-10.396 c-28.787-16.613-46.208-61.816-51.781-134.352c-4.133-53.8-42.494-97.895-92.406-111.187c3.738-5.813,5.915-12.72,5.915-20.129 C293.347,16.754,276.592,0,255.998,0c-20.592,0-37.346,16.754-37.346,37.348c0,7.409,2.179,14.315,5.915,20.129 c-49.912,13.291-88.273,57.387-92.408,111.187c-5.573,72.536-22.994,117.738-51.779,134.352 c-8.337,4.811-13.755,15.027-15.665,29.548c-1.239,9.426-1.621,29.217,5.817,36.649c2,1.999,4.713,3.122,7.539,3.122h113.823 c5.104,30.781,31.9,54.332,64.107,54.332c32.206,0,59.001-23.551,64.107-54.332h113.821c2.827,0,5.539-1.123,7.539-3.122 c7.44-7.437,7.056-27.234,5.814-36.663C446.33,325.338,444.513,319.191,441.904,314.239z M255.998,21.333 c8.831,0,16.015,7.184,16.015,16.015c0,8.83-7.183,16.014-16.015,16.014c-8.829,0-16.013-7.184-16.013-16.014 C239.986,28.517,247.17,21.333,255.998,21.333z M255.998,405.333c-20.398,0-37.569-14.061-42.341-32.998h84.681 C293.567,391.272,276.396,405.333,255.998,405.333z M426.234,351.002H85.763c-0.442-3.487-0.675-8.542-0.067-14.235 c1.021-9.532,3.756-14.356,5.346-15.275c35.748-20.631,56.156-70.087,62.387-151.194c4.118-53.609,49.173-95.603,102.568-95.603 c53.396,0,98.45,41.995,102.568,95.603c2.998,39.019,9.285,70.691,18.975,95.374h-40.1c-5.889,0-10.667,4.775-10.667,10.667 s4.778,10.667,10.667,10.667h50.323c4.822,8.249,10.221,15.35,16.197,21.333H297.596c-5.889,0-10.667,4.775-10.667,10.667 c0,5.891,4.778,10.667,10.667,10.667H425.05c0.512,1.988,0.953,4.338,1.248,7.093 C426.909,342.459,426.675,347.514,426.234,351.002z"></path> <path d="M362.663,490.667l-213.333-0.004c-5.889,0-10.667,4.775-10.667,10.667c0,5.89,4.775,10.667,10.667,10.667L362.663,512 c5.891,0,10.667-4.775,10.667-10.667S368.555,490.667,362.663,490.667z"></path> <path d="M259.198,308.339h-6.4c-5.891,0-10.667,4.775-10.667,10.667c0,5.891,4.775,10.667,10.667,10.667h6.4 c5.889,0,10.667-4.775,10.667-10.667C269.865,313.114,265.088,308.339,259.198,308.339z"></path> </g> </g> </g> </g></svg>
              <span className="absolute ml-5 align-middle bg-sky-500 h-4 item-center rounded-full text-xs text-center w-4 z-10">{cartCount}</span> 
            </div>

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
                  className="absolute z-10 top-8 w-56 origin-top-right divide-y divide-gray-200 rounded-lg bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  ref={ProfilePopupRef}>
                  <div className="py-1" role="none">
                    <p className="block px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 hover:text-indigo-700">Welcome {user?.first_name}{" "}{user?.last_name}</p>
                  </div>
                  <div className="py-1 px-2" role="none">
                    <a 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-indigo-700 cursor-pointer" role="menuitem" id="menu-item-0"
                      onClick={() => {
                        navigate("/user/profile");
                        setIsProfileMenu(false)
                      }}
                    >
                      Profile
                    </a>
                    <a 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-indigo-700 cursor-pointer" role="menuitem" id="menu-item-1"
                      onClick={() => {
                        navigate("/user/orders");
                        setIsProfileMenu(false)
                      }}
                    >
                      Orders
                    </a>
                    <a 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-indigo-700 cursor-pointer" role="menuitem" id="menu-item-1"
                      onClick={() => {
                        navigate("/users");
                        setIsProfileMenu(false)
                      }}
                    >
                      Users
                    </a>
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