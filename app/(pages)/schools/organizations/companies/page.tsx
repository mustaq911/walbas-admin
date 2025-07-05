import AppContent from '@/components/admin/content/app-content'
import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {Plus } from 'lucide-react'
import React from 'react'

export default function CompanyPage(){
    return (
        <AppContent title="Companies">
            <div>
                <div className="flex gap-2 mb-2 justify-end">
                    <AcademicYearPlaceholder/>
                    <AppModal
                        title='Add Company'
                        description='Add New Company'
                        button={<Button>
                            <Plus className='size-4 me-1'/> Add Company
                        </Button>}
                    >
                        <FormPlaceholder/>
                    </AppModal>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Companies</CardTitle>
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