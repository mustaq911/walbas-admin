import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DemoTable from '@/components/placeholder/demo-table'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { trips } from '@/constants/mock-data/trips'
import { Plus } from 'lucide-react'
import React from 'react'
import { TripColumns } from './columns'

const MasterlistTrip = () => {

    const TripData = trips;
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AcademicYearPlaceholder/>
                <AppModal
                    title='Add Trip'
                    description='Add New Trip'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Trip
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Masterlist</CardTitle>
                    <CardDescription>List of all Trips</CardDescription>
                </CardHeader>
                <CardContent>
                    <DemoTable data={TripData} columns={TripColumns} />
                </CardContent>
            </Card>
        </div>
    )
}

export default MasterlistTrip