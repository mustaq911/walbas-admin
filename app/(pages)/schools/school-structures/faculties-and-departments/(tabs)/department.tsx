
import AppModal from '@/components/modal/app-modal'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DepartmentTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AppModal
                    title='Add Department'
                    description='Add New Department'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Department
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
                <Link href={`/schools/school-structures/faculties-and-departments/departments/1`}>
                    <Button>
                        <ArrowRight className='size-4 me-1'/> View Department
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle> Departments </CardTitle>
                    <CardDescription>List of all deparments</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default DepartmentTab