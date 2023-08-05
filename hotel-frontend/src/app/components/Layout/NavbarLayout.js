'use client';
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from 'next/navigation'


// profile menu component
const profileMenuItems = [

  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Booking History",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-blue-500 p-0.5"
            src="/user.png"
          />

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}



export default function NavbarLayout() {
  const profile = true;

  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        className="p-1 font-normal text-white text-md"
      >
        <Link href="/" className={`flex items-center uppercase ${pathname === '/' ? 'link-active' : 'hover-underline-animation'}`}>
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        className="p-1 font-normal text-white text-md"
      >
        <Link href="/rooms" className={`flex items-center uppercase ${pathname === '/rooms' ? 'link-active' : 'hover-underline-animation'}`}>
          Rooms
        </Link>
      </Typography>
      <Typography
        as="li"
        className="p-1 font-normal text-white text-md"
      >
        <Link href="/services" className={`flex items-center uppercase ${pathname === '/services' ? 'link-active' : 'hover-underline-animation'}`}>
          Services
        </Link>
      </Typography>
      <Typography
        as="li"
        className="p-1 font-normal text-white text-md"
      >
        <Link href="/about" className={`flex items-center uppercase ${pathname === '/about' ? 'link-active' : 'hover-underline-animation'}`}>
          About Us
        </Link>
      </Typography>
      <Typography
        as="li"
        className="p-1 font-normal text-white text-md"
      >
        <Link href="/contact" className={`flex items-center uppercase ${pathname === '/contact' ? 'link-active' : 'hover-underline-animation'}`}>
          Contact Us
        </Link>
      </Typography>
    </ul >
  );

  return (
    <div>
      <Navbar
        className="bg-navbar-color border-none h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Link
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium text-white text-2xl"
          >
            Logo
          </Link>
          <div className="hidden lg:block">{navList}</div>
          {profile ? <ProfileMenu /> : <Link href="/login" className="hidden lg:inline-block p-1 font-normal text-white text-lg mr-5">Login</Link>}


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
            <Link href="/login" className="mb-2 p-1 font-normal text-white text-lg">
              Login
            </Link>
          </div>
        </Collapse>
      </Navbar>

    </div>
  );
}