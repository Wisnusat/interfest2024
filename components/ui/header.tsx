import { motion } from 'framer-motion'
import { WandIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import interfestImage from '../../app/assets/logo_interfest.png';
import { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname)

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40 bg-opacity-80 backdrop-blur-md max-h-[3.5rem]">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <img src={interfestImage.src} alt="Logo Interfest" className="h-10 w-10 md:h-14 md:w-14 flex-shrink-0" />
            <span className="hidden md:block silver-stone-font text-[#FFD700] font-bold text-3xl">Interfest 2024</span>
          </motion.div>
        </Link>
        <div className="hidden md:block">
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ul className="flex space-x-4 md:space-x-6">
              <li>
                <Link href="/" className={`hover:text-[#FFD700] transition-colors ${pathname === '/' ? 'text-[#FFD700]' : 'text-gray-100'}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/opencompetition" className={`hover:text-[#FFD700] transition-colors ${pathname === '/opencompetition' ? 'text-[#FFD700]' : 'text-gray-100'}`}>
                  Competitions
                </Link>
              </li>
              <li>
                <Link href="/workshop" className={`hover:text-[#FFD700] transition-colors ${pathname === '/workshop' ? 'text-[#FFD700]' : 'text-gray-100'}`}>
                  Workshop
                </Link>
              </li>
              <li>
                <Link href="/register" className={`hover:text-[#FFD700] transition-colors ${pathname === '/register' ? 'text-[#FFD700]' : 'text-gray-100'}`}>
                  Register
                </Link>
              </li>
            </ul>
          </motion.nav>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#FFD700] text-3xl">
            ☰
          </button>
        </div>
      </header>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`${isOpen ? 'block' : 'hidden'} md:block bg-[#0B0B3B] mt-[3rem] max-w-[8rem] right-0 fixed top-0 z-30`}
      >
        <ul className="flex flex-col md:flex-row p-4">
          <li>
            <Link href="/" className={`hover:text-[#FFD700] transition-colors ${pathname === '/' ? 'text-[#FFD700]' : 'text-gray-100'}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/opencompetition" className={`hover:text-[#FFD700] transition-colors ${pathname === '/opencompetition' ? 'text-[#FFD700]' : 'text-gray-100'}`}>
              Competitions
            </Link>
          </li>
          <li>
            <Link href="/workshop" className={`hover:text-[#FFD700] transition-colors ${pathname === '/workshop' ? 'text-[#FFD700]' : 'text-gray-100'}`}>
              Workshop
            </Link>
          </li>
          <li>
            <Link href="/register" className={`hover:text-[#FFD700] transition-colors ${pathname === '/register' ? 'text-[#FFD700]' : 'text-gray-100'}`}>
              Register
            </Link>
          </li>
        </ul>
      </motion.nav>
    </>
  )
}

export default Header
