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


const RoomTimetableTab = () => {
    const events =[
        {
          "id": "1",
          "title": "Room A - Parent Meeting",
          "start": "2025-02-01T09:00:00",
          "end": "2025-02-01T11:00:00",
          "backgroundColor": "#4CAF50"
        },
        {
          "id": "2",
          "title": "Room B - Science Class",
          "start": "2025-02-02T10:00:00",
          "end": "2025-02-02T11:30:00",
          "backgroundColor": "#2196F3"
        },
        {
          "id": "3",
          "title": "Room A - Math Class",
          "start": "2025-02-05T11:00:00",
          "end": "2025-02-05T12:30:00",
          "backgroundColor": "#FF5722"
        },
        {
          "id": "4",
          "title": "Room C - History Lecture",
          "start": "2025-02-07T12:00:00",
          "end": "2025-02-07T13:30:00",
          "backgroundColor": "#9C27B0"
        },
        {
          "id": "5",
          "title": "Room B - English Literature",
          "start": "2025-02-10T13:00:00",
          "end": "2025-02-10T14:30:00",
          "backgroundColor": "#00BCD4"
        },
        {
          "id": "6",
          "title": "Room D - Art Class",
          "start": "2025-02-12T14:00:00",
          "end": "2025-02-12T15:30:00",
          "backgroundColor": "#FF9800"
        },
        {
          "id": "7",
          "title": "Room A - Parent-Teacher Conference",
          "start": "2025-02-15T15:00:00",
          "end": "2025-02-15T16:30:00",
          "backgroundColor": "#3F51B5"
        },
        {
          "id": "8",
          "title": "Room C - Music Class",
          "start": "2025-02-18T16:00:00",
          "end": "2025-02-18T17:30:00",
          "backgroundColor": "#8BC34A"
        },
        {
          "id": "9",
          "title": "Room B - Computer Science",
          "start": "2025-02-20T17:00:00",
          "end": "2025-02-20T18:30:00",
          "backgroundColor": "#673AB7"
        },
        {
          "id": "10",
          "title": "Room D - Physical Education",
          "start": "2025-02-25T18:00:00",
          "end": "2025-02-25T19:30:00",
          "backgroundColor": "#FFC107"
        }
      ]
      
    
    
    const [tableView, setTableView] = React.useState(false);

    return (
        <Card>
            <CardHeader>
                <div className="grid grid-cols-12">
                    <div className="col-span-6">
                        <CardTitle>Room Timetable</CardTitle>
                        <CardDescription>Room Timetable for school year 2025-2026</CardDescription>
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

export default RoomTimetableTab
