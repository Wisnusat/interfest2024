import { motion } from 'framer-motion'
import { WandIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
  const pathname = usePathname();
  console.log(pathname)

  return (
    <header className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40 bg-opacity-80 backdrop-blur-md">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <WandIcon className="h-8 w-8 text-[#FFD700]" />
            <span className="text-[#FFD700] font-bold text-xl">Interfest</span>
          </motion.div>
        </Link>
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
              <Link href="/register" className={`hover:text-[#FFD700] transition-colors ${pathname === '/workshop' ? 'text-[#FFD700]' : 'text-gray-100'}`}>
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
      </header>
  )
}

export default Header
