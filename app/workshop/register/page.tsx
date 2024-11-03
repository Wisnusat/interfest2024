'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/components/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/header'
import { BookOpenIcon } from 'lucide-react'
import SuccessPage from '@/components/layout/SuccessWorkshop'

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

export default function WorkshopRegistrationForm() {
  const router = useRouter()
  const { toast }: any = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<any>({
    email: '',
    namaLengkap: '',
    asalInstansi: '',
    buktiFollowHIMAIF: null,
    buktiFollowInterfest: null,
    buktiSharePoster: null,
    ssBuktiShareGrup1: null,
    ssBuktiShareGrup2: null,
    ssBuktiShareGrup3: null,
    buktiUpTwibbon: null,
    kodeReferral: ''
  })
  const [formErrors, setFormErrors] = useState<any>({})
  const [isSuccess, setIsSuccess] = useState(false)

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

  const validateFields = () => {
    let errors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.namaLengkap.trim()) {
      errors.namaLengkap = "Nama Lengkap is required.";
    }

    if (!formData.asalInstansi.trim()) {
      errors.asalInstansi = "Asal Instansi is required.";
    }

    if (!formData.buktiFollowHIMAIF) {
      errors.buktiFollowHIMAIF = "Bukti follow akun HIMA IF is required.";
    }

    if (!formData.buktiFollowInterfest) {
      errors.buktiFollowInterfest = "Bukti follow Interfest is required.";
    }

    if (!formData.buktiSharePoster) {
      errors.buktiSharePoster = "Bukti share poster di feed is required.";
    }

    if (!formData.ssBuktiShareGrup1) {
      errors.ssBuktiShareGrup = "SS bukti share ke grup is required.";
    }

    if (!formData.ssBuktiShareGrup2) {
      errors.ssBuktiShareGrup = "SS bukti share ke grup is required.";
    }

    if (!formData.ssBuktiShareGrup3) {
      errors.ssBuktiShareGrup = "SS bukti share ke grup is required.";
    }

    if (!formData.buktiUpTwibbon) {
      errors.buktiUpTwibbon = "Bukti up twibbon is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      toast({
        title: "Casting the spell of submission...",
        description: "Please hold while the magic takes effect!"
      });

      setLoading(true);

      // Prepare to upload files and get their URLs
      const fileFields = [
        'buktiFollowHIMAIF', 'buktiFollowInterfest', 'buktiSharePoster', 'ssBuktiShareGrup1', 'buktiUpTwibbon', 'ssBuktiShareGrup2', 'ssBuktiShareGrup3'
      ];

      const updatedFormData = { ...formData };

      // Upload files and update formData with URLs
      for (const field of fileFields) {
        if (formData[field]) {
          const fileData = new FormData();
          fileData.append('file', formData[field]);

          let uploadResponse;
          let attempts = 0;
          const maxAttempts = 3; // Set the maximum number of retry attempts

          // Retry logic with exponential backoff
          while (attempts < maxAttempts) {
            uploadResponse = await fetch('/api/upload', {
              method: 'POST',
              body: fileData,
            });

            if (uploadResponse.ok) {
              const uploadResult = await uploadResponse.json();
              updatedFormData[field] = uploadResult.viewLink; // Assuming the response contains the file URL
              console.log('success upload file');
              break; // Exit the retry loop on success
            } else {
              attempts++;
              if (attempts < maxAttempts) {
                const delay = Math.pow(2, attempts) * 100; // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
              } else {
                toast({
                  title: `Error uploading ${field}`,
                  description: uploadResponse.statusText || "",
                });
              }
            }
          }
        }
      }

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_WORKSHOP_SHEET_URL || '', {
          method: 'POST',
          headers: {
            "Content-Type": "text/plain"
          },
          body: JSON.stringify(updatedFormData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        toast({
          title: "Registration Successful",
          description: "Your workshop registration has been submitted successfully!"
        });
        setIsSuccess(true);
      } catch (error: any) {
        toast({
          title: "Error submitting form",
          description: error?.message || "An error occurred. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

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

  if (isSuccess) return <SuccessPage />
  return (
    <div className="bg-gradient-to-b from-[#0B0B3B] via-[#1E0B3B] to-[#0B0B3B] min-h-screen text-gray-100 font-sans overflow-x-hidden py-20 px-4">
      <Header />
      <div className="max-w-4xl mx-auto mb-12 pt-12">
        <FloatingIcon className="hidden md:block" icon={BookOpenIcon} />
        <h1 className="text-3xl font-bold text-[#FFD700] mb-2 text-center">Workshop Registration</h1>
        <p className="text-lg mb-6 text-center">Join us for an exciting workshop experience!</p>

        <motion.div
          //   className="bg-[#1E0B3B] p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center my-6 mt-20">
              <div className="flex-grow border-t border-[#FFD700]"></div>
              <span className="mx-4 text-[#FFD700] font-bold">Personal Information</span>
              <div className="flex-grow border-t border-[#FFD700]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.email && <span className="text-red-500 text-xs">{formErrors.email}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="namaLengkap" className="text-sm font-bold">Nama Lengkap</Label>
                <Input
                  id="namaLengkap"
                  name="namaLengkap"
                  placeholder="Enter your full name"
                  value={formData.namaLengkap}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.namaLengkap && <span className="text-red-500 text-xs">{formErrors.namaLengkap}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="asalInstansi" className="text-sm font-bold">Asal Instansi</Label>
                <Input
                  id="asalInstansi"
                  name="asalInstansi"
                  placeholder="Enter your institution"
                  value={formData.asalInstansi}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.asalInstansi && <span className="text-red-500 text-xs">{formErrors.asalInstansi}</span>}
              </div>
            </div>

            <div className="flex items-center my-6 mt-20">
              <div className="flex-grow border-t border-[#FFD700]"></div>
              <span className="mx-4 text-[#FFD700] font-bold">Social Media</span>
              <div className="flex-grow border-t border-[#FFD700]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="buktiFollowHIMAIF" className="text-sm font-bold">Bukti Follow Akun HIMA IF</Label>
                <Input
                  id="buktiFollowHIMAIF"
                  name="buktiFollowHIMAIF"
                  type="file"
                  onChange={handleFileChange}
                  required={true}
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.buktiFollowHIMAIF && <span className="text-red-500 text-xs">{formErrors.buktiFollowHIMAIF}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="buktiFollowInterfest" className="text-sm font-bold">Bukti Follow Interfest</Label>
                <Input
                  id="buktiFollowInterfest"
                  name="buktiFollowInterfest"
                  type="file"
                  onChange={handleFileChange}
                  required={true}
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.buktiFollowInterfest && <span className="text-red-500 text-xs">{formErrors.buktiFollowInterfest}</span>}
              </div>

              <div className="space-y-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="buktiSharePoster" className="text-sm font-bold">Bukti Share Poster di Insta Story</Label>
                  <a
                    href="https://drive.google.com/drive/folders/1KD0R5Bj7cXKWNDGL2QR-HyL0WmPu199y?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] underline hover:text-[#FFA500] transition"
                  >
                    https://bit.ly/PosterWorkshop2024
                  </a>
                </div>
                <Input
                  id="buktiSharePoster"
                  name="buktiSharePoster"
                  type="file"
                  onChange={handleFileChange}
                  required={true}
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.buktiSharePoster && <span className="text-red-500 text-xs">{formErrors.buktiSharePoster}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ssBuktiShareGrup" className="text-sm font-bold">SS Bukti Share ke Grup 1</Label>
                <Input
                  id="ssBuktiShareGrup1"
                  name="ssBuktiShareGrup1"
                  type="file"
                  onChange={handleFileChange}
                  required={true}
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.ssBuktiShareGrup && <span className="text-red-500 text-xs">{formErrors.ssBuktiShareGrup}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ssBuktiShareGrup" className="text-sm font-bold">SS Bukti Share ke Grup 2</Label>
                <Input
                  id="ssBuktiShareGrup2"
                  name="ssBuktiShareGrup2"
                  type="file"
                  onChange={handleFileChange}
                  required={true}
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.ssBuktiShareGrup && <span className="text-red-500 text-xs">{formErrors.ssBuktiShareGrup}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ssBuktiShareGrup" className="text-sm font-bold">SS Bukti Share ke Grup 3</Label>
                <Input
                  id="ssBuktiShareGrup3"
                  name="ssBuktiShareGrup3"
                  type="file"
                  onChange={handleFileChange}
                  required={true}
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.ssBuktiShareGrup && <span className="text-red-500 text-xs">{formErrors.ssBuktiShareGrup}</span>}
              </div>

              <div className="space-y-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="buktiUpTwibbon" className="text-sm font-bold">Bukti Up Twibbon</Label>
                  <a
                    href="https://drive.google.com/drive/folders/1KD0R5Bj7cXKWNDGL2QR-HyL0WmPu199y?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] underline hover:text-[#FFA500] transition"
                  >
                    https://bit.ly/TwibbonInterfest2024
                  </a>
                </div>
                <Input
                  id="buktiUpTwibbon"
                  name="buktiUpTwibbon"
                  type="file"
                  onChange={handleFileChange}
                  required={true}
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.buktiUpTwibbon && <span className="text-red-500 text-xs">{formErrors.buktiUpTwibbon}</span>}
              </div>
            </div>

            <div className="flex items-center my-6 mt-20">
              <div className="flex-grow border-t border-[#FFD700]"></div>
              <span className="mx-4 text-[#FFD700] font-bold">Additional</span>
              <div className="flex-grow border-t border-[#FFD700]"></div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="kodeReferral" className="text-sm font-bold">Kode Referral</Label>
              <Input
                id="kodeReferral"
                name="kodeReferral"
                placeholder="Enter referral code"
                value={formData.kodeReferral}
                onChange={handleInputChange}
                className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
              />
              {formErrors.kodeReferral && <span className="text-red-500 text-xs">{formErrors.kodeReferral}</span>}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD700] text-[#0B0B3B] hover:bg-[#FFA500] transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <span className="loader"></span>
              ) : (
                'Submit Workshop Registration'
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}