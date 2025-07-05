"use client"

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, FilterIcon, TableIcon } from 'lucide-react';
import AppModal from '@/components/modal/app-modal';
import TableView from '../(components)/table-view';
import FormPlaceholder from '@/components/placeholder/form-placeholder';


const EventTab = () => {
    const events = [
        {
            id: "1",
            title: "Math Exam",
            start: "2025-02-10",
            type: "exam",
        },
        {
            id: "2",
            title: "Science Fair",
            start: "2025-02-15",
            type: "event",
        },
        {
            id: "3",
            title: "Parent-Teacher Meeting",
            start: "2025-02-20",
            type: "meeting",
        },
        {
            id: "4",
            title: "Summer Break",
            start: "2025-02-23",
            end: "2025-02-31",
            type: "holiday",
        },
    ]
      
    
    const [tableView, setTableView] = React.useState(false);

    return (
        <Card>
            <CardHeader>
                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <CardTitle>Event Timetable</CardTitle>
                        <CardDescription>Event Timetable for school year 2025-2026</CardDescription>
                    </div>
                    <div className="col-span-6">
                        <div className="flex justify-end gap-2">
                            <Button variant={tableView? "outline": "" } size="sm"
                                onClick={()=>{setTableView(false)}}>
                                <CalendarIcon/>
                            </Button>
                            <Button variant={tableView? "" : "outline"} size="sm"
                                onClick={()=>{setTableView(true)}}>
                                <TableIcon/>
                            </Button>
                            <AppModal title='Filter Timetable'
                                button={
                                    <Button variant="outline" size="sm">
                                        <FilterIcon/>
                                    </Button>
                                }
                            >
                                <FormPlaceholder/>
                            </AppModal>
                        </div>
                    </div>
                </div>
                
            </CardHeader>
            <CardContent>
                {tableView ? (
                    <TableView events={events}/>
                ) : (
                    
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
                        events = {events}
                    />
                )}
            </CardContent>
        </Card>
    )
}

export default EventTab
