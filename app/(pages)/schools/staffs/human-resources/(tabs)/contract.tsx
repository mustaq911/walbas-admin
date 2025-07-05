import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const ContractTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AcademicYearPlaceholder/>
                <AppModal
                    title='Add Contract'
                    description='Add New Contract'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Contract
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Contracts</CardTitle>
                    <CardDescription>List of all Contracts</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default ContractTab