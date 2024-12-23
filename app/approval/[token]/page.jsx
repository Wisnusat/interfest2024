"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'
import Spinner from '@/components/ui/spinner'
import { useToast } from '@/components/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function AdminApprovalPage({ params }) {
    const { toast } = useToast();
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [showRejectReason, setShowRejectReason] = useState(false)
    const [rejectReason, setRejectReason] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const handleApprove = async () => {
        setShowRejectReason(false);
        setSubmitting(true);
        try {
            await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.leaderName.split("/")[1], // Replace with the recipient's email
                    subject: 'Thank you for registering for the Open Competition as part of INTERFEST 2024! 🎉',
                    text: `Thank you for registering for the Open Competition as part of INTERFEST 2024! 🎉

We are thrilled ${userData.teamName} to have you on board and look forward to seeing your creativity and skills in action.

To stay updated with important announcements, discussions, and the competition schedule, please join our official Discord server through the link below:

📌 [Join our Discord Server](https://bit.ly/discordinterfest2024)

If you have any questions, feel free to ask directly on the Discord server or contact us through:
- Line: cecaciww (Yesi)
- WhatsApp: 082219190071 (Hazna)

Good luck 🚀

Best regards,  
INTERFEST 2024 
Organizing Committee`,
                }),
            });

            toast({ title: 'Success', description: 'User approved and email sent.' });
        } catch (error) {
            toast({ title: 'Error', description: error.message });
        }
        setSubmitting(false);
    }

    const handleReject = async () => {
        setSubmitting(true);
        try {
            if (rejectReason.trim() === '') {
                toast({ title: 'Error', description: 'Please provide a reason for rejection' });
                return;
            }
            await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.leaderName.split("/")[1], // Replace with the recipient's email
                    subject: 'Thank you for registering for the Open Competition as part of INTERFEST 2024! 🎉',
                    text: `Thank you ${userData.teamName} for your interest and effort in submitting your work for the Open Competition at INTERFEST 2024. We truly appreciate your participation and enthusiasm.

After careful review, we regret to inform you that your submission does not meet the criteria required for this year’s competition. Please review the reason: ${rejectReason}

If you have any questions or would like feedback on your submission, feel free to reach out to us through the official Discord server or contact us via:

Line: cecaciww (Yesi)
WhatsApp: 082219190071 (Hazna)
Thank you once again for your participation, and we wish you all the best in your future endeavors.

Best regards,
INTERFEST 2024 Organizing Committee`,
                }),
            });

            toast({ title: 'Success', description: 'User rejected and email sent.' });
        } catch (error) {
            toast({ title: 'Error', description: error.message });
        }
        setSubmitting(false);
    }

    useEffect(() => {
        if (params.token) {
            try {
                const decodedToken = jwtDecode(params.token);
                setUserData(decodedToken);
            } catch (error) {
                console.error('Invalid token:', error);
                toast({ title: 'error', description: 'Invalid token' })
            }
        } else {
            router.push("/");
        }
    }, [params]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Admin Approval</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Review and approve or reject the user registration
                    </p>
                </div>

                <div className="border-t border-b border-gray-200 py-4">
                    <h3 className="text-lg font-medium text-gray-900">User Details</h3>
                    <p className="mt-1 text-sm text-gray-600">Team Name: {userData ? userData.teamName : ''}</p>
                    <p className="mt-1 text-sm text-gray-600">Leader Name: {userData ? userData.leaderName.split("/")[0] : ''}</p>
                    <p className="mt-1 text-sm text-gray-600">Competition: {userData ? userData.competition : ''}</p>
                    <p className="mt-1 text-sm text-gray-600">Email: {userData ? userData.leaderName.split("/")[1] : ''}</p>
                </div>

                <div className="flex justify-center space-x-4">
                    <Button
                        type="button"
                        onClick={handleApprove}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        {isSubmitting ? <Spinner /> : <CheckCircle className="mr-2 h-5 w-5" />}
                        {!isSubmitting && 'Approve'}
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setShowRejectReason(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <XCircle className="mr-2 h-5 w-5" />
                        Reject
                    </Button>
                </div>

                {showRejectReason && (
                    <div className="mt-4">
                        <Label htmlFor="rejectReason" className="block text-sm font-medium text-gray-700">
                            Reason for Rejection
                        </Label>
                        <Input
                            type="text"
                            name="rejectReason"
                            id="rejectReason"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-transparent"
                            placeholder="Enter reason for rejection"
                        />
                        <div className="mt-4 flex justify-end">
                            <Button
                                type="button"
                                onClick={handleReject}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#E8590C] hover:bg-[#d14e0b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E8590C]"
                            >
                                {isSubmitting ? <Spinner /> : 'Submit Rejection'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
