"use client";
import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redux/features/auth/authSlice";

export default function NavbarLayout() {
  const { loginData } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    if (localStorage.getItem("userToken")) {
      dispatch(getUser());
    }
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" className="p-1 font-normal text-white text-md">
        <Link
          href="/"
          className={`flex items-center uppercase ${
            pathname === "/" ? "link-active" : "hover-underline-animation"
          }`}
        >
          Home
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal text-white text-md">
        <Link
          href="/rooms"
          className={`flex items-center uppercase ${
            pathname === "/rooms" ? "link-active" : "hover-underline-animation"
          }`}
        >
          Rooms
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal text-white text-md">
        <Link
          href="/services"
          className={`flex items-center uppercase ${
            pathname === "/services"
              ? "link-active"
              : "hover-underline-animation"
          }`}
        >
          Services
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal text-white text-md">
        <Link
          href="/about"
          className={`flex items-center uppercase ${
            pathname === "/about" ? "link-active" : "hover-underline-animation"
          }`}
        >
          About Us
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal text-white text-md">
        <Link
          href="/contact"
          className={`flex items-center uppercase ${
            pathname === "/contact"
              ? "link-active"
              : "hover-underline-animation"
          }`}
        >
          Contact Us
        </Link>
      </Typography>
      <Typography as="li" className="p-1 font-normal text-white text-md">
        <a
          href="/booking"
          className={`flex items-center uppercase ${
            pathname === "/booking"
              ? "link-active"
              : "hover-underline-animation"
          }`}
        >
          booking
        </a>
      </Typography>
    </ul>
  );

  return (
    <div>
      <Navbar className="bg-navbar-color border-none h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Link
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium text-white text-2xl"
          >
            Logo
          </Link>
          <div className="hidden lg:block">{navList}</div>
          {loginData ? (
            <Link
              href="/user/bookings"
              className="hidden lg:inline-block p-1 font-normal text-white text-lg mr-5"
            >
              My Bookings
            </Link>
          ) : pathname !== "/login" && pathname !== "/signup" ? (
            <Link
              href="/login"
              className="hidden lg:inline-block p-1 font-normal text-white text-lg mr-5"
            >
              Login
            </Link>
          ) : (
            <span className="invisible mr-8">Login</span>
          )}

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-white hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <div className="container mx-auto">
            {navList}
            {loginData ? (
              <Link
                href="/user/bookings"
                className="font-normal text-white text-lg mr-5"
              >
                My Bookings
              </Link>
            ) : pathname !== "/login" ? (
              <Link
                href="/login"
                className="font-normal text-white text-lg mr-5"
              >
                Login
              </Link>
            ) : (
              ""
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
