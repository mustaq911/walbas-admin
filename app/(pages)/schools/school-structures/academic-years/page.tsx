import AppContent from '@/components/admin/content/app-content'
import AppModal from '@/components/modal/app-modal'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AcademicYearPage(){
   return(
        <AppContent title="Academic Year Page">
            <div>
                <div className="flex gap-2 mb-2 justify-end">
                    <AppModal
                        title='Add Academic Year'
                        description='Add New Academic Year'
                        button={<Button>
                            <Plus className='size-4 me-1'/> Add Academic Year
                        </Button>}
                    >
                        <FormPlaceholder/>
                    </AppModal>
                    <Link href={`/schools/school-structures/academic-years/1`}>
                        <Button>
                            <ArrowRight className='size-4 me-1'/> View Academic Year
                        </Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Masterlist</CardTitle>
                        <CardDescription>List of all academic years</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DatatablePlaceholder/>
                    </CardContent>
                </Card>
            </div>
        </AppContent>
   )
}