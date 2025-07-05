import AppContent from '@/components/admin/content/app-content'
import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function StudentTimeTable(){
    return (
        <AppContent title="Student Timetable">
            <div>
                <div className="flex gap-2 mb-2 justify-end">
                    <AcademicYearPlaceholder/>
                    <AppModal
                        title='Add Student Timetable'
                        description='Add New Student Timetable'
                        button={<Button className=''>
                            <Plus className='size-4 me-1 '/>
                            <span className='hidden md:block'> Add Student Timetable</span>
                        </Button>}
                    >
                        <FormPlaceholder/>
                    </AppModal>
                    <Link href="/schools/timetables/students/1">
                        <Button className='xl:w-[220px]'>
                            <ArrowRight className='size-4 me-1'/>
                            <span className='hidden md:block'> View Student Timetable</span>
                        </Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Student Timetable</CardTitle>
                        <CardDescription>List of student timetables</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DatatablePlaceholder/>
                    </CardContent>
                </Card>
            </div>
        </AppContent>
    )
}