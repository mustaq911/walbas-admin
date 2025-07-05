import AppModal from '@/components/modal/app-modal'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const RolesTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AppModal
                    title='Add Role'
                    description='Add New Role'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Role
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Masterlist</CardTitle>
                    <CardDescription>List of all roles</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default RolesTab