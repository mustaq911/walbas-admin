
import AppModal from '@/components/modal/app-modal'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FacultyTab = () => {
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AppModal
                    title='Add Faculty'
                    description='Add New Faculty'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Faculty
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
                <Link href={`/schools/school-structures/faculties-and-departments/faculties/1`}>
                    <Button>
                        <ArrowRight className='size-4 me-1'/> View Faculty
                    </Button>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle> Faculties </CardTitle>
                    <CardDescription>List of all faculties</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default FacultyTab