import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {  Plus } from 'lucide-react'
import React from 'react'

const TrainingCourseTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AcademicYearPlaceholder/>
                <AppModal
                    title='Add se'
                    description='Add New Training Course'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add 
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card className='mb-2'>
                <CardHeader>
                    <CardTitle>Training Course</CardTitle>
                    <CardDescription>List of all appraisal</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Attendances</CardTitle>
                    <CardDescription>List of all attendance</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
           
        </div>
    )
}

export default TrainingCourseTab