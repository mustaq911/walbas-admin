import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const PositionTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
               
                <AcademicYearPlaceholder/>
                <AppModal
                    title='Add Category'
                    description='Add new position category'
                    button={<Button variant="outline">
                        <Plus className='size-4 me-1'/> Add Category
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
                <AppModal
                    title='Add Position'
                    description='Add New Position'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Position
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Positions</CardTitle>
                    <CardDescription>List of all Positions</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default PositionTab