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


const SlotExceptionTab = () => {
    const events = [
        {   
            id: "1",
            title: "Math Class",
            start: "2025-02-25T09:00:00",
            end: "2025-02-25T10:30:00",
            description: "Math class for grade 10",
            backgroundColor: "#4CAF50",
            borderColor: "#388E3C",
        },
        {
            
            id: "2",
            title: "History Class",
            start: "2025-02-25T11:00:00",
            end: "2025-02-25T12:30:00",
            description: "History class for grade 10",
            backgroundColor: "#FF9800",
            borderColor: "#F57C00",
        },
        // Timetable exceptions (for example, class rescheduling or cancellation)
        {   
            id: "3",
            title: "Math Class - Rescheduled",
            start: "2025-02-26T09:00:00",
            end: "2025-02-26T10:30:00",
            description: "Rescheduled Math class",
            backgroundColor: "#FF5722", // Different color to indicate the exception
            borderColor: "#D32F2F",
        },
        {   
            id : "4",
            title: "History Class - Canceled",
            start: "2025-02-25T11:00:00",
            end: "2025-02-25T12:30:00",
            description: "History class canceled",
            backgroundColor: "#B71C1C", // Red color to indicate cancellation
            borderColor: "#FF1744",
            textColor: "#fff", // Make the text color white to stand out on the red background
        },
    ]
      
    
    const [tableView, setTableView] = React.useState(false);

    return (
        <Card>
            <CardHeader>
                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <CardTitle>Slot Exception Timetable</CardTitle>
                        <CardDescription>Slot Exception Timetable for school year 2025-2026</CardDescription>
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

export default SlotExceptionTab
