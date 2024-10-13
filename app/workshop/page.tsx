'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpenIcon, CodeIcon, AwardIcon, UsersIcon, CalendarIcon, ClockIcon } from "lucide-react"
import Link from "next/link"
import Header from '@/components/ui/header'

const FloatingIcon = ({ icon: Icon, ...props }: any) => (
  <motion.div
    className="absolute z-10"
    animate={{
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    {...props}
  >
    <Icon className="text-[#FFD700] w-12 h-12" />
  </motion.div>
)

const MagicSparkle = ({ delay = 0 }) => (
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
      delay: delay,
    }}
  >
    <BookOpenIcon className="text-[#FFD700] w-4 h-4" />
  </motion.div>
)

export default function WorkshopPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date("2024-11-01") - +new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const workshopDetails = [
    {
      icon: CodeIcon,
      title: "Frontend Fundamentals",
      description: "Learn HTML, CSS, and JavaScript basics to advanced concepts.",
    },
    {
      icon: AwardIcon,
      title: "Frameworks",
      description: "Explore popular frameworks like React and Bootstrap.",
    },
    {
      icon: UsersIcon,
      title: "Hands-on Experience",
      description: "Apply your knowledge through practical projects and exercises.",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-[#0B0B3B] via-[#1E0B3B] to-[#0B0B3B] text-white min-h-screen font-sans overflow-x-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animation: `twinkle ${Math.random() * 5 + 5}s linear ${Math.random() * 5}s infinite`,
            }}
          />
        ))}
      </div>
      <motion.div
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

      <Header />

      <main className="pt-20">
        <section className="min-h-screen flex flex-col justify-center items-center p-4 md:p-6 relative overflow-hidden">
          <FloatingIcon icon={BookOpenIcon} className="mb-8" />
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
              Workshop Interfest
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-center max-w-2xl mb-6 md:mb-8 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Frontend Fundamentals: Code Your Way to the Top
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/register">
              <Button size="lg" className="text-lg bg-[#FFD700] text-[#0B0B3B] hover:bg-[#FFA500]">
                Register Now
              </Button>
            </Link>
          </motion.div>
          <motion.div
            className="mt-8 text-2xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p>Countdown to the event:</p>
            <div className="flex justify-center space-x-4 mt-2">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <span key={`${unit}-${value}`}>{value}{unit.charAt(0)}</span>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="workshop-details" className="py-12 md:py-24 p-4 md:p-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid gap-12 md:gap-16 relative z-10">
            {workshopDetails.map((detail, index) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[#2D1B4E] to-[#1E0B3B] border-[#FFD700] border-2">
                  <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <detail.icon className="h-12 w-12 text-[#FFD700]" />
                    <div>
                      <CardTitle className="text-2xl md:text-3xl text-[#FFD700] mb-2">{detail.title}</CardTitle>
                      <p className="text-lg text-white">{detail.description}</p>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-12 md:py-24 p-4 md:p-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#FFD700]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Workshop Schedule
            </motion.h2>
            <motion.div
              className="grid gap-8 md:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-[#2D1B4E] to-[#1E0B3B] border-[#FFD700] border-2">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#FFD700]">Day 1</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-white"><CalendarIcon className="inline mr-2" />Friday, November 15, 2024</p>
                  <p className="mb-2 text-white"><ClockIcon className="inline mr-2" />18:30 - 21:00</p>
                  <p className="text-white">Topic: Introduction to HTML, CSS, and JavaScript</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#2D1B4E] to-[#1E0B3B] border-[#FFD700] border-2">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#FFD700]">Day 2</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-white"><CalendarIcon className="inline mr-2" />Saturday, November 16, 2024</p>
                  <p className="mb-2 text-white"><ClockIcon className="inline mr-2" />15:30 - 18:00</p>
                  <p className="text-white">Topic: Frameworks (Bootstrap, ReactJS) and Project Practice</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          {[...Array(20)].map((_, i) => (
            <MagicSparkle key={i} delay={i * 0.1} />
          ))}
        </section>

        <section className="py-12 md:py-24 p-4 md:p-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#FFD700]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Benefits
            </motion.h2>
            <motion.ul
              className="text-lg md:text-xl mb-8 list-disc list-inside"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <li>Front-end skill booster</li>
              <li>Hands-on project experience</li>
              <li>Certificate of completion</li>
              <li>Group discussions and networking</li>
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/register">
                <Button size="lg" className="text-lg bg-[#FFD700] text-[#0B0B3B] hover:bg-[#FFA500] transition-all duration-300">
                  Join the Workshop
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1E0B3B] text-white py-6 md:py-8 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center relative z-10">
          <div className="mb-4 sm:mb-0">
            <BookOpenIcon className="h-8 w-8 mb-2 text-[#FFD700]" />
            <p className="text-sm">© 2024 Interfest Workshop. All rights reserved.</p>
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
          <MagicSparkle key={i} delay={i * 0.2} />
        ))}
      </footer>
    </div>
  )
}