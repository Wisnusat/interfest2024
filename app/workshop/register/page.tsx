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
    buktiFollowHIMAIF: '',
    buktiFollowInterfest: '',
    buktiSharePoster: '',
    ssBuktiShareGrup: '',
    buktiUpTwibbon: '',
    kodeReferral: ''
  })
  const [formErrors, setFormErrors] = useState<any>({})

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

    if (!formData.buktiFollowHIMAIF.trim()) {
      errors.buktiFollowHIMAIF = "Bukti follow akun HIMA IF is required.";
    } else if (!urlRegex.test(formData.buktiFollowHIMAIF)) {
      errors.buktiFollowHIMAIF = "Invalid URL format.";
    }

    if (!formData.buktiFollowInterfest.trim()) {
      errors.buktiFollowInterfest = "Bukti follow Interfest is required.";
    } else if (!urlRegex.test(formData.buktiFollowInterfest)) {
      errors.buktiFollowInterfest = "Invalid URL format.";
    }

    if (!formData.buktiSharePoster.trim()) {
      errors.buktiSharePoster = "Bukti share poster di feed is required.";
    } else if (!urlRegex.test(formData.buktiSharePoster)) {
      errors.buktiSharePoster = "Invalid URL format.";
    }

    if (!formData.ssBuktiShareGrup.trim()) {
      errors.ssBuktiShareGrup = "SS bukti share ke grup is required.";
    } else if (!urlRegex.test(formData.ssBuktiShareGrup)) {
      errors.ssBuktiShareGrup = "Invalid URL format.";
    }

    if (!formData.buktiUpTwibbon.trim()) {
      errors.buktiUpTwibbon = "Bukti up twibbon is required.";
    } else if (!urlRegex.test(formData.buktiUpTwibbon)) {
      errors.buktiUpTwibbon = "Invalid URL format.";
    }

    if (!formData.kodeReferral.trim()) {
      errors.kodeReferral = "Kode referral is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateFields()) {
      setLoading(true);
      try {
        const response = await fetch('', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        toast({
          title: "Registration Successful",
          description: "Your workshop registration has been submitted successfully!"
        });
        router.push("/success")
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

  return (
    <div className="bg-gradient-to-b from-[#0B0B3B] via-[#1E0B3B] to-[#0B0B3B] min-h-screen text-gray-100 font-sans overflow-x-hidden py-20 px-4">
      <Header />
      <div className="max-w-4xl mx-auto mb-12 pt-12">
        <FloatingIcon icon={BookOpenIcon} />
        <h1 className="text-3xl font-bold text-[#FFD700] mb-2 text-center">Workshop Registration</h1>
        <p className="text-lg mb-6 text-center">Join us for an exciting workshop experience!</p>

        <motion.div
        //   className="bg-[#1E0B3B] p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="space-y-2">
                <Label htmlFor="buktiFollowHIMAIF" className="text-sm font-bold">Bukti Follow Akun HIMA IF</Label>
                <Input
                  id="buktiFollowHIMAIF"
                  name="buktiFollowHIMAIF"
                  placeholder="Link to proof"
                  value={formData.buktiFollowHIMAIF}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.buktiFollowHIMAIF && <span className="text-red-500 text-xs">{formErrors.buktiFollowHIMAIF}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="buktiFollowInterfest" className="text-sm font-bold">Bukti Follow Interfest</Label>
                <Input
                  id="buktiFollowInterfest"
                  name="buktiFollowInterfest"
                  placeholder="Link to proof"
                  value={formData.buktiFollowInterfest}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.buktiFollowInterfest && <span className="text-red-500 text-xs">{formErrors.buktiFollowInterfest}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="buktiSharePoster" className="text-sm font-bold">Bukti Share Poster di Feed</Label>
                <Input
                  id="buktiSharePoster"
                  name="buktiSharePoster"
                  placeholder="Link to proof"
                  value={formData.buktiSharePoster}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.buktiSharePoster && <span className="text-red-500 text-xs">{formErrors.buktiSharePoster}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ssBuktiShareGrup" className="text-sm font-bold">SS Bukti Share ke Grup</Label>
                <Input
                  id="ssBuktiShareGrup"
                  name="ssBuktiShareGrup"
                  placeholder="Link to proof"
                  value={formData.ssBuktiShareGrup}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.ssBuktiShareGrup && <span className="text-red-500 text-xs">{formErrors.ssBuktiShareGrup}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="buktiUpTwibbon" className="text-sm font-bold">Bukti Up Twibbon</Label>
                <Input
                  id="buktiUpTwibbon"
                  name="buktiUpTwibbon"
                  placeholder="Link to proof"
                  value={formData.buktiUpTwibbon}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.buktiUpTwibbon && <span className="text-red-500 text-xs">{formErrors.buktiUpTwibbon}</span>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="kodeReferral" className="text-sm font-bold">Kode Referral</Label>
                <Input
                  id="kodeReferral"
                  name="kodeReferral"
                  placeholder="Enter referral code"
                  value={formData.kodeReferral}
                  onChange={handleInputChange}
                  required
                  className="bg-[#2D1B4E] border-[#FFD700] text-gray-100"
                />
                {formErrors.kodeReferral && <span className="text-red-500 text-xs">{formErrors.kodeReferral}</span>}
              </div>
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