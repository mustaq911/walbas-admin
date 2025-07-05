import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {  Plus } from 'lucide-react'
import React from 'react'

const BehaviourPointTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AcademicYearPlaceholder/>
                <AppModal
                    title='Add Behaviour Points'
                    description='Add New Behaviour Points'
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
                    <CardDescription>Behaviour point legend</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-x-4 xl:flex-row flex-col">
                        <div className="flex">
                            <div className='rounded-full h-[18px] w-[18px] bg-orange-500 me-1'/> Negative Points
                        </div>
                        <div className="flex">
                            <div className='rounded-full h-[18px] w-[18px] bg-yellow-500 me-1'/> Positive Points
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Behaviour Points</CardTitle>
                    <CardDescription>List of all behaviour points</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default BehaviourPointTab