'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { WandIcon, UserIcon, UsersIcon, FileTextIcon, CheckIcon, SparklesIcon, StarIcon, ShareIcon } from "lucide-react"
import Header from '@/components/ui/header'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/hooks/use-toast'

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
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [loading, setLoading] = useState(false);
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const [formData, setFormData] = useState<any>({
    teamName: '',
    leaderName: '',
    competition: '',
    member1Name: '',
    member1Email: '',
    member1Whatsapp: '',
    member1NIM: '',
    member1Semester: '',
    member1Institution: '',
    member1Faculty: '',
    member1Program: '',
    member1CV: null,
    member1KSM: null,
    member1Photo: null,
    member1KTM: null,
    member2Name: '',
    member2Email: '',
    member2Whatsapp: '',
    member2NIM: '',
    member2Semester: '',
    member2Institution: '',
    member2Faculty: '',
    member2Program: '',
    member2CV: null,
    member2KSM: null,
    member2Photo: null,
    member2KTM: null,
    member3Name: '',
    member3Email: '',
    member3Whatsapp: '',
    member3NIM: '',
    member3Semester: '',
    member3Institution: '',
    member3Faculty: '',
    member3Program: '',
    member3CV: null,
    member3KSM: null,
    member3Photo: null,
    member3KTM: null,
    paymentEvident: null,
    socialMediaEvident: null,
    socialMediaLink1: '',
    socialMediaLink2: '',
    socialMediaLink3: '',
    agreeTerms: false,
    linkUpTwibbonAnggota1: '',
    linkUpTwibbonAnggota2: '',
    linkUpTwibbonAnggota3: '',
    ssShareKe3GroupAnggota1: null,
    ssShareKe3GroupAnggota2: null,
    ssShareKe3GroupAnggota3: null
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files) {
      setFormData((prev: any) => ({ ...prev, [name]: files[0] }))
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Prepare to upload files and get their URLs
    const fileFields = [
      'member1CV', 'member1KSM', 'member1Photo', 'member1KTM',
      'member2CV', 'member2KSM', 'member2Photo', 'member2KTM',
      'member3CV', 'member3KSM', 'member3Photo', 'member3KTM',
      'paymentEvident', 'ssShareKe3GroupAnggota1', 'ssShareKe3GroupAnggota2', 'ssShareKe3GroupAnggota3'
    ];

    // Create a copy of the current formData to update with URLs
    const updatedFormData = { ...formData };

    // Upload files and update formData with URLs
    for (const field of fileFields) {
      if (formData[field]) {
        const fileData = new FormData();
        fileData.append('file', formData[field]);

        // console.log(formData[field]);
        // Upload the file to Google Drive (or your server)
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: fileData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          updatedFormData[field] = uploadResult.viewLink; // Assuming the response contains the file URL
          console.log('success upload file')
        } else {
            toast({
                title: `Error uploading ${field}`,
                description: uploadResponse.statusText || "",
            })
        }
      }
    }

    // Now, updatedFormData contains the URLs for the uploaded files
    // You can send the updated form data to your Google Apps Script
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SHEET_URL || '', {
        method: 'POST',
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(updatedFormData), // Use FormData directly
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      router.push("/success")
      // Handle success message here, e.g., show a success notification or redirect
    } catch (error: any) {
        toast({
            title: "Error submit form",
            description: error?.message || "",
        })
    } finally {
        setLoading(false); // Step 3: Set loading to false after processing
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="teamName">Nama Tim</Label>
              <Input id="teamName" name="teamName" value={formData.teamName} onChange={handleInputChange} required className="bg-[#2D1B4E] border-[#FFD700] text-gray-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leaderName">Nama Ketua Tim</Label>
              <Input id="leaderName" name="leaderName" value={formData.leaderName} onChange={handleInputChange} required className="bg-[#2D1B4E] border-[#FFD700] text-gray-100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="competition">Lomba Yang Diikuti</Label>
              <Select name="competition" onValueChange={(value) => setFormData((prev: any) => ({ ...prev, competition: value }))} required>
                <SelectTrigger className="bg-[#2D1B4E] border-[#FFD700] text-gray-100">
                  <SelectValue placeholder="Select competition" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
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
                <div className="space-y-2">
                  <Label htmlFor={`${member}Name`}>Nama Anggota</Label>
                  <Input 
                    id={`${member}Name`} 
                    name={`${member}Name`} 
                    value={formData[`${member}Name`]} 
                    onChange={handleInputChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor={`${member}Email`}>Email Aktif</Label>
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
                <div className="space-y-2 mt-4">
                  <Label htmlFor={`${member}Whatsapp`}>Nomor Telepon</Label>
                  <Input 
                    id={`${member}Whatsapp`} 
                    name={`${member}Whatsapp`} 
                    value={formData[`${member}Whatsapp`]} 
                    onChange={handleInputChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor={`${member}NIM`}>NIM</Label>
                  <Input 
                    id={`${member}NIM`} 
                    name={`${member}NIM`} 
                    value={formData[`${member}NIM`]} 
                    onChange={handleInputChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label>Semester</Label>
                  <RadioGroup
                    name={`${member}Semester`}
                    value={formData[`${member}Semester`]}
                    onValueChange={(value) => setFormData((prev: any) => ({ ...prev, [`${member}Semester`]: value }))}
                    className="flex space-x-2"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <div key={sem} className="flex items-center space-x-2">
                        <RadioGroupItem value={sem.toString()} id={`${member}Semester${sem}`} />
                        <Label htmlFor={`${member}Semester${sem}`}>{sem}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor={`${member}Institution`}>Asal Institusi</Label>
                  <Input 
                    id={`${member}Institution`} 
                    name={`${member}Institution`} 
                    value={formData[`${member}Institution`]} 
                    onChange={handleInputChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor={`${member}Faculty`}>Fakultas</Label>
                  <Input 
                    id={`${member}Faculty`} 
                    name={`${member}Faculty`} 
                    value={formData[`${member}Faculty`]} 
                    onChange={handleInputChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor={`${member}Program`}>Program Studi</Label>
                  <Input 
                    id={`${member}Program`} 
                    name={`${member}Program`} 
                    value={formData[`${member}Program`]} 
                    onChange={handleInputChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor={`${member}CV`}>CV</Label>
                  <Input 
                    id={`${member}CV`} 
                    name={`${member}CV`} 
                    type="file" 
                    onChange={handleFileChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor={`${member}KSM`}>KSM</Label>
                  <Input 
                    id={`${member}KSM`} 
                    name={`${member}KSM`} 
                    type="file" 
                    onChange={handleFileChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor={`${member}Photo`}>Pas Foto</Label>
                
                  <Input 
                    id={`${member}Photo`} 
                    name={`${member}Photo`} 
                    type="file" 
                    onChange={handleFileChange} 
                    required={index === 0} 
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor={`${member}KTM`}>KTM</Label>
                  <Input 
                    id={`${member}KTM`} 
                    name={`${member}KTM`} 
                    type="file" 
                    onChange={handleFileChange} 
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
          <div className="space-y-2">
            <Label htmlFor="paymentEvident">Upload Payment Evidence</Label>
            <Input id="paymentEvident" name="paymentEvident" type="file" onChange={handleFileChange} required className="bg-[#2D1B4E] border-[#FFD700] text-gray-100" />
          </div>
        )
      case 3:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="linkUpTwibbonAnggota1">Link up twibbon anggota 1</Label>
              <Input 
                id="linkUpTwibbonAnggota1" 
                name="linkUpTwibbonAnggota1" 
                value={formData.linkUpTwibbonAnggota1} 
                onChange={handleInputChange} 
                required 
                className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkUpTwibbonAnggota2">Link up twibbon anggota 2</Label>
              <Input 
                id="linkUpTwibbonAnggota2" 
                name="linkUpTwibbonAnggota2" 
                value={formData.linkUpTwibbonAnggota2} 
                onChange={handleInputChange} 
                required 
                className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkUpTwibbonAnggota3">Link up twibbon anggota 3</Label>
              <Input 
                id="linkUpTwibbonAnggota3" 
                name="linkUpTwibbonAnggota3" 
                value={formData.linkUpTwibbonAnggota3} 
                onChange={handleInputChange} 
                required 
                className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ssShareKe3GroupAnggota1">SS SHARE KE 3 GROUP ANGGOTA 1</Label>
              <Input 
                id="ssShareKe3GroupAnggota1" 
                name="ssShareKe3GroupAnggota1" 
                type="file" 
                onChange={handleFileChange} 
                required 
                className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ssShareKe3GroupAnggota2">SS SHARE KE 3 GROUP ANGGOTA 2</Label>
              <Input 
                id="ssShareKe3GroupAnggota2" 
                name="ssShareKe3GroupAnggota2" 
                type="file" 
                onChange={handleFileChange} 
                required 
                className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ssShareKe3GroupAnggota3">SS SHARE KE 3 GROUP ANGGOTA 3</Label>
              <Input 
                id="ssShareKe3GroupAnggota3" 
                name="ssShareKe3GroupAnggota3" 
                type="file" 
                onChange={handleFileChange} 
                required 
                className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
              />
            </div>
          </>
        )
      case 4:
        return (
          <>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-[#FFD700]">Please review your information:</h3>
              <p>Team Name: {formData.teamName}</p>
              <p>Team Leader: {formData.leaderName}</p>
              <p>Competition: {formData.competition}</p>
              <p>Payment Evidence: {formData.paymentEvident ? formData.paymentEvident.name : 'Not uploaded'}</p>
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
                disabled={!formData.agreeTerms || loading}
              >
                {loading ? (
                  <span className="loader"></span> // Step 4: Show loader
                ) : (
                  'Submit Registration'
                )}
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