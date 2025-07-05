import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {  Plus} from 'lucide-react'
import React from 'react'

const PositiveIncidentTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AcademicYearPlaceholder/>
                <AppModal
                    title='Add Positive Incident'
                    description='Add New Positive Incident'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add 
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card className='mb-2'>
                <CardHeader>
                    <CardTitle>Legends</CardTitle>
                    <CardDescription>Positive Incident legend</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-x-4 xl:flex-row flex-col">
                        <div className="flex">
                            <div className='rounded-full h-[18px] w-[18px] bg-orange-500 me-1'/> Level 1 Positive
                        </div>
                        <div className="flex">
                            <div className='rounded-full h-[18px] w-[18px] bg-yellow-500 me-1'/> Level 2 Positive
                        </div>
                        <div className="flex">
                            <div className='rounded-full h-[18px] w-[18px] bg-lime-500 me-1'/> Level 3 Positive
                        </div>
                        <div className="flex">
                            <div className='rounded-full h-[18px] w-[18px] bg-green-500 me-1'/> Level 4 Positive
                        </div>
                        <div className="flex">
                            <div className='rounded-full h-[18px] w-[18px] bg-rose-500 me-1'/> Level 5 Positive
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Positive Incidents</CardTitle>
                    <CardDescription>List of all negative incidents</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default PositiveIncidentTab