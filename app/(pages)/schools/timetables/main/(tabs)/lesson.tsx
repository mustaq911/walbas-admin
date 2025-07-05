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


const CalendarTab = () => {
    const events = [
        {
            id: '1',
            title: 'Math Class',
            daysOfWeek: [1, 3], // Monday and Wednesday
            startTime: '09:00:00', // Time the event starts
            endTime: '10:30:00',   // Time the event ends
            backgroundColor: '#4CAF50',
        },
        {
            id: '2',
            title: 'Science Class',
            daysOfWeek: [2, 4], // Tuesday and Thursday
            startTime: '11:00:00',
            endTime: '12:30:00',
            backgroundColor: '#2196F3',
        },
        {
            id: '3',
            title: 'History Lecture',
            daysOfWeek: [3], // Wednesday only
            startTime: '13:00:00',
            endTime: '14:30:00',
            backgroundColor: '#FFC107',
        },
        {
            id: '4',
            title: 'Physical Education',
            daysOfWeek: [4], // Thursday
            startTime: '15:00:00',
            endTime: '16:30:00',
            backgroundColor: '#FF5722',
        },
        {
            id: '5',
            title: 'Computer Science',
            daysOfWeek: [5], // Friday
            startTime: '10:00:00',
            endTime: '11:30:00',
            backgroundColor: '#9C27B0',
        },
        {
            id: '6',
            title: 'Special Seminar',
            start: '2025-02-20T14:00:00', // One-time event (fixed date)
            end: '2025-02-20T16:00:00',
            backgroundColor: '#E91E63',
        },
    ]
    
    const [tableView, setTableView] = React.useState(false);

    return (
        <Card>
            <CardHeader>
                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <CardTitle>Lesson Timetable</CardTitle>
                        <CardDescription>Lesson Timetable for school year 2025-2026</CardDescription>
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

export default CalendarTab
