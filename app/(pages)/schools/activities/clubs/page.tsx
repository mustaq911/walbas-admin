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

export default function ClubPage(){
    return (
        <AppContent title="Clubs">
            <div>
                <div className="flex gap-2 mb-2 justify-end">
                    <AcademicYearPlaceholder/>
                    <AppModal
                        title='Add Club'
                        description='Add New Club'
                        button={<Button className=''>
                            <Plus className='size-4 me-1 '/>
                            <span className='hidden md:block'> Add Club</span>
                        </Button>}
                    >
                        <FormPlaceholder/>
                    </AppModal>
                    <Link href="/schools/activities/clubs/1">
                        <Button className='xl:w-[150px]'>
                            <ArrowRight className='size-4 me-1'/>
                            <span className='hidden md:block'> View Club</span>
                        </Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Clubs</CardTitle>
                        <CardDescription>List of clubs for 2024 - 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DatatablePlaceholder/>
                    </CardContent>
                </Card>
            </div>
        </AppContent>
    )
}