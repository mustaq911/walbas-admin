import AppContent from '@/components/admin/content/app-content'
import AppModal from '@/components/modal/app-modal'
import TabListScroll from '@/components/other/tab-list-scroll'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  Pen } from 'lucide-react'
import React from 'react'

export default function AcademicYearPage(){
   return(
        <AppContent title="View School Year">
            <div className="grid-cols-12 grid gap-2">
                <div className="xl:col-span-3 col-span-12">
                    <Card>
                        <CardHeader>
                            <div className="flex">
                                <div>
                                    <CardTitle>School Year 2026-2027</CardTitle>
                                    <CardDescription>September 01, 2026 - August 31, 2027</CardDescription>
                                </div>
                                <div className='ml-auto'>
                                    <AppModal
                                        title='Edit School Year'
                                        button={
                                            <Button size="icon" variant="outline"><Pen/></Button>
                                        }
                                    >
                                        <FormPlaceholder/>
                                    </AppModal>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
                <div className="col-span-12">
                    <Tabs defaultValue="off-roll-leavers">
                        <TabListScroll>
                            <TabsList className='mb-2'>
                                <TabsTrigger value="ogg-roll-leavers">Off-Roll Leavers</TabsTrigger>
                                <TabsTrigger value="holidays">Year Groups & Registration Forms</TabsTrigger>
                                <TabsTrigger value="custom-group"> Custom Groups
                                </TabsTrigger>
                                <TabsTrigger value="houses"> Houses
                                </TabsTrigger>
                                <TabsTrigger value="meals"> Meals
                                </TabsTrigger>
                                <TabsTrigger value="interventions"> Intenrventions
                                </TabsTrigger>
                            </TabsList>
                        </TabListScroll>
                    </Tabs>
                </div>
            </div>
          
        </AppContent>
   )
}