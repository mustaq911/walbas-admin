import AppEditor from '@/components/editor/app-editor'
import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const EmailTemplateTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AcademicYearPlaceholder/>
                <AppModal
                    title='Add Template'
                    description='Add New Template'
                    width='w-[80vw]'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Template
                    </Button>}
                >
                   <AppEditor defaultValue='sample'/>
                   <div className="justify-end flex mt-3">
                        <Button className='xl:w-[150px] w-full'>Save</Button>
                   </div>
                  
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>List of all email templates</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default EmailTemplateTab