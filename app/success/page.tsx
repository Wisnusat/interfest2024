'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon, CheckCircleIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'
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

export default function SuccessPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="bg-gradient-to-b from-[#0B0B3B] via-[#1E0B3B] to-[#0B0B3B] min-h-screen text-gray-100 font-sans overflow-x-hidden py-20 px-4">
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
      
      <Header />

      <div className="max-w-4xl mx-auto pt-20 pb-12 text-center">
        <FloatingIcon icon={CheckCircleIcon} className="mb-8" />
        <motion.h1 
          className="text-4xl font-bold text-[#FFD700] mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Registration Spell Cast Successfully!
        </motion.h1>
        <motion.div
          className="bg-[#2D1B4E] p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl mb-4">Congratulations, Your application for INTERFEST 2024 has been received!</p>
          <p className="text-lg mb-6">Our Grand Wizard of Admissions is now reviewing your magical credentials.</p>
          <p className="text-md">We'll send an email when the mystical review process is complete.</p>
          <div className="mt-8">
            <p className="text-sm text-[#FFD700]">Prepare yourself for an extraordinary quest through the realms of technology and innovation!</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <Link href="/" className="inline-flex items-center px-6 py-3 text-lg font-semibold text-[#0B0B3B] bg-[#FFD700] rounded-full hover:bg-[#FFA500] transition-colors duration-300">
            <HomeIcon className="w-5 h-5 mr-2" />
            Return to the Magical Realm
          </Link>
        </motion.div>
      </div>

      {[...Array(20)].map((_, i) => (
        <MagicSparkle key={i} delay={i * 0.1} />
      ))}
    </div>
  )
}