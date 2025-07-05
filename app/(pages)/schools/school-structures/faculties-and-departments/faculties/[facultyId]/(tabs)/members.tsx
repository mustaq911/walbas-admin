
import AppModal from '@/components/modal/app-modal'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const MemberTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AppModal
                    title='Add Member'
                    description='Add New Member'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Member
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle> Members </CardTitle>
                    <CardDescription>List of all faculty members</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default MemberTab