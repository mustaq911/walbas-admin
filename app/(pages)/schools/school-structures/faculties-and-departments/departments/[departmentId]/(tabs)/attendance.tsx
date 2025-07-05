
import AppModal from '@/components/modal/app-modal'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const AttendanceTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AppModal
                    title='Add Attendance'
                    description='Add New Attendance'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Attendance
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle> Attendances</CardTitle>
                    <CardDescription>List of all attendances</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default AttendanceTab