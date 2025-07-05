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
const AssessmentsList = dynamic(() => import('./components/AssessmentsList'), { 
    loading: () => <LoadingSpinner />,
    ssr: false
})

const AssessmentsSummary = dynamic(() => import('./components/AssessmentSummary'), { 
    loading: () => <LoadingSpinner />,
    ssr: false
})

interface AssessmentsProps {
    student: Student
}

function Assessments({ student }: AssessmentsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <AssessmentsList student={student} />
            <AssessmentsSummary student={student} />
        </div>
    )
}

export default memo(Assessments)