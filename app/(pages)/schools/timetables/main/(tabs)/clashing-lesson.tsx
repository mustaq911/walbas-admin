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


const ClashingLessonTab = () => {
    const events = [
        {
            id: '1',
            title: 'Math Class',
            daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
            startTime: '09:00:00',
            endTime: '10:00:00', // Clashes with Science
            backgroundColor: '#4CAF50',
        },
        {
            id: '2',
            title: 'Science Class',
            daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
            startTime: '09:30:00', // Starts during Math Class
            endTime: '10:30:00',
            backgroundColor: '#2196F3',
        },
        {
            id: '3',
            title: 'History Lecture',
            daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
            startTime: '10:00:00', // Overlaps with Computer Science
            endTime: '11:00:00',
            backgroundColor: '#FFC107',
        },
        {
            id: '4',
            title: 'Computer Science',
            daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
            startTime: '10:30:00', // Clashes with History
            endTime: '11:30:00',
            backgroundColor: '#9C27B0',
        },
        {
            id: '5',
            title: 'Art Workshop',
            daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
            startTime: '11:00:00', // Overlaps with Computer Science
            endTime: '12:00:00',
            backgroundColor: '#3F51B5',
        },
        {
            id: '6',
            title: 'Special Seminar',
            daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
            startTime: '12:00:00', // Clashes with Art Workshop
            endTime: '13:00:00',
            backgroundColor: '#E91E63',
        },
        {
            id: '7',
            title: 'Physical Education',
            daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
            startTime: '13:00:00', // New clash window
            endTime: '14:00:00',
            backgroundColor: '#FF5722',
        },
        {
            id: '8',
            title: 'Music Class',
            daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
            startTime: '13:30:00', // Overlaps with Physical Education
            endTime: '14:30:00',
            backgroundColor: '#673AB7',
        },
    ];
    const [tableView, setTableView] = React.useState(false);

    return (
        <Card>
            <CardHeader>
                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <CardTitle>Clashing Lesson Timetable</CardTitle>
                        <CardDescription>Clashing Lesson Timetable for school year 2025-2026</CardDescription>
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

export default ClashingLessonTab
