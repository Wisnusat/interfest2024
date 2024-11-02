'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/ui/header'

const SuccessPage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="bg-gradient-to-b from-[#0B0B3B] via-[#1E0B3B] to-[#0B0B3B] min-h-screen text-gray-100 font-sans overflow-hidden py-20 px-4">
      {/* Cursor Animation */}
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

      <div className="max-w-3xl mx-auto pt-16 text-center space-y-6">
        {/* Success Icon */}
        <motion.div
          className="mb-8 text-[#FFD700]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <CheckCircleIcon className="w-16 h-16 mx-auto" />
        </motion.div>

        {/* Success Title */}
        <motion.h1 
          className="text-4xl font-bold text-[#FFD700]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Registration Successful!
        </motion.h1>

        {/* Success Message */}
        <motion.div
          className="bg-[#2D1B4E] p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl mb-2 font-medium">Congratulations, your application for INTERFEST 2024 has been received!</p>
          <p className="text-lg mb-4">Our admissions team is now reviewing your magical credentials.</p>
          <p className="text-sm text-gray-400 mb-2">We'll notify you via email once the review process is complete.</p>
          <p className="text-sm text-[#FFD700] font-medium">
            Prepare yourself for an extraordinary journey through the realms of technology and innovation!
          </p>
        </motion.div>

        {/* Return Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6"
        >
          <Link href="/" className="inline-flex items-center px-6 py-3 text-lg font-semibold text-[#0B0B3B] bg-[#FFD700] rounded-full hover:bg-[#FFA500] transition duration-300">
            <HomeIcon className="w-5 h-5 mr-2" />
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default SuccessPage
