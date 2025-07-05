import React from 'react'
import ProfileHeader from './profile-header'
import ContentView from './components/ContentView'
import { students } from '@/constants/students/students'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
        slug: string
    }
}

export default function StudentProfile({ params }: PageProps) {
    const student = students.find(s => s.id === params.slug)

    if (!student) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen">
            <ProfileHeader />
            <ContentView student={student} />
        </div>
    )
}
