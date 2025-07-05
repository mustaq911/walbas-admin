"use client"

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppContent from '@/components/admin/content/app-content';
import AppModal from '@/components/modal/app-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import FormPlaceholder from '@/components/placeholder/form-placeholder';
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder';



export default function WorkingDayPage() {
    return (
        <AppContent title="Working Days">
            <div className="flex gap-2 mb-2 justify-end">
                <AcademicYearPlaceholder/>
                <AppModal
                    title='Add Term'
                    description='Add New Term'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Working Days
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>  
             <Card>
                <CardHeader>
                    <CardTitle>Working Days</CardTitle>
                    <CardDescription>Working Days for Academic Year 2026-2027</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <FullCalendar
                                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                                initialView="dayGridMonth"
                                headerToolbar={{
                                    left: 'prev,next', 
                                    center: 'title', 
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                                }}
                                height="60vh"
                                buttonText={{
                                    today: 'Today',
                                    month: 'Month',
                                    week: 'Week',
                                    day: 'Day',
                                }}
                            />
                        </div>
                    </div>
                  
                </CardContent>
            </Card>
        </AppContent>
    )
}

