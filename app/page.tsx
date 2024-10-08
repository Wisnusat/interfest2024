'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WandIcon, ShieldIcon, CodeIcon, SparklesIcon, StarIcon, NewspaperIcon, GlobeIcon, BookOpenIcon, UsersIcon } from "lucide-react"
import Link from "next/link"

const FloatingIcon = ({ icon: Icon, ...props }: any) => (
  <motion.div
    className="absolute z-10"
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    {...props}
  >
    <Icon className="text-[#FFD700] w-16 h-16" />
  </motion.div>
)

const MagicSparkle = () => (
  <motion.div
    className="absolute"
    initial={{ scale: 0, rotate: 0 }}
    animate={{
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeatDelay: Math.random() * 2,
    }}
  >
    <SparklesIcon className="text-[#FFD700] w-6 h-6" />
  </motion.div>
)

export default function InterfestLandingPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const cursorRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (e: any) => {
        setCursorPosition({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const competitions = [
    { icon: WandIcon, title: "UI/UX", description: "Craft enchanting interfaces that mesmerize users" },
    { icon: ShieldIcon, title: "CTF", description: "Conquer cybersecurity realms and protect digital kingdoms" },
    { icon: CodeIcon, title: "Coding", description: "Weave powerful algorithms to solve mystical challenges" },
  ]

  const sponsors = [
    { name: "MagicTech", icon: WandIcon },
    { name: "Spell Systems", icon: SparklesIcon },
    { name: "Enchanted Innovations", icon: StarIcon },
    { name: "Mystic Solutions", icon: ShieldIcon },
  ]

  const mediaPartners = [
    { name: "Tech Chronicle", icon: NewspaperIcon },
    { name: "Digital Realm", icon: GlobeIcon },
    { name: "Code Casters", icon: CodeIcon },
    { name: "Innovation Pulse", icon: SparklesIcon },
  ]

  const workshops = [
    { title: "Mastering the Art of UI Enchantment", icon: WandIcon, description: "Learn to create captivating user interfaces that leave users spellbound." },
    { title: "Cybersecurity Spells and Incantations", icon: ShieldIcon, description: "Discover powerful techniques to ward off digital threats and protect your realm." },
    { title: "Algorithmic Sorcery", icon: CodeIcon, description: "Unlock the secrets of crafting efficient algorithms to solve complex magical problems." },
    { title: "The Alchemy of Innovation", icon: SparklesIcon, description: "Transform your ideas into groundbreaking innovations through the magic of technology." },
  ]

  return (
    <div className="bg-[#0B0B3B] text-white min-h-screen font-sans overflow-x-hidden">
      <motion.div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-[#FFD700] rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#FFD700] transform-origin-0" style={{ scaleX }} />
      
      <header className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40 bg-[#0B0B3B] bg-opacity-80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WandIcon className="h-8 w-8 text-[#FFD700]" />
        </motion.div>
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ul className="flex space-x-4 md:space-x-6">
            <li><Link href="#" className="text-[#FFD700] transition-colors">Home</Link></li>
            <li><Link href="#" className="hover:text-[#FFD700] transition-colors">Competitions</Link></li>
            <li><Link href="#" className="hover:text-[#FFD700] transition-colors">Register</Link></li>
          </ul>
        </motion.nav>
      </header>

      <main>
        <section className="min-h-screen flex flex-col justify-center items-center p-4 md:p-6 relative bg-gradient-to-b from-[#0B0B3B] to-[#1E0B3B] overflow-hidden">
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {[...Array(50)].map((_, i) => typeof window !== 'undefined' && (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              >
                <StarIcon className="text-[#FFD700] w-5 h-5" />
              </motion.div>
            ))}
          </motion.div>
          <FloatingIcon icon={WandIcon} className="top-20 left-20" />
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
              Interfest 2024
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-center max-w-2xl mb-6 md:mb-8 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Embark on a magical journey of technology and innovation
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10"
          >
            <Button size="lg" className="text-lg bg-[#FFD700] text-[#0B0B3B] hover:bg-[#FFA500]">
              Register Now
            </Button>
          </motion.div>
        </section>

        <section id="about" className="py-12 md:py-24 flex flex-col justify-center p-4 md:p-6 bg-[#1E0B3B] relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[#FFD700]">About Interfest</h2>
            <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6">
              Interfest is Telkom University's premier tech competition, bringing together the brightest minds in a celebration of innovation and creativity.
            </p>
            <p className="text-base md:text-lg lg:text-xl">
              Join us for an enchanting experience where technology meets magic, and where your skills can shine in our mystical challenges.
            </p>
          </motion.div>
        </section>

        <section id="competitions" className="py-12 md:py-24 p-4 md:p-6 bg-gradient-to-b from-[#1E0B3B] to-[#0B0B3B] relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center text-[#FFD700] relative z-10">Magical Competitions</h2>
          <div className="max-w-4xl mx-auto grid gap-6 md:gap-8 md:grid-cols-3 relative z-10">
            {competitions.map((comp, index) => (
              <motion.div
                key={comp.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#2D1B4E] border-[#FFD700] border-2 h-full">
                  <CardHeader>
                    <comp.icon className="h-12 w-12 mb-4 text-[#FFD700]" />
                    <CardTitle className="text-[#FFD700]">{comp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">{comp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <FloatingIcon icon={CodeIcon} className="bottom-20 right-20" />
        </section>

        <section id="workshops" className="py-12 md:py-24 p-4 md:p-6 bg-gradient-to-b from-[#0B0B3B] to-[#1E0B3B] relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center text-[#FFD700] relative z-10">Enchanting Workshops</h2>
          <div className="max-w-6xl mx-auto grid gap-6 md:gap-8 md:grid-cols-2 relative z-10">
            {workshops.map((workshop, index) => (
              <motion.div
                key={workshop.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-[#2D1B4E] border-[#FFD700] border h-full">
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <workshop.icon className="h-12 w-12 text-[#FFD700]" />
                    <CardTitle className="text-[#FFD700]">{workshop.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">{workshop.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <FloatingIcon icon={BookOpenIcon} className="top-20 left-20" />
          <FloatingIcon icon={UsersIcon} className="bottom-20 right-20" />
        </section>

        <section id="sponsors" className="py-12 md:py-24 p-4 md:p-6 flex flex-col justify-center bg-[#0B0B3B] relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center text-[#FFD700] relative z-10">Our Magical Sponsors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto relative z-10">
            {sponsors.map((sponsor, i) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="flex flex-col items-center justify-center p-4 bg-[#2D1B4E] border-[#FFD700]
                border h-full">
                  <sponsor.icon className="h-12 w-12 mb-4 text-[#FFD700]" />
                  <h3 className="text-center text-[#FFD700]">{sponsor.name}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
          <FloatingIcon icon={SparklesIcon} className="top-20 left-20" />
        </section>

        <section id="media-partners" className="py-12 md:py-24 p-4 md:p-6 flex flex-col justify-center bg-gradient-to-b from-[#1E0B3B] to-[#0B0B3B] relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center text-[#FFD700] relative z-10">Media Partners</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto relative z-10">
            {mediaPartners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-36 h-36 md:w-48 md:h-48"
              >
                <div className="bg-[#2D1B4E] border-4 border-[#FFD700] rounded-full w-full h-full flex flex-col items-center justify-center p-4 transform hover:scale-110 transition-transform duration-300">
                  <partner.icon className="h-12 w-12 md:h-16 md:w-16 mb-2 text-[#FFD700]" />
                  <h3 className="text-center text-[#FFD700] text-xs md:text-sm">{partner.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <FloatingIcon icon={NewspaperIcon} className="bottom-20 right-20" />
        </section>
      </main>

      <footer className="bg-[#1E0B3B] text-white py-6 md:py-8 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center relative z-10">
          <div className="mb-4 sm:mb-0">
            <WandIcon className="h-8 w-8 mb-2 text-[#FFD700]" />
            <p className="text-sm">© 2024 Interfest. All rights reserved.</p>
          </div>
          <nav>
            <ul className="flex space-x-4 md:space-x-6">
              <li><Link href="#" className="hover:text-[#FFD700] transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-[#FFD700] transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-[#FFD700] transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </div>
        {[...Array(10)].map((_, i) => (
          <MagicSparkle key={i} />
        ))}
      </footer>
    </div>
  )
}