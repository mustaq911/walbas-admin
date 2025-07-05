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
import FormPlaceholder from '@/components/placeholder/form-placeholder';
import TableView from '../../main/(components)/table-view';

export default function ViewStudentTimetable(){
    const events = [
        {
            id: '1',
            title: 'Math Class',
            daysOfWeek: [1, 3], // Monday and Wednesday
            startTime: '09:00:00',
            endTime: '11:00:00', // Extended to overlap with Science
            backgroundColor: '#4CAF50',
        },
        {
            id: '2',
            title: 'Science Class',
            daysOfWeek: [1, 3], // Overlapping days
            startTime: '10:00:00', // Starts during Math Class
            endTime: '12:00:00',
            backgroundColor: '#2196F3',
        },
        {
            id: '3',
            title: 'History Lecture',
            daysOfWeek: [3], // Wednesday only
            startTime: '11:00:00', // Starts right after Science
            endTime: '13:00:00',
            backgroundColor: '#FFC107',
        },
        {
            id: '4',
            title: 'Physical Education',
            daysOfWeek: [4], // Thursday
            startTime: '10:30:00', // Overlaps with Computer Science
            endTime: '12:00:00',
            backgroundColor: '#FF5722',
        },
        {
            id: '5',
            title: 'Computer Science',
            daysOfWeek: [4], // Thursday
            startTime: '11:00:00', // Starts during Physical Education
            endTime: '13:00:00',
            backgroundColor: '#9C27B0',
        },
        {
            id: '6',
            title: 'Special Seminar',
            start: '2025-02-20T10:00:00', // Overlaps with others
            end: '2025-02-20T12:00:00',
            backgroundColor: '#E91E63',
        },
        {
            id: '7',
            title: 'Art Workshop',
            daysOfWeek: [5], // Friday
            startTime: '10:30:00', // Overlaps with Computer Science
            endTime: '12:00:00',
            backgroundColor: '#3F51B5',
        },
    ];
    
    
    const [tableView, setTableView] = React.useState(false);

    return (
        <Card>
            <CardHeader>
                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <CardTitle>Student Timetable</CardTitle>
                        <CardDescription>Student Timetable for school year 2025-2026</CardDescription>
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
                        initialView="timeGridWeek"
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

