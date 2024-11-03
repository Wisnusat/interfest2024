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
import { WandIcon, UserIcon, UsersIcon, FileTextIcon, CheckIcon, SparklesIcon, StarIcon, ShareIcon, CopyIcon, ChevronDownIcon, ChevronUpIcon, Edit2Icon } from "lucide-react"
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
  const [formErrors, setFormErrors] = useState<any>({});

  const currentDate = new Date();
  const batch1StartDate = new Date('2024-10-14T00:00:00');
  const batch1EndDate = new Date('2024-11-02T23:59:59'); // End of day for Batch 1
  const batch2StartDate = new Date('2024-11-03T00:00:00'); // Start of Batch 2
  const batch2EndDate = new Date('2024-11-21T23:59:59'); // End of day for Batch 2
  const [batch1Countdown, setBatch1Countdown] = useState('');
  const [batch2Countdown, setBatch2Countdown] = useState('');
  const calculateTimeLeft = (endDate:any) => {
    const difference = endDate.getTime() - new Date().getTime(); // use current time at each call
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    return 'Time is up';
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setBatch1Countdown(calculateTimeLeft(batch1EndDate));
      setBatch2Countdown(calculateTimeLeft(batch2EndDate));
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);
  const batch1Active = currentDate >= batch1StartDate && currentDate <= batch1EndDate;
  const batch2Active = currentDate >= batch2StartDate && currentDate <= batch2EndDate;

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
  const [isCopied, setIsCopied] = useState(false);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText('901556823268');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset copied status after 2 seconds
  };

  const [expandedMember, setExpandedMember] = useState(null);

  const toggleMemberDetails = (index: any) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

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
    if (formErrors[name]) {
      setFormErrors((prevErrors: any) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files) {
      setFormData((prev: any) => ({ ...prev, [name]: files[0] }))
      if (formErrors[name]) {
        setFormErrors((prevErrors: any) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  }

  const handleNext = () => {
    if (validateFields()) {
      if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const validateFields = () => {
    let errors: any = {};

    // Regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regular expression for validating URL
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    // Regular expression to check for numeric values only
    const numberOnlyRegex = /^\d+$/;

    if (currentStep === 0) {
      // Team Name Validation
      if (!formData.teamName.trim()) {
        errors.teamName = "Team name is required.";
      } else if (formData.teamName.length > 30) {
        errors.teamName = "Team name must be 30 characters or less.";
      }      

      // Leader Name Validation
      if (!formData.leaderName.trim()) {
        errors.leaderName = "Leader name is required.";
      }

      // Competition Validation
      if (!formData.competition.trim()) {
        errors.competition = "Competition field is required.";
      }
    }

    if (currentStep === 1) {
      // Member 1 Validations
      if (!formData.member1Name.trim()) {
        errors.member1Name = "Member 1 name is required.";
      }

      if (!formData.member1Email.trim()) {
        errors.member1Email = "Member 1 email is required.";
      } else if (!emailRegex.test(formData.member1Email)) {
        errors.member1Email = "Invalid email format.";
      }

      if (!formData.member1Whatsapp.trim()) {
        errors.member1Whatsapp = "Member 1 Whatsapp number is required.";
      } else if (!numberOnlyRegex.test(formData.member1Whatsapp)) {
        errors.member1Whatsapp = "Phone number must contain only numbers.";
      }

      if (!formData.member1NIM.trim()) {
        errors.member1NIM = "Member 1 NIM is required.";
      } else if (!numberOnlyRegex.test(formData.member1NIM)) {
        errors.member1NIM = "NIM must contain only numbers.";
      }

      if (!formData.member1Semester.trim()) {
        errors.member1Semester = "Member 1 semester is required.";
      }

      if (!formData.member1Institution.trim()) {
        errors.member1Institution = "Member 1 institution is required.";
      }

      if (!formData.member1Faculty.trim()) {
        errors.member1Faculty = "Member 1 faculty is required.";
      }

      if (!formData.member1Program.trim()) {
        errors.member1Program = "Member 1 program is required.";
      }

      if (!formData.member1KSM) {
        errors.member1KSM = "Member 1 KSM is required.";
      } else if (!urlRegex.test(formData.member1KSM)) {
        errors.member1KSM = "Invalid URL KSM format.";
      }

      if (!formData.member1Photo) {
        errors.member1Photo = "Member 1 photo is required.";
      } else if (!urlRegex.test(formData.member1Photo)) {
        errors.member1Photo = "Invalid URL Photo format.";
      }

      if (!formData.member1KTM) {
        errors.member1KTM = "Member 1 KTM is required.";
      } else if (!urlRegex.test(formData.member1KTM)) {
        errors.member1KTM = "Invalid URL KTM format.";
      }
    }

    if (currentStep === 2) {
      // Payment Evidence Validation
      if (!formData.paymentEvident) {
        errors.paymentEvident = "Payment evidence is required.";
      } else if (!urlRegex.test(formData.paymentEvident)) {
        errors.paymentEvident = "Invalid URL Payment Evidence format.";
      }
    }

    if (currentStep === 3) {
      // Social Media Link Validation for URLs
      if (!formData.linkUpTwibbonAnggota1.trim()) {
        errors.linkUpTwibbonAnggota1 = "This field is required.";
      } else if (!urlRegex.test(formData.linkUpTwibbonAnggota1)) {
        errors.linkUpTwibbonAnggota1 = "Invalid URL format.";
      }

      if (!formData.linkUpTwibbonAnggota2.trim()) {
        errors.linkUpTwibbonAnggota2 = "This field is required.";
      } else if (!urlRegex.test(formData.linkUpTwibbonAnggota2)) {
        errors.linkUpTwibbonAnggota2 = "Invalid URL format.";
      }

      if (!formData.linkUpTwibbonAnggota3.trim()) {
        errors.linkUpTwibbonAnggota3 = "This field is required.";
      } else if (!urlRegex.test(formData.linkUpTwibbonAnggota3)) {
        errors.linkUpTwibbonAnggota3 = "Invalid URL format.";
      }

      if (!formData.ssShareKe3GroupAnggota1) {
        errors.ssShareKe3GroupAnggota1 = "This field is required.";
      } else if (!urlRegex.test(formData.ssShareKe3GroupAnggota1)) {
        errors.ssShareKe3GroupAnggota1 = "Invalid URL format.";
      }
    }

    // Set errors and return validation result
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    toast({
      title: "Casting the spell of submission...",
      description: "Please hold while the magic takes effect!"
    })
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
    // const updatedFormData = { ...formData };

    // // Upload files and update formData with URLs
    // for (const field of fileFields) {
    //   if (formData[field]) {
    //     const fileData = new FormData();
    //     fileData.append('file', formData[field]);

    //     let uploadResponse;
    //     let attempts = 0;
    //     const maxAttempts = 3; // Set the maximum number of retry attempts

    //     // Retry logic with exponential backoff
    //     while (attempts < maxAttempts) {
    //       uploadResponse = await fetch('/api/upload', {
    //         method: 'POST',
    //         body: fileData,
    //       });

    //       if (uploadResponse.ok) {
    //         const uploadResult = await uploadResponse.json();
    //         updatedFormData[field] = uploadResult.viewLink; // Assuming the response contains the file URL
    //         console.log('success upload file');
    //         break; // Exit the retry loop on success
    //       } else {
    //         attempts++;
    //         if (attempts < maxAttempts) {
    //           const delay = Math.pow(2, attempts) * 100; // Exponential backoff
    //           await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
    //         } else {
    //           toast({
    //             title: `Error uploading ${field}`,
    //             description: uploadResponse.statusText || "",
    //           });
    //         }
    //       }
    //     }
    //   }
    // } 

    // You can send the updated form data to your Google Apps Script
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SHEET_URL || '', {
        method: 'POST',
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(formData), // Use FormData directly
        // body: JSON.stringify(updatedFormData), // Use FormData directly
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log('succcess register', formData);
      // console.log('succcess register', updatedFormData);
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
            {/* Team Information Divider */}
            {/* <div className="flex items-center my-6 mt-10">
              <div className="flex-grow border-t border-[#FFD700]"></div>
              <span className="mx-4 text-[#FFD700] font-bold">Team Information</span>
              <div className="flex-grow border-t border-[#FFD700]"></div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold" htmlFor="teamName">Nama Tim</Label>
                <Input
                  id="teamName"
                  name="teamName"
                  placeholder="Enter Team Name"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.teamName && <span className="text-red-500">{formErrors.teamName}</span>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold" htmlFor="leaderName">Nama Ketua Tim</Label>
                <Input
                  id="leaderName"
                  name="leaderName"
                  placeholder="Enter Team Leader"
                  value={formData.leaderName}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.leaderName && <span className="text-red-500">{formErrors.leaderName}</span>}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold" htmlFor="competition">Lomba Yang Diikuti</Label>
                <Select
                  name="competition"
                  onValueChange={(value) => {
                    setFormData((prev: any) => ({ ...prev, competition: value }));
                    if (formErrors['competition']) {
                      setFormErrors((prevErrors: any) => {
                        const newErrors = { ...prevErrors };
                        delete newErrors['competition'];
                        return newErrors;
                      });
                    }
                  }}
                  required
                >
                  <SelectTrigger className="bg-[#2D1B4E] border-[#FFD700] text-gray-100">
                    <SelectValue placeholder="Select competition" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="competitive-programming">Competitive Programming</SelectItem>
                    <SelectItem value="capture-the-flag">Capture The Flag</SelectItem>
                    <SelectItem value="web-design">Web Design</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.competition && <span className="text-red-500">{formErrors.competition}</span>}
              </div>
            </div>
            {/* <div className="space-y-2">
              <Label className="text-sm font-bold" htmlFor="competition">Lomba Yang Diikuti</Label>

              <div className="flex space-x-4">
                {['competitive-programming', 'capture-the-flag', 'web-design'].map((competition) => (
                  <button
                    key={competition}
                    type="button"
                    onClick={() => {
                      setFormData((prev: any) => ({ ...prev, competition }));
                      if (formErrors['competition']) {
                        setFormErrors((prevErrors: any) => {
                          const newErrors = { ...prevErrors };
                          delete newErrors['competition'];
                          return newErrors;
                        });
                      }
                    }}
                    className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${formData.competition === competition
                      ? 'bg-[#FFD700] text-[#0B0B3B]'
                      : 'bg-[#2D1B4E] text-gray-100 hover:bg-[#FFD700] hover:text-[#0B0B3B]'
                      }`}
                  >
                    {competition === 'competitive-programming' && 'Competitive Programming'}
                    {competition === 'capture-the-flag' && 'Capture The Flag'}
                    {competition === 'web-design' && 'Web Design'}
                  </button>
                ))}
              </div>

              {formErrors.competition && <span className="text-red-500">{formErrors.competition}</span>}
            </div> */}
          </>
        )
      case 1:
        return (
          <Tabs defaultValue="member1" className="w-full">
            <TabsList className="grid w-full h-auto grid-cols-3 bg-[#2D1B4E] rounded-lg mb-4 p-2 gap-2">
              {['member1', 'member2', 'member3'].map((member, idx) => (
                <TabsTrigger
                  key={member}
                  value={member}
                  className="p-2 rounded-md font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#0B0B3B] hover:bg-[#FFD700] hover:text-[#0B0B3B]"
                >
                  {`${idx == 0 ? "*" : ""}Member ${idx + 1}`}
                </TabsTrigger>
              ))}
            </TabsList>
            {['member1', 'member2', 'member3'].map((member, index) => (
              <TabsContent key={member} value={member}>
                {/* Personal Information Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-grow border-t border-[#FFD700]"></div>
                  <span className="mx-4 text-[#FFD700] font-bold">Personal Information</span>
                  <div className="flex-grow border-t border-[#FFD700]"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold" htmlFor={`${member}Name`}>Nama Anggota {index + 1}</Label>
                    <Input
                      id={`${member}Name`}
                      name={`${member}Name`}
                      placeholder="cth: Tiara Andini"
                      value={formData[`${member}Name`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}Name`] && <span className="text-red-500">{formErrors[`${member}Name`]}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2 mt-4">
                    <Label className="text-sm font-bold" htmlFor={`${member}Email`}>Email Aktif</Label>
                    <Input
                      id={`${member}Email`}
                      name={`${member}Email`}
                      placeholder="cth: email@gmail.com"
                      type="email"
                      value={formData[`${member}Email`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}Email`] && <span className="text-red-500">{formErrors[`${member}Email`]}</span>}
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label className="text-sm font-bold" htmlFor={`${member}Whatsapp`}>Nomor Telepon/Whatsapp</Label>
                    <Input
                      id={`${member}Whatsapp`}
                      name={`${member}Whatsapp`}
                      placeholder="cth: 08123456789"
                      value={formData[`${member}Whatsapp`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}Whatsapp`] && <span className="text-red-500">{formErrors[`${member}Whatsapp`]}</span>}
                  </div>
                </div>

                {/* Academic Information Divider */}
                <div className="flex items-center my-6 mt-20">
                  <div className="flex-grow border-t border-[#FFD700]"></div>
                  <span className="mx-4 text-[#FFD700] font-bold">Academic Information</span>
                  <div className="flex-grow border-t border-[#FFD700]"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2 mt-4">
                    <Label className="text-sm font-bold" htmlFor={`${member}NIM`}>NIM</Label>
                    <Input
                      id={`${member}NIM`}
                      name={`${member}NIM`}
                      placeholder="Enter NIM"
                      value={formData[`${member}NIM`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}NIM`] && <span className="text-red-500">{formErrors[`${member}NIM`]}</span>}
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label className="text-sm font-bold" htmlFor={`${member}Semester`}>Semester</Label>
                  <RadioGroup
                    name={`${member}Semester`}
                    value={formData[`${member}Semester`]}
                    onValueChange={(value) => {
                      setFormData((prev: any) => ({ ...prev, [`${member}Semester`]: value }));
                      if (formErrors[`${member}Semester`]) {
                        setFormErrors((prevErrors: any) => {
                          const newErrors = { ...prevErrors };
                          delete newErrors[`${member}Semester`];
                          return newErrors;
                        });
                      }
                    }}
                    className="flex space-x-2"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <div key={sem} className="flex items-center space-x-2">
                        <RadioGroupItem value={sem.toString()} id={`${member}Semester${sem}`} />
                        <Label className="text-sm font-bold" htmlFor={`${member}Semester${sem}`}>{sem}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {formErrors[`${member}Semester`] && <span className="text-red-500">{formErrors[`${member}Semester`]}</span>}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2 mt-4">
                    <Label className="text-sm font-bold" htmlFor={`${member}Institution`}>Asal Institusi</Label>
                    <Input
                      id={`${member}Institution`}
                      name={`${member}Institution`}
                      placeholder="Enter institution"
                      value={formData[`${member}Institution`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}Institution`] && <span className="text-red-500">{formErrors[`${member}Institution`]}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2 mt-4">
                    <Label className="text-sm font-bold" htmlFor={`${member}Faculty`}>Fakultas</Label>
                    <Input
                      id={`${member}Faculty`}
                      name={`${member}Faculty`}
                      placeholder="Enter faculty"
                      value={formData[`${member}Faculty`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}Faculty`] && <span className="text-red-500">{formErrors[`${member}Faculty`]}</span>}
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label className="text-sm font-bold" htmlFor={`${member}Program`}>Program Studi</Label>
                    <Input
                      id={`${member}Program`}
                      name={`${member}Program`}
                      placeholder="Enter program of study"
                      value={formData[`${member}Program`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}Program`] && <span className="text-red-500">{formErrors[`${member}Program`]}</span>}
                  </div>
                </div>

                {/* Document Links Divider */}
                <div className="flex items-center my-6 mt-20">
                  <div className="flex-grow border-t border-[#FFD700]"></div>
                  <span className="mx-4 text-[#FFD700] font-bold">Document Links</span>
                  <div className="flex-grow border-t border-[#FFD700]"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* <div className="space-y-2 mt-4"> */}
                  {/* <Label className="text-sm font-bold" htmlFor={`${member}CV`}>CV</Label> */}
                  {/* <Input
                    id={`${member}CV`}
                    name={`${member}CV`}
                    type="file"
                    onChange={handleFileChange}
                    required={index === 0}
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  /> */}
                  {/* <Input
                      id={`${member}CV`}
                      name={`${member}CV`}
                      placeholder="cth: https://example.com/cv.pdf"
                      value={formData[`${member}CV`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}CV`] && <span className="text-red-500">{formErrors[`${member}CV`]}</span>} */}
                  {/* {formData[`${member}CV`] && <span className="text-gray-300">Uploaded: {formData[`${member}CV`].name}</span>} */}
                  {/* </div> */}

                  <div className="space-y-2 mt-4">
                    <Label className="text-sm font-bold" htmlFor={`${member}KSM`}>Tanda Aktif Mahasiswa</Label>
                    {/* <Input
                    id={`${member}KSM`}
                    name={`${member}KSM`}
                    type="file"
                    onChange={handleFileChange}
                    required={index === 0}
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  /> */}
                    <Input
                      id={`${member}KSM`}
                      name={`${member}KSM`}
                      placeholder="cth: https://example.com/tanda-aktif-mahasiswa.pdf"
                      value={formData[`${member}KSM`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}KSM`] && <span className="text-red-500">{formErrors[`${member}KSM`]}</span>}
                    {/* {formData[`${member}KSM`] && <span className="text-gray-300">Uploaded: {formData[`${member}KSM`].name}</span>} */}
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label className="text-sm font-bold" htmlFor={`${member}Photo`}>Pas Foto</Label>
                    {/* <Input
                    id={`${member}Photo`}
                    name={`${member}Photo`}
                    type="file"
                    onChange={handleFileChange}
                    required={index === 0}
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  /> */}
                    <Input
                      id={`${member}Photo`}
                      name={`${member}Photo`}
                      placeholder="cth: https://example.com/photo.jpg"
                      value={formData[`${member}Photo`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}Photo`] && <span className="text-red-500">{formErrors[`${member}Photo`]}</span>}
                    {/* {formData[`${member}Photo`] && <span className="text-gray-300">Uploaded: {formData[`${member}Photo`].name}</span>} */}
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label className="text-sm font-bold" htmlFor={`${member}KTM`}>KTM (Kartu Tanda Mahasiswa)</Label>
                    {/* <Input
                    id={`${member}KTM`}
                    name={`${member}KTM`}
                    type="file"
                    onChange={handleFileChange}
                    required={index === 0}
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                  /> */}
                    <Input
                      id={`${member}KTM`}
                      name={`${member}KTM`}
                      placeholder="cth: https://example.com/ktm.jpg"
                      value={formData[`${member}KTM`]}
                      onChange={handleInputChange}
                      required={index === 0}
                      className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                    />
                    {formErrors[`${member}KTM`] && <span className="text-red-500">{formErrors[`${member}KTM`]}</span>}
                    {/* {formData[`${member}KTM`] && <span className="text-gray-300">Uploaded: {formData[`${member}KTM`].name}</span>} */}
                  </div>
                </div>

              </TabsContent>
            ))}
          </Tabs>
        )
      case 2:
        // return (
        //   <>
        //     {/* Payment Divider */}
        //     {/* <div className="flex items-center my-6 mt-10">
        //       <div className="flex-grow border-t border-[#FFD700]"></div>
        //       <span className="mx-4 text-[#FFD700] font-bold">Payment Evidence</span>
        //       <div className="flex-grow border-t border-[#FFD700]"></div>
        //     </div> */}

        //     <div className="space-y-2">
        //       <Label className="text-sm font-bold" htmlFor="paymentEvident">Upload Payment Evidence</Label>
        //       {/* <Input id="paymentEvident" name="paymentEvident" type="file" onChange={handleFileChange} required className="bg-[#2D1B4E] border-[#FFD700] text-gray-100" /> */}
        //       <Input
        //         id={`paymentEvident`}
        //         name={`paymentEvident`}
        //         placeholder="cth: https://example.com/payment-evidence.jpg"
        //         value={formData.paymentEvident}
        //         onChange={handleInputChange}
        //         required
        //         className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
        //       />
        //       {formErrors.paymentEvident && <span className="text-red-500">{formErrors.paymentEvident}</span>}
        //     </div>
        //   </>
        // )
        return (
          <>
            {/* Payment Evidence Section Header */}
            <div className="flex items-center my-8">
              <div className="flex-grow border-t border-[#FFD700]"></div>
              <h3 className="mx-4 text-[#FFD700] font-semibold text-lg">Payment Evidence</h3>
              <div className="flex-grow border-t border-[#FFD700]"></div>
            </div>

            {/* Payment Transfer Instructions */}
            <div className="bg-[#1E0B3B] text-gray-100 p-4 rounded-md mb-4">
              <h4 className="font-semibold text-lg mb-2">Transfer Details</h4>
              <p>Please transfer your payment to the following account:</p>

              {/* Bank Information */}
              <div className="mt-4 flex items-center">
                <span className="font-bold">Bank Name: </span>
                <span className="ml-2">Bank Seabank</span>
                <img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOFnkSwf9r1o1QuR-QMW-ra_Gcx_0ZDtLl-rQnhXfaqDMN82MQBBR_36Tvuw8qTk_Aih5kb-9j5YUfwb5NOZYe5Aj2jx2VPi0gy1nSJBbBwtceUOPRB0rKKQ2rSFGzDhYGTM_NPOJsXDdnck3GT2kTVfCQgwdHvQFdNKE_dUT5xFIeZO-Awlbx9mNQBg/w295-h320/Sea%20Bank%20Logomark.png" // Replace with actual path to logo
                  alt="Bank Logo"
                  className="w-6 h-6 ml-2"
                />
              </div>

              {/* Account Number with Copy Function */}
              <div className="mt-2 flex items-center">
                <span className="font-bold">Account Number: </span>
                <span className="ml-2">901556823268</span>
                <button
                  onClick={copyAccountNumber}
                  className="ml-2 flex items-center text-sm text-[#FFD700] hover:text-[#FFA500] transition"
                  type="button"
                >
                  <CopyIcon className="w-4 h-4 mr-1" />
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* Account Holder Name */}
              <div className="mt-2">
                <span className="font-bold">Account Name: </span>
                <span>Labib Hakam Fauzi</span>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                * Make sure to use the correct account details to avoid delays in verification.
              </p>
            </div>


            {/* Payment Evidence Input Field */}
            <div className="space-y-2">
              <Label htmlFor="paymentEvident" className="text-sm font-semibold text-gray-300">
                Upload Payment Evidence
              </Label>
              <Input
                id="paymentEvident"
                name="paymentEvident"
                placeholder="cth: https://example.com/payment-evidence.jpg"
                value={formData.paymentEvident}
                onChange={handleInputChange}
                required
                className="w-full bg-[#2D1B4E] border-[#FFD700] text-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition duration-200"
              />
              <p className="text-xs text-gray-400 mt-1">
                Please provide a link to your payment evidence. Make sure the link is accessible.
              </p>
              {formErrors.paymentEvident && (
                <span className="text-sm text-red-500 mt-1 block">{formErrors.paymentEvident}</span>
              )}
            </div>
          </>
        );

      case 3:
        // return (
        //   <>
        //     <div className="space-y-2">
        //       <Label htmlFor="linkUpTwibbonAnggota1">Link up twibbon anggota 1</Label>
        //       <Input
        //         id="linkUpTwibbonAnggota1"
        //         name="linkUpTwibbonAnggota1"
        //         value={formData.linkUpTwibbonAnggota1}
        //         onChange={handleInputChange}
        //         required
        //         className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
        //       />
        //       {formErrors.linkUpTwibbonAnggota1 && <span className="text-red-500">{formErrors.linkUpTwibbonAnggota1}</span>}
        //     </div>

        //     <div className="space-y-2">
        //       <Label htmlFor="linkUpTwibbonAnggota2">Link up twibbon anggota 2</Label>
        //       <Input
        //         id="linkUpTwibbonAnggota2"
        //         name="linkUpTwibbonAnggota2"
        //         value={formData.linkUpTwibbonAnggota2}
        //         onChange={handleInputChange}
        //         required
        //         className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
        //       />
        //       {formErrors.linkUpTwibbonAnggota2 && <span className="text-red-500">{formErrors.linkUpTwibbonAnggota2}</span>}
        //     </div>

        //     <div className="space-y-2">
        //       <Label htmlFor="linkUpTwibbonAnggota3">Link up twibbon anggota 3</Label>
        //       <Input
        //         id="linkUpTwibbonAnggota3"
        //         name="linkUpTwibbonAnggota3"
        //         value={formData.linkUpTwibbonAnggota3}
        //         onChange={handleInputChange}
        //         required
        //         className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
        //       />
        //       {formErrors.linkUpTwibbonAnggota3 && <span className="text-red-500">{formErrors.linkUpTwibbonAnggota3}</span>}
        //     </div>

        //     <div className="space-y-2">
        //       <Label htmlFor="ssShareKe3GroupAnggota1">SS share poster di story IG + tag IG Interfest & HIMAIF (ANGGOTA 1)</Label>
        //       {/* <Input
        //         id="ssShareKe3GroupAnggota1"
        //         name="ssShareKe3GroupAnggota1"
        //         type="file"
        //         onChange={handleFileChange}
        //         required
        //         className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
        //       /> */}
        //       <Input
        //         id="ssShareKe3GroupAnggota1"
        //         name="ssShareKe3GroupAnggota1"
        //         value={formData.ssShareKe3GroupAnggota1}
        //         onChange={handleInputChange}
        //         required
        //         className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
        //       />
        //       {formErrors.ssShareKe3GroupAnggota1 && <span className="text-red-500">{formErrors.ssShareKe3GroupAnggota1}</span>}
        //     </div>

        //     <div className="space-y-2">
        //       <Label htmlFor="ssShareKe3GroupAnggota2">SS share poster di story IG + tag IG Interfest & HIMAIF (ANGGOTA 2)</Label>
        //       {/* <Input
        //         id="ssShareKe3GroupAnggota2"
        //         name="ssShareKe3GroupAnggota2"
        //         type="file"
        //         onChange={handleFileChange}
        //         required
        //         className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
        //       /> */}
        //       <Input
        //         id="ssShareKe3GroupAnggota2"
        //         name="ssShareKe3GroupAnggota2"
        //         value={formData.ssShareKe3GroupAnggota2}
        //         onChange={handleInputChange}
        //         required
        //         className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
        //       />
        //       {formErrors.ssShareKe3GroupAnggota2 && <span className="text-red-500">{formErrors.ssShareKe3GroupAnggota2}</span>}
        //     </div>

        //     <div className="space-y-2">
        //       <Label htmlFor="ssShareKe3GroupAnggota3">SS share poster di story IG + tag IG Interfest & HIMAIF (ANGGOTA 3)</Label>
        //       {/* <Input
        //         id="ssShareKe3GroupAnggota3"
        //         name="ssShareKe3GroupAnggota3"
        //         type="file"
        //         onChange={handleFileChange}
        //         required
        //         className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
        //       /> */}
        //       <Input
        //         id="ssShareKe3GroupAnggota3"
        //         name="ssShareKe3GroupAnggota3"
        //         value={formData.ssShareKe3GroupAnggota3}
        //         onChange={handleInputChange}
        //         required
        //         className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
        //       />
        //       {formErrors.ssShareKe3GroupAnggota3 && <span className="text-red-500">{formErrors.ssShareKe3GroupAnggota3}</span>}
        //     </div>

        //   </>
        // )
        return (
          <>
            {/* Twibbon Links Section */}
            <div className="mb-6">
              <div className="flex items-center mt-10">
                <div className="flex-grow border-t border-[#FFD700]"></div>
                <span className="mx-4 text-[#FFD700] font-semibold">Twibbon Links</span>
                <div className="flex-grow border-t border-[#FFD700]"></div>
              </div>
              <p className='mt-1 mb-4'>*Twibbon: <a
                href="https://bit.ly/TwibbonInterfest2024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD700] underline hover:text-[#FFA500] transition"
              >
                https://bit.ly/TwibbonInterfest2024
              </a></p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkUpTwibbonAnggota1" className="text-sm font-medium text-[#FFD700]">Link Twibbon Anggota 1</Label>
                  <Input
                    id="linkUpTwibbonAnggota1"
                    name="linkUpTwibbonAnggota1"
                    placeholder="cth: https://example.com/twibbon-1.pdf"
                    value={formData.linkUpTwibbonAnggota1}
                    onChange={handleInputChange}
                    required
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:border-[#FFD700]"
                  />
                  {formErrors.linkUpTwibbonAnggota1 && <span className="text-xs text-red-500">{formErrors.linkUpTwibbonAnggota1}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkUpTwibbonAnggota2" className="text-sm font-medium text-[#FFD700]">Link Twibbon Anggota 2</Label>
                  <Input
                    id="linkUpTwibbonAnggota2"
                    name="linkUpTwibbonAnggota2"
                    placeholder="cth: https://example.com/twibbon-2.pdf"
                    value={formData.linkUpTwibbonAnggota2}
                    onChange={handleInputChange}
                    required
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:border-[#FFD700]"
                  />
                  {formErrors.linkUpTwibbonAnggota2 && <span className="text-xs text-red-500">{formErrors.linkUpTwibbonAnggota2}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkUpTwibbonAnggota3" className="text-sm font-medium text-[#FFD700]">Link Twibbon Anggota 3</Label>
                  <Input
                    id="linkUpTwibbonAnggota3"
                    name="linkUpTwibbonAnggota3"
                    placeholder="cth: https://example.com/twibbon-3.pdf"
                    value={formData.linkUpTwibbonAnggota3}
                    onChange={handleInputChange}
                    required
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:border-[#FFD700]"
                  />
                  {formErrors.linkUpTwibbonAnggota3 && <span className="text-xs text-red-500">{formErrors.linkUpTwibbonAnggota3}</span>}
                </div>
              </div>
            </div>

            {/* IG Story Screenshot Links Section */}
            <div className="mb-6">
              <div className="flex items-center mt-10">
                <div className="flex-grow border-t border-[#FFD700]"></div>
                <span className="mx-4 text-[#FFD700] font-semibold">IG Story Screenshot Links</span>
                <div className="flex-grow border-t border-[#FFD700]"></div>
              </div>
              <p className='mt-1 mb-4'>*SS share poster di story IG + tag IG Interfest & HIMAIF (ANGGOTA 3)</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ssShareKe3GroupAnggota1" className="text-sm font-medium text-[#FFD700]">Screenshot Anggota 1</Label>
                  <Input
                    id="ssShareKe3GroupAnggota1"
                    name="ssShareKe3GroupAnggota1"
                    placeholder="cth: https://example.com/ss-ig-1.pdf"
                    value={formData.ssShareKe3GroupAnggota1}
                    onChange={handleInputChange}
                    required
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:border-[#FFD700]"
                  />
                  {formErrors.ssShareKe3GroupAnggota1 && <span className="text-xs text-red-500">{formErrors.ssShareKe3GroupAnggota1}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ssShareKe3GroupAnggota2" className="text-sm font-medium text-[#FFD700]">Screenshot Anggota 2</Label>
                  <Input
                    id="ssShareKe3GroupAnggota2"
                    name="ssShareKe3GroupAnggota2"
                    placeholder="cth: https://example.com/ss-ig-2.pdf"
                    value={formData.ssShareKe3GroupAnggota2}
                    onChange={handleInputChange}
                    required
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:border-[#FFD700]"
                  />
                  {formErrors.ssShareKe3GroupAnggota2}
                  {formErrors.ssShareKe3GroupAnggota2 && <span className="text-xs text-red-500">{formErrors.ssShareKe3GroupAnggota2}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ssShareKe3GroupAnggota3" className="text-sm font-medium text-[#FFD700]">Screenshot Anggota 3</Label>
                  <Input
                    id="ssShareKe3GroupAnggota3"
                    name="ssShareKe3GroupAnggota3"
                    placeholder="cth: https://example.com/ss-ig-3.pdf"
                    value={formData.ssShareKe3GroupAnggota3}
                    onChange={handleInputChange}
                    required
                    className="bg-[#2D1B4E] border-[#FFD700] text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:border-[#FFD700]"
                  />
                  {formErrors.ssShareKe3GroupAnggota3}
                  {formErrors.ssShareKe3GroupAnggota3 && <span className="text-xs text-red-500">{formErrors.ssShareKe3GroupAnggota3}</span>}
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        // return (
        //   <>
        //     <div className="space-y-2">
        //       <h3 className="text-xl font-semibold text-[#FFD700]">Please review your information:</h3>
        //       <p>Team Name: {formData.teamName}</p>
        //       <p>Team Leader: {formData.leaderName}</p>
        //       <p>Competition: {formData.competition}</p>
        //       <p>Payment Evidence: {formData.paymentEvident ? formData.paymentEvident : 'Not uploaded'}</p>
        //       {/* <p>Payment Evidence: {formData.paymentEvident ? formData.paymentEvident.name : 'Not uploaded'}</p> */}
        //     </div>
        //     <div className="flex items-center space-x-2 mt-4">
        //       <Checkbox
        //         id="agreeTerms"
        //         checked={formData.agreeTerms}
        //         onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, agreeTerms: checked }))}
        //         required
        //       />
        //       <label htmlFor="agreeTerms" className="text-sm text-gray-100">
        //         I agree to the terms and conditions
        //       </label>
        //     </div>
        //   </>
        // )

        return (
          <>
            <div className="space-y-6">
              {/* Header */}
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Review Your Information</h3>

              {/* Team Information */}
              <div className="relative bg-[#1E0B3B] p-4 rounded-md shadow-md space-y-2">
                <h4 className="text-lg font-semibold text-gray-100">Team Information</h4>
                <Button
                  className="absolute top-0 right-4 text-sm text-[#FFD700]"
                  onClick={() => setCurrentStep(0)}
                >
                  <Edit2Icon className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <p><span className="font-semibold text-[#FFD700]">Team Name:</span> {formData.teamName || 'Not provided'}</p>
                <p><span className="font-semibold text-[#FFD700]">Team Leader:</span> {formData.leaderName || 'Not provided'}</p>
                <p><span className="font-semibold text-[#FFD700]">Competition:</span> {formData.competition || 'Not provided'}</p>
              </div>

              {/* Member Details */}
              <div className="relative bg-[#1E0B3B] p-6 rounded-md shadow-lg space-y-4">
                {/* Section Header with Edit Button */}
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-100">Member Details</h4>
                  <button
                    className="flex items-center text-sm text-[#FFD700] hover:text-[#FFA500] transition duration-300"
                    onClick={() => setCurrentStep(1)}
                  >
                    <Edit2Icon className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                </div>

                {/* Collapsible Cards for Each Member */}
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="bg-[#2D1B4E] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    {/* Member Header with Toggle Icon */}
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleMemberDetails(index)}
                    >
                      <h5 className="font-semibold text-[#FFD700]">Member {index}</h5>
                      {expandedMember === index ? (
                        <ChevronUpIcon className="text-[#FFD700] w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="text-[#FFD700] w-5 h-5" />
                      )}
                    </div>

                    {/* Collapsible Content */}
                    {expandedMember === index && (
                      <div className="mt-3 space-y-2 text-sm">
                        <p>
                          <span className="font-semibold text-gray-300">Name:</span>{' '}
                          <span className={formData[`member${index}Name`] ? 'text-gray-300' : 'text-red-500'}>
                            {formData[`member${index}Name`] || 'Not provided'}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-300">Email:</span>{' '}
                          <span className={formData[`member${index}Email`] ? 'text-gray-300' : 'text-red-500'}>
                            {formData[`member${index}Email`] || 'Not provided'}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-300">Whatsapp:</span>{' '}
                          <span className={formData[`member${index}Whatsapp`] ? 'text-gray-300' : 'text-red-500'}>
                            {formData[`member${index}Whatsapp`] || 'Not provided'}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-300">NIM:</span>{' '}
                          <span className={formData[`member${index}NIM`] ? 'text-gray-300' : 'text-red-500'}>
                            {formData[`member${index}NIM`] || 'Not provided'}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-300">Semester:</span>{' '}
                          <span className={formData[`member${index}Semester`] ? 'text-gray-300' : 'text-red-500'}>
                            {formData[`member${index}Semester`] || 'Not provided'}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-300">Institution:</span>{' '}
                          <span className={formData[`member${index}Institution`] ? 'text-gray-300' : 'text-red-500'}>
                            {formData[`member${index}Institution`] || 'Not provided'}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-300">Faculty:</span>{' '}
                          <span className={formData[`member${index}Faculty`] ? 'text-gray-300' : 'text-red-500'}>
                            {formData[`member${index}Faculty`] || 'Not provided'}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-300">Program:</span>{' '}
                          <span className={formData[`member${index}Program`] ? 'text-gray-300' : 'text-red-500'}>
                            {formData[`member${index}Program`] || 'Not provided'}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-300">KSM:</span>{' '}
                          {formData[`member${index}KSM`] ? (
                            <a
                              href={formData[`member${index}KSM`]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FFD700] underline hover:text-[#FFA500] transition"
                            >
                              {formData[`member${index}KSM`]}
                            </a>
                          ) : (
                            <span className="text-red-500">Not provided</span>
                          )}
                        </p>
                        <p>
                          <span className="font-semibold text-gray-300">Photo:</span>{' '}
                          {formData[`member${index}Photo`] ? (
                            <a
                              href={formData[`member${index}Photo`]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FFD700] underline hover:text-[#FFA500] transition"
                            >
                              {formData[`member${index}Photo`]}
                            </a>
                          ) : (
                            <span className="text-red-500">Not provided</span>
                          )}
                        </p>
                        <p>
                          <span className="font-semibold text-gray-300">KTM:</span>{' '}
                          {formData[`member${index}KTM`] ? (
                            <a
                              href={formData[`member${index}KTM`]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FFD700] underline hover:text-[#FFA500] transition"
                            >
                              {formData[`member${index}KTM`]}
                            </a>
                          ) : (
                            <span className="text-red-500">Not provided</span>
                          )}
                        </p>
                      </div>
                    )}

                  </div>
                ))}
              </div>

              {/* Payment Evidence */}
              <div className="relative bg-[#1E0B3B] p-4 rounded-md shadow-md space-y-2">
                <h4 className="text-lg font-semibold text-gray-100">Payment Evidence</h4>
                <Button
                  className="absolute top-0 right-4 text-sm text-[#FFD700]"
                  onClick={() => setCurrentStep(2)}
                >
                  <Edit2Icon className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <p>
                  <span className="font-semibold">Link:</span>{' '}
                  {formData.paymentEvident ? (
                    <a href={formData.paymentEvident} target="_blank" rel="noopener noreferrer" className="text-[#FFD700] underline hover:text-[#FFA500] transition">
                      {formData.paymentEvident}
                    </a>
                  ) : (
                    <span className="text-red-500">Not provided</span>
                  )}
                </p>
              </div>

              {/* Social Media Links */}
              <div className="relative bg-[#1E0B3B] p-4 rounded-md shadow-md space-y-2">
                <h4 className="text-lg font-semibold text-gray-100">Social Media Links</h4>
                <Button
                  className="absolute top-0 right-4 text-sm text-[#FFD700]"
                  onClick={() => setCurrentStep(3)}
                >
                  <Edit2Icon className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <p>
                  <span className="font-semibold">Twibbon Member 1:</span>{' '}
                  {formData.linkUpTwibbonAnggota1 ? (
                    <a href={formData.linkUpTwibbonAnggota1} target="_blank" rel="noopener noreferrer" className="text-[#FFD700] underline hover:text-[#FFA500] transition">
                      {formData.linkUpTwibbonAnggota1}
                    </a>
                  ) : (
                    <span className="text-red-500">Not provided</span>
                  )}
                </p>
                <p>
                  <span className="font-semibold">Twibbon Member 2:</span>{' '}
                  {formData.linkUpTwibbonAnggota2 ? (
                    <a href={formData.linkUpTwibbonAnggota2} target="_blank" rel="noopener noreferrer" className="text-[#FFD700] underline hover:text-[#FFA500] transition">
                      {formData.linkUpTwibbonAnggota2}
                    </a>
                  ) : (
                    <span className="text-red-500">Not provided</span>
                  )}
                </p>
                <p>
                  <span className="font-semibold">Twibbon Member 3:</span>{' '}
                  {formData.linkUpTwibbonAnggota3 ? (
                    <a href={formData.linkUpTwibbonAnggota3} target="_blank" rel="noopener noreferrer" className="text-[#FFD700] underline hover:text-[#FFA500] transition">
                      {formData.linkUpTwibbonAnggota3}
                    </a>
                  ) : (
                    <span className="text-red-500">Not provided</span>
                  )}
                </p>
                <p>
                  <span className="font-semibold">Share Poster Instagram 1:</span>{' '}
                  {formData.ssShareKe3GroupAnggota1 ? (
                    <a href={formData.ssShareKe3GroupAnggota1} target="_blank" rel="noopener noreferrer" className="text-[#FFD700] underline hover:text-[#FFA500] transition">
                      {formData.ssShareKe3GroupAnggota1}
                    </a>
                  ) : (
                    <span className="text-red-500">Not provided</span>
                  )}
                </p>
                <p>
                  <span className="font-semibold">Share Poster Instagram 2:</span>{' '}
                  {formData.ssShareKe3GroupAnggota2 ? (
                    <a href={formData.ssShareKe3GroupAnggota2} target="_blank" rel="noopener noreferrer" className="text-[#FFD700] underline hover:text-[#FFA500] transition">
                      {formData.ssShareKe3GroupAnggota2}
                    </a>
                  ) : (
                    <span className="text-red-500">Not provided</span>
                  )}
                </p>
                <p>
                  <span className="font-semibold">Share Poster Instagram 3:</span>{' '}
                  {formData.ssShareKe3GroupAnggota3 ? (
                    <a href={formData.ssShareKe3GroupAnggota3} target="_blank" rel="noopener noreferrer" className="text-[#FFD700] underline hover:text-[#FFA500] transition">
                      {formData.ssShareKe3GroupAnggota3}
                    </a>
                  ) : (
                    <span className="text-red-500">Not provided</span>
                  )}
                </p>
              </div>

              {/* Terms and Agreement */}
              <div className="flex items-center space-x-2 mt-6">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, agreeTerms: checked }))}
                  required
                />
                {/* <label htmlFor="agreeTerms" className="text-sm text-gray-100">
                  I agree to the terms and conditions
                </label> */}
                <label htmlFor="agreeTerms" className="text-sm text-gray-100">
                  I agree to the{' '}
                  <a
                    href="https://drive.google.com/file/d/1laxNmhntFaoGOPbx7Ne0OFQO9zbXZFZN/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] underline hover:text-[#FFA500] transition-colors"
                  >
                    terms and conditions
                  </a>
                </label>

              </div>
            </div>
          </>
        );

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

      <div className="max-w-4xl mx-auto mb-12 pt-12">
        <FloatingIcon icon={WandIcon} />
        <h1 className="text-3xl font-bold text-[#FFD700] mb-2 text-center">Register for INTERFEST 2024</h1>
        <p className="text-lg mb-6 text-center">Join us in this magical adventure of technology and innovation!</p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-7 justify-center text-center">
          {/* Batch 1 Card */}
          <div
            className={`w-full md:w-1/2 p-6 rounded-lg shadow-lg transition-transform duration-300 ${batch1Active ? 'bg-[#2D1B4E] text-[#FFD700] transform scale-105' : 'bg-[#1E0B3B] text-gray-400 hidden'
              } hover:shadow-xl`}
          >
            <h2 className="text-lg font-semibold mb-1">Batch 1</h2>
            <p className="text-sm mb-1">Rp50.000,- per team</p>
            <p className="text-xs mb-2 text-gray-300">14 Oct 2024 - 2 Nov 2024</p>

            <p
              className="text-sm font-medium tooltip relative"
              title="Batch 1 will end on 2 Nov 2024 at 23:59"
            >
              {batch1Active ? batch1Countdown : currentDate < batch1StartDate ? 'Starts soon' : 'Batch ended'}
            </p>

            {/* Tooltip Style */}
            <style jsx>{`
              .tooltip:hover::after {
                content: attr(title);
                position: absolute;
                bottom: -2rem;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.75);
                color: #FFD700;
                padding: 0.25rem 0.5rem;
                font-size: 0.75rem;
                border-radius: 4px;
                white-space: nowrap;
              }
            `}</style>
          </div>

          {/* Batch 2 Card */}
          <div
            className={`w-full md:w-1/2 p-6 rounded-lg shadow-lg transition-transform duration-300 ${batch2Active ? 'bg-[#2D1B4E] text-[#FFD700] transform scale-105' : 'bg-[#1E0B3B] text-gray-400 md:block hidden'
              } hover:shadow-xl`}
          >
            <h2 className="text-lg font-semibold mb-1">Batch 2</h2>
            <p className="text-sm mb-1">Rp75.000,- per team</p>
            <p className="text-xs mb-2 text-gray-300">3 Nov 2024 - 21 Nov 2024</p>

            <p
              className="text-sm font-medium tooltip relative"
              title="Batch 2 will end on 21 Nov 2024 at 23:59"
            >
              {batch2Active ? batch2Countdown : currentDate < batch2StartDate ? 'Starts soon' : 'Batch ended'}
            </p>
          </div>
        </div>


        <div className="relative flex items-center justify-between my-10 overflow-x-auto">
          {/* Step Icons and Titles */}
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center z-10 w-1/5">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${currentStep === index
                  ? 'bg-[#FFD700] text-[#0B0B3B] border-2 border-[#FFA500]'
                  : currentStep > index
                    ? 'bg-[#FFA500] text-[#0B0B3B]'
                    : 'bg-[#2D1B4E] text-gray-300'
                  }`}
              >
                <StepIcon
                  icon={step.icon}
                  isActive={currentStep === index}
                  isCompleted={currentStep > index}
                />
              </div>
              <p
                className={`mt-2 text-sm font-semibold transition-colors duration-300 ${currentStep === index ? 'text-[#FFD700]' : 'text-gray-400'
                  }`}
              >
                {step.title}
              </p>
            </div>
          ))}

          {/* Progress Bar */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-[#2D1B4E] -translate-y-1/2 z-0">
            <motion.div
              className="h-full bg-[#FFD700] rounded"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {renderStepContent()}
          <div className="flex justify-between mt-6">
            {currentStep == 0 ? (
              <div></div>
            ) : (
              <Button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="bg-[#2D1B4E] text-[#FFD700] hover:bg-[#1E0B3B] transition-all duration-300"
              >
                Previous
              </Button>
            )}
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
    </div>
  )
}