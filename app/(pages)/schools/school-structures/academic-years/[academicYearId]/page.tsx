import AppContent from '@/components/admin/content/app-content'
import AppModal from '@/components/modal/app-modal'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pen } from 'lucide-react'
import React from 'react'
import TermTab from './(tabs)/term'
import HolidayTab from './(tabs)/holiday'

export default function AcademicYearPage(){
   return(
        <AppContent title="View Academic Year">
            <div className="grid-cols-12 grid gap-2">
                <div className="xl:col-span-3 col-span-12">
                    <Card>
                        <CardHeader>
                            <div className="flex">
                                <div>
                                    <CardTitle>Academic Year 2026-2027</CardTitle>
                                    <CardDescription>September 01, 2026 - August 31, 2027</CardDescription>
                                </div>
                                <div className='ml-auto'>
                                    <AppModal
                                        title='Edit Academic Year'
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
                    <Tabs defaultValue="terms">
                        <TabsList>
                            <TabsTrigger value="terms">Terms</TabsTrigger>
                            <TabsTrigger value="holidays">Holidays</TabsTrigger>
                        </TabsList>
                        <TabsContent value="terms">
                            <TermTab/>
                        </TabsContent>
                        <TabsContent value="holidays">
                            <HolidayTab/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
          
        </AppContent>
   )
}