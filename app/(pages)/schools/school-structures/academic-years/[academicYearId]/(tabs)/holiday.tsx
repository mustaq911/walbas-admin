"use client"

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


const HolidayTab = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Holidays</CardTitle>
                <CardDescription>Holidays for Academic Year 2026-2027</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    )
}

export default HolidayTab
