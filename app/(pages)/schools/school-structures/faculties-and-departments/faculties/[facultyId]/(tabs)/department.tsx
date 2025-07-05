
import AppModal from '@/components/modal/app-modal'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const LinkDepartmentTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AppModal
                    title='Link Department'
                    description='Link New Department'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Link Department
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle> Linked Departments </CardTitle>
                    <CardDescription>List of all linked departments</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default LinkDepartmentTab