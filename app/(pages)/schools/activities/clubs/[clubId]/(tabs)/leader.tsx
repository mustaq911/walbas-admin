"use client"

import AppModal from '@/components/modal/app-modal'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const ClubLeader = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex gap-2 mb-2 ">
                        <div className="flex flex-col">
                            <CardTitle>Leaders</CardTitle>
                            <CardDescription>List of all leaders</CardDescription>
                        </div>
                        <div className='ml-auto'>
                            <AppModal
                                title='Add Leader'
                                description='Add New Leader'
                                button={<Button>
                                    <Plus className='size-4 me-1'/> Add Leader
                                </Button>}
                            >
                                <FormPlaceholder/>
                            </AppModal>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default ClubLeader
