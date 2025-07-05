import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const SchedulingTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AcademicYearPlaceholder/>
                <AppModal
                    title='Add Scheduling'
                    description='Add New Scheduling'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Scheduling
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Scheduling Slots</CardTitle>
                    <CardDescription>The Scheduling tab shows which timetable slots are being scheduled from the provisional tab,
                         or are being rescheduled when you bulk change the start or end date or time.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default SchedulingTab