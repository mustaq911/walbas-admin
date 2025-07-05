import AppContent from '@/components/admin/content/app-content'
import AppModal from '@/components/modal/app-modal'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Pen, Plus } from 'lucide-react'
import React from 'react'


export default function TimetableSettings() {
    return (
        <AppContent title="Timetable Settings">
            <div className="grid grid-cols-12  gap-2">
                <div className="xl:col-span-3 col-span-12">
                    <Card>
                        <CardHeader>
                            <div className="flex">
                                <div>
                                    <CardTitle>Student Name Format</CardTitle>
                                    <CardDescription>First name, last name - E.g. John Smith</CardDescription>
                                </div>
                                <div className='ml-auto'>
                                    <AppModal
                                        title='Edit Student Name Format'
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
                <div className="xl:col-span-3 col-span-12">
                    <Card>
                        <CardHeader>
                            <div className="flex">
                                <div>
                                    <CardTitle>Course Name Format</CardTitle>
                                    <CardDescription>Code Only - e.g EN10</CardDescription>
                                </div>
                                <div className='ml-auto'>
                                    <AppModal
                                        title='Edit Fallback Staff'
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
                 
                <div className="xl:col-span-6 col-span-12"></div>
                <div className="xl:col-span-6 col-span-12">
                    <Card>
                        <CardHeader>
                            <div className="flex">
                                <div className="flex-col">
                                    <CardTitle>Timetable Periods</CardTitle>
                                    <CardDescription>If you define timetable periods, you can print simpler, period-based timetables.</CardDescription>
                                </div>
                                <AppModal
                                    title='Add Timetable Period'
                                    button={
                                        <Button size="icon" className='ml-auto'><Plus/></Button>
                                    }
                                >
                                    <FormPlaceholder/>
                                </AppModal>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <DatatablePlaceholder/>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="xl:col-span-6 col-span-12">
                    <Card>
                        <CardHeader>
                            <div className="flex">
                                <div className="flex-col">
                                    <CardTitle>Staffs Abbreviation</CardTitle>
                                    <CardDescription>In this section, you can edit the abbreviations of teacher names.</CardDescription>
                                </div>
                                <AppModal
                                    title='Add Timetable Period'
                                    button={
                                        <Button size="icon" className='ml-auto'><Plus/></Button>
                                    }
                                >
                                    <FormPlaceholder/>
                                </AppModal>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <DatatablePlaceholder/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppContent>
    )
}


