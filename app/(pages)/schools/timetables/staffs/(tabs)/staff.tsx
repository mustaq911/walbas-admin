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


const StaffTab = () => {
    const events = [
        {
            id: "1",
            title: "Math Class - John Doe",
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "09:00:00",
            endTime: "11:00:00",
            backgroundColor: "#4CAF50",
        },
        {
            id: "1a",
            title: "Math Class - Jane Smith",
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "09:00:00",
            endTime: "11:00:00",
            backgroundColor: "#4CAF50",
        },
        {
            id: "2",
            title: "Science Class - Alice Johnson",
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "10:00:00",
            endTime: "12:00:00",
            backgroundColor: "#2196F3",
        },
        {
            id: "2a",
            title: "Science Class - Mark Davis",
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "10:00:00",
            endTime: "12:00:00",
            backgroundColor: "#2196F3",
        },
        {
            id: "3",
            title: "History Lecture - Samuel Lee",
            daysOfWeek: [1, 2, 3, 4],
            startTime: "11:00:00",
            endTime: "13:00:00",
            backgroundColor: "#FFC107",
        },
        {
            id: "3a",
            title: "History Lecture - Catherine Green",
            daysOfWeek: [1, 2, 3, 4],
            startTime: "11:00:00",
            endTime: "13:00:00",
            backgroundColor: "#FFC107",
        },
        {
            id: "4",
            title: "Physical Education - Ethan Brown",
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "10:30:00",
            endTime: "12:00:00",
            backgroundColor: "#FF5722",
        },
        {
            id: "4a",
            title: "Physical Education - Olivia White",
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "10:30:00",
            endTime: "12:00:00",
            backgroundColor: "#FF5722",
        },
        {
            id: "5",
            title: "Computer Science - James Black",
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "11:00:00",
            endTime: "13:00:00",
            backgroundColor: "#9C27B0",
        },
        {
            id: "5a",
            title: "Computer Science - Sophia Wilson",
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "11:00:00",
            endTime: "13:00:00",
            backgroundColor: "#9C27B0",
        },
        {
            id: "6",
            title: "Special Seminar - Emma Miller",
            start: "2025-02-01T10:00:00",
            end: "2025-02-01T12:00:00",
            backgroundColor: "#E91E63",
        },
        {
            id: "6a",
            title: "Special Seminar - Lucas Moore",
            start: "2025-02-02T10:00:00",
            end: "2025-02-02T12:00:00",
            backgroundColor: "#E91E63",
        },
        {
            id: "7",
            title: "Art Workshop - Isabella Taylor",
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "10:30:00",
            endTime: "12:00:00",
            backgroundColor: "#3F51B5",
        },
        {
            id: "7a",
            title: "Art Workshop - Liam Harris",
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "10:30:00",
            endTime: "12:00:00",
            backgroundColor: "#3F51B5",
        }
    ];
    
    const [tableView, setTableView] = React.useState(false);

    return (
        <Card>
            <CardHeader>
                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <CardTitle>Staff Timetable</CardTitle>
                        <CardDescription>Staff Timetable for school year 2025-2026</CardDescription>
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

export default StaffTab
