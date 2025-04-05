"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from '@/context/ThemeContext';

const NavLink = ({ href, title }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const isActive = pathname === href;

  const handleClick = (e) => {
    e.preventDefault();
    console.log('Navigating to:', href);
    router.push(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`block py-2 pl-3 pr-4 sm:text-xl rounded md:p-0 transition-colors duration-300
                 ${isActive 
                   ? isDarkMode 
                     ? 'text-[#93a1a1]' 
                     : 'text-[#002b36]' 
                   : isDarkMode 
                     ? 'text-[#839496] hover:text-[#93a1a1]' 
                     : 'text-[#586e75] hover:text-[#002b36]'}`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
