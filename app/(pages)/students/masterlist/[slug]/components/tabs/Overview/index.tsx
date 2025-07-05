'use client'

import { memo } from 'react'
import { Student } from '@/types/student'
import dynamic from 'next/dynamic'

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

// Dynamically import sub-components
const IdentityDetails = dynamic(() => import('./components/IdentityDetails'), { 
    ssr: false,
    loading: () => <LoadingSpinner />
})


interface OverviewProps {
    student: Student
}

function Overview({ student }: OverviewProps) {
    return (
        <div className="w-full p-4">
            <IdentityDetails student={student} />
        </div>
    )
}

export default memo(Overview)