'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WandIcon, UserIcon, UsersIcon, FileTextIcon, CheckIcon, SparklesIcon, StarIcon, ShareIcon } from "lucide-react"
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

const StepIcon = ({ icon: Icon, isActive, isCompleted }: any) => (
  <div className={`rounded-full p-2 ${isActive ? 'bg-[#FFD700]' : isCompleted ? 'bg-[#FFA500]' : 'bg-[#2D1B4E]'}`}>
    <Icon className={`w-6 h-6 ${isActive || isCompleted ? 'text-[#0B0B3B]' : 'text-[#FFD700]'}`} />
  </div>
)

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const [formData, setFormData] = useState<any>({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderWhatsapp: '',
    competition: '',
    member1Name: '',
    member1Email: '',
    member1Whatsapp: '',
    member2Name: '',
    member2Email: '',
    member2Whatsapp: '',
    member3Name: '',
    member3Email: '',
    member3Whatsapp: '',
    paymentEvident: null,
    socialMediaEvident: null,
    agreeTerms: false
  })

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const steps = [
    { title: "Team Info", icon: UserIcon },
    { title: "Members", icon: UsersIcon },
    { title: "Payment", icon: FileTextIcon },
    { title: "Social Media", icon: ShareIcon },
    { title: "Confirmation", icon: CheckIcon }
  ]

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: any) => {
    const { name, files } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: files[0] }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your server
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="space-y-4">
              <Label htmlFor="teamName">Team Name</Label>
              <Input id="teamName" name="teamName" value={formData.teamName} onChange={handleInputChange} required className="bg-[#2D1B4E] border-[#FFD700] text-gray-100" />
            </div>
            <div className="space-y-4">
              <Label htmlFor="leaderName">Team Leader Name</Label>
              <Input id="leaderName" name="leaderName" value={formData.leaderName} onChange={handleInputChange} required className="bg-[#2D1B4E] border-[#FFD700] text-gray-100" />
            </div>
            <div className="space-y-4">
              <Label htmlFor="leaderEmail">Team Leader Email</Label>
              <Input id="leaderEmail" name="leaderEmail" type="email" value={formData.leaderEmail} onChange={handleInputChange} required className="bg-[#2D1B4E] border-[#FFD700] text-gray-100" />
            </div>
            <div className="space-y-4">
              <Label htmlFor="leaderWhatsapp">Team Leader WhatsApp</Label>
              <Input id="leaderWhatsapp" name="leaderWhatsapp" value={formData.leaderWhatsapp} onChange={handleInputChange} required className="bg-[#2D1B4E] border-[#FFD700] text-gray-100" />
            </div>
            <div className="space-y-4">
              <Label htmlFor="competition">Competition</Label>
              <Select name="competition" onValueChange={(value) => setFormData((prev: any) => ({ ...prev, competition: value }))} required>
                <SelectTrigger className="bg-[#1E0B3B] border-[#FFD700] text-gray-100">
                  <SelectValue placeholder="Select competition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="competitive-programming">Competitive Programming</SelectItem>
                  <SelectItem value="capture-the-flag">Capture The Flag</SelectItem>
                  <SelectItem value="web-design">Web Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case 1:
        return (
          <Tabs defaultValue="member1" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#2D1B4E]">
              <TabsTrigger value="member1" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#0B0B3B]">Member 1</TabsTrigger>
              <TabsTrigger value="member2" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#0B0B3B]">Member 2</TabsTrigger>
              <TabsTrigger value="member3" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#0B0B3B]">Member 3</TabsTrigger>
            </TabsList>
            {['member1', 'member2', 'member3'].map((member, index) => (
              <TabsContent key={member} value={member}>
                <div className="space-y-4">
                  <Label htmlFor={`${member}Name`}>Name</Label>
                  <Input 
                    id={`${member}Name`} 
                    name={`${member}Name`} 
                    value={formData[`${member}Name`]} 
                    onChange={handleInputChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor={`${member}Email`}>Email</Label>
                  <Input 
                    id={`${member}Email`} 
                    name={`${member}Email`} 
                    type="email" 
                    value={formData[`${member}Email`]} 
                    onChange={handleInputChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor={`${member}Whatsapp`}>WhatsApp Number</Label>
                  <Input 
                    id={`${member}Whatsapp`} 
                    name={`${member}Whatsapp`} 
                    value={formData[`${member}Whatsapp`]} 
                    onChange={handleInputChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="paymentEvident">Upload Payment Evidence</Label>
            <Input id="paymentEvident" name="paymentEvident" type="file" onChange={handleFileChange} required className="bg-[#2D1B4E] border-[#FFD700] text-gray-100" />
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="socialMediaEvident">Upload Social Media Follow Evidence</Label>
            <Input id="socialMediaEvident" name="socialMediaEvident" type="file" onChange={handleFileChange} required className="bg-[#2D1B4E] border-[#FFD700] text-gray-100" />
          </div>
        )
      case 4:
        return (
          <>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#FFD700]">Please review your information:</h3>
              <p>Team Name: {formData.teamName}</p>
              <p>Team Leader: {formData.leaderName}</p>
              <p>Competition: {formData.competition}</p>
              <p>Payment Evidence: {formData.paymentEvident ? formData.paymentEvident.name : 'Not uploaded'}</p>
              <p>Social Media Evidence: {formData.socialMediaEvident ? formData.socialMediaEvident.name : 'Not uploaded'}</p>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox 
                id="agreeTerms" 
                checked={formData.agreeTerms} 
                onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, agreeTerms: checked }))} 
                required 
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-100">
                I agree to the terms and conditions
              </label>
            </div>
          </>
        )
      default:
        return null
    }
  }

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
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#FFD700] transform-origin-0" style={{ scaleX }} />
      
      <Header />

      <div className="max-w-4xl mx-auto pt-20 pb-12">
        <FloatingIcon icon={WandIcon} className="mb-8" />
        <h1 className="text-3xl font-bold text-[#FFD700] mb-2 text-center">Register for INTERFEST 2024</h1>
        <p className="text-lg mb-6 text-center">Join us in this magical adventure of technology and innovation!</p>
        <div className="flex justify-between items-center relative mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center z-10">
              <StepIcon 
                icon={step.icon} 
                isActive={currentStep === index}
                isCompleted={currentStep > index}
              />
              <p className={`mt-2 text-sm ${currentStep === index ? 'text-[#FFD700]' : 'text-gray-300'}`}>{step.title}</p>
            </div>
          ))}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-[#2D1B4E] -translate-y-1/2 z-0">
            <motion.div 
              className="h-full bg-[#FFD700]"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {renderStepContent()}
          <div className="flex justify-between mt-6">
            <Button 
              type="button" 
              onClick={handlePrev} 
              disabled={currentStep === 0}
              className="bg-[#2D1B4E] text-[#FFD700] hover:bg-[#1E0B3B] transition-all duration-300"
            >
              Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button 
                type="submit" 
                className="bg-[#FFD700] text-[#0B0B3B] hover:bg-[#FFA500] transition-all duration-300"
                disabled={!formData.agreeTerms}
              >
                Submit Registration
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={handleNext}
                className="bg-[#FFD700] text-[#0B0B3B] hover:bg-[#FFA500] transition-all duration-300"
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </div>
      {[...Array(20)].map((_, i) => (
        <MagicSparkle key={i} delay={i * 0.1} />
      ))}
    </div>
  )
}