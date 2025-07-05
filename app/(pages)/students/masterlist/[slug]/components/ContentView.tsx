'use client'

import dynamic from 'next/dynamic'
import useStudent from '@/hooks/students/use-student'
import { Student } from '@/types/student'

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

// Dynamic imports with loading spinner
const Overview = dynamic(() => import('./tabs/Overview'), {
    loading: () => <LoadingSpinner />,
    ssr: false
})

const Assessments = dynamic(() => import('./tabs/Assessments'), {
    loading: () => <LoadingSpinner />,
    ssr: false
})

interface ContentViewProps {
    student: Student
}

// Type-safe component mapping
const TAB_COMPONENTS = {
    'Overview': Overview,
    'Assessments': Assessments
} as const

export default function ContentView({ student }: ContentViewProps) {
    const { activeItem } = useStudent()
    
    const Component = TAB_COMPONENTS[activeItem.main as keyof typeof TAB_COMPONENTS] || TAB_COMPONENTS['Overview']

    return (
        <div className="min-h-screen">
            <Component student={student} />
        </div>
    )
}