'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WandIcon, ShieldIcon, CodeIcon, GlobeIcon, SparklesIcon, StarIcon, DownloadIcon } from "lucide-react"
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
    <SparklesIcon className="text-[#FFD700] w-4 h-4" />
  </motion.div>
)

export default function OpenCompetitionsPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const competitions = [
    {
      icon: CodeIcon,
      title: "Competitive Programming",
      description: "Test your algorithmic skills and problem-solving abilities in this intense coding challenge.",
      details: "Competitive Programming merupakan kompetisi pemecahan masalah yang menguji kemampuan peserta dalam menyelesaikan masalah algoritma menggunakan bahasa pemrograman tertentu. Peserta ditantang untuk memecahkan berbagai soal dengan tingkat kesulitan yang bervariasi dalam waktu yang terbatas, serta menemukan solusi yang paling optimal dan efisien."
    },
    {
      icon: ShieldIcon,
      title: "Capture The Flag",
      description: "Dive into the world of cybersecurity and test your hacking skills in this thrilling challenge.",
      details: "Capture The Flag Interfest adalah kompetisi keamanan siber yang mengasah keterampilan peserta dalam analisis keamanan jaringan, pemrograman, dan pengujian penetrasi. Peserta berusaha menemukan dan mengeksploitasi kerentanan dalam sistem atau aplikasi untuk menemukan 'flag' tersembunyi. Kompetisi akan dilaksanakan dengan format jeopardy-style yang menggabungkan beberapa stream seperti Binary Exploitation, Web Exploit, Reverse Engineering, Forensics, dan lain-lain."
    },
    {
      icon: GlobeIcon,
      title: "Web Design",
      description: "Showcase your creativity and technical skills in designing innovative web solutions.",
      details: "Web Design Competition merupakan kompetisi merancang desain visual yang ditampilkan di media digital, yaitu situs web. Kompetisi ini bertujuan untuk membuat atau menyampaikan informasi secara cepat dan realtime. Tema untuk kompetisi Web Design tahun ini adalah SDGS (Sustainable Development Goals)."
    },
  ]

  return (
    <div className="bg-gradient-to-b from-[#0B0B3B] via-[#1E0B3B] to-[#0B0B3B] text-white min-h-screen font-sans overflow-x-hidden">
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
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
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
                <StarIcon className="text-[#FFD700] w-2 h-2" />
              </motion.div>
            ))}
          </motion.div>
          <FloatingIcon icon={WandIcon} className="mb-8" />
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-transparent bg-clip-text">
              Open Competitions
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-center max-w-2xl mb-6 md:mb-8 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Unleash your magical talents in our enchanting challenges
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link className="z-20" href="/register">
                <Button size="lg" className="text-lg bg-[#FFD700] text-[#0B0B3B] hover:bg-[#FFA500]">
                  Begin Your Magical Journey
                </Button>
            </Link>
            <Link className="z-20" href="https://drive.google.com/drive/folders/1ge31AkJ7r2tfbNIDoC10AW--Pa-CfTDj?usp=sharing" target='_blank'>
                <Button size="lg" className="text-lg bg-[#0B0B3B] text-[#FFD700] border-2 border-[#FFD700] hover:bg-[#1E0B3B]">
                  <DownloadIcon className="mr-2 h-5 w-5" />
                  Download Guidebook
                </Button>
            </Link>
          </motion.div>
        </section>

        <section id="competitions" className="py-12 md:py-24 p-4 md:p-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid gap-12 md:gap-16 relative z-10">
            {competitions.map((comp, index) => (
              <motion.div
                key={comp.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[#2D1B4E] to-[#1E0B3B] border-[#FFD700] border-2">
                  <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <comp.icon className="h-12 w-12 text-[#FFD700]" />
                    <div>
                      <CardTitle className="text-2xl md:text-3xl text-[#FFD700] mb-2">{comp.title}</CardTitle>
                      <p className="text-lg text-white mb-4">{comp.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">{comp.details}</p>
                    <Link href="/register">
                        <Button className="mt-6 bg-[#FFD700] text-[#0B0B3B] hover:bg-[#FFA500] transition-all duration-300">
                          Join the {comp.title} Quest
                        </Button>
                    </Link>
                  </CardContent>
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
              Join the Magic of INTERFEST 2024
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Be part of this extraordinary event that celebrates creativity, innovation, and excellence in the field of informatics. INTERFEST 2024 combines exciting competitions, workshops, and collaborative opportunities for students and professionals in the world of information technology.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
            <Link href="/register">
                <Button size="lg" className="text-lg bg-[#FFD700] text-[#0B0B3B] hover:bg-[#FFA500] transition-all duration-300">
                  Embark on Your INTERFEST 2024 Adventure
                </Button>
            </Link>
            </motion.div>
          </div>
          {[...Array(20)].map((_, i) => (
            <MagicSparkle key={i} delay={i * 0.1} />
          ))}
        </section>
      </main>

      <footer className="bg-[#1E0B3B] text-white py-6 md:py-8 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center relative z-10">
          <div className="mb-4 sm:mb-0">
            <WandIcon className="h-8 w-8 mb-2 text-[#FFD700]" />
            <p className="text-sm">© 2024 Interfest.   All rights reserved.</p>
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