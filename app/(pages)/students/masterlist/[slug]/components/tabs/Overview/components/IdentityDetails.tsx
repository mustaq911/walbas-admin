"use client"

import type { Student } from "@/types/student"
import { memo } from "react"
import dynamic from "next/dynamic"

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="relative w-10 h-10">
                <div className="w-10 h-10 rounded-full border-4 border-gray-200"></div>
                <div className="absolute top-0 left-0 w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
        </div>
    )
}

const FamilyContact = dynamic(() => import('./FamilyContact'), {
    ssr: false,
    loading: () => <LoadingSpinner />
})

const PersonalDetails = dynamic(() => import('./PersonalDetails'), {
    ssr: false,
    loading: () => <LoadingSpinner />
})

const StudentSchedule = dynamic(() => import('./StudentSchedule'), {
    ssr: false,
    loading: () => <LoadingSpinner />
})

interface StudentProfileProps {
    student: Student
}


function StudentProfile({ student }: StudentProfileProps) {


    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Student Identity Details Card */}
                    <PersonalDetails student={student} />

                    {/* Family Contacts Component */}
                    <FamilyContact />
                </div>

                {/* Right Column - Student Schedule */}
                <div className="lg:col-span-1 w-full">
                    <StudentSchedule />
                </div>
            </div>
        </div>
    )
}

export default memo(StudentProfile)

