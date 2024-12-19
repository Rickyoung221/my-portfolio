"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Logo from "./Logo";
import GithubIcon from "../../../public/github-white-icon.png";
import LinkedinIcon from "../../../public/linkedin-app-white-icon.svg";
import InstagramIcon from "../../../public/instagram-white-icon.svg";
import ThemeToggle from "@components/ThemeToggle";

import Image from "next/image";

const navLinks = [
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Projects",
    path: "/projects",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Hobbies",
    path: "/hobbies",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212] border-b border-[#33353F] bg-opacity-95">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          <Logo />
        </Link>
        {/* Socials at center */}
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/Rickyoung221" target="_blank">
            <Image src={GithubIcon} alt="Github Icon" className="w-8 h-8" />
          </Link>
          <Link href="https://www.linkedin.com/in/weikeng-yang" target="_blank">
            <Image src={LinkedinIcon} alt="Linkedin Icon" className="w-8 h-8" />
          </Link>
          <Link href="https://www.instagram.com/rick_young0221" target="_blank">
            <Image
              src={InstagramIcon}
              alt="Instagram Icon"
              className="w-8 h-8"
            />
          </Link>
        </div>

        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
