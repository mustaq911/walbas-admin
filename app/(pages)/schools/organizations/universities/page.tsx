import AppContent from '@/components/admin/content/app-content'
import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {Plus } from 'lucide-react'
import React from 'react'

export default function UniversityPage(){
    return (
        <AppContent title="Universities">
            <div>
                <div className="flex gap-2 mb-2 justify-end">
                    <AcademicYearPlaceholder/>
                    <AppModal
                        title='Add University'
                        description='Add New University'
                        button={<Button>
                            <Plus className='size-4 me-1'/> Add University
                        </Button>}
                    >
                        <FormPlaceholder/>
                    </AppModal>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Universities</CardTitle>
                        <CardDescription>List of companies for 2024 - 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DatatablePlaceholder/>
                    </CardContent>
                </Card>
            </div>
        </AppContent>
    )
}