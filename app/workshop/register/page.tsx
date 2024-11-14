'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from '@/components/ui/header'
import { BookOpenIcon, XCircle } from 'lucide-react'

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

export default function ClosedWorkshopRegistration() {
  return (
    <div className="bg-gradient-to-b from-[#0B0B3B] via-[#1E0B3B] to-[#0B0B3B] min-h-screen text-gray-100 font-sans overflow-x-hidden py-20 px-4">
      <Header />
      <div className="max-w-4xl mx-auto mb-12 pt-12">
        <FloatingIcon className="hidden md:block" icon={BookOpenIcon} />
        <h1 className="text-3xl font-bold text-[#FFD700] mb-2 text-center">Workshop Registration</h1>
        <p className="text-lg mb-6 text-center">We're sorry, but registration is currently closed.</p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1E0B3B] p-8 rounded-lg shadow-lg"
        >
          <div className="flex flex-col items-center space-y-6">
            <XCircle className="text-[#FFD700] w-24 h-24" />
            <h2 className="text-2xl font-bold text-[#FFD700]">Registration Closed</h2>
            <div className="w-full max-w-md space-y-2">
              <p className="text-center text-gray-300">
                Follow our Instagram account for the latest news and announcements.
              </p>
              <Button 
                className="w-full bg-[#FFD700] text-[#0B0B3B] hover:bg-[#FFA500] transition-all duration-300"
                onClick={() => window.open('https://www.instagram.com/interfest_if', '_blank')}
              >
                Follow on Instagram
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}