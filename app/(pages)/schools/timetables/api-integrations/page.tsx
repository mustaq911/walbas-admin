import AppContent from '@/components/admin/content/app-content'
import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderDown, FolderUp } from 'lucide-react'
import React from 'react'


export default function TimetableApiIntegration() {
    return (
        <AppContent title="Timetable API Integration">
            <div className="flex gap-2 mb-2 justify-end">
                <AcademicYearPlaceholder/>
                <AppModal
                    title='Import'
                    description='Import Timetable'
                    button={<Button>
                        <FolderUp className='size-4 me-1'/> Import
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
                <AppModal
                    title='Export'
                    description='Export Timetable'
                    button={<Button>
                        <FolderDown className='size-4 me-1'/> Export
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>List of Imports</CardTitle>
                    <CardDescription>List of all Imports for 2025-2026</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </AppContent>
    )
}
