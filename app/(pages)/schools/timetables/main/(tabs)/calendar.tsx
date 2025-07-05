"use client"

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, FilterIcon, Database, TableIcon } from 'lucide-react';
import AppModal from '@/components/modal/app-modal';
import TableView from '../(components)/table-view';
import FormPlaceholder from '@/components/placeholder/form-placeholder';

const subjectColors: Record<string, string> = {
    Math: '#22C55E',
    Science: '#F59E0B',
    English: '#3B82F6',
    History: '#8B5CF6',
    Geography: '#F43F5E',
    Art: '#84CC16',
    PE: '#475569',
};
  
const CalendarTab = () => {
    const sections = [
        {
          name: 'Section 1',
          schedule: [
            { subject: 'Math', startTime: '08:00', endTime: '09:00' },
            { subject: 'Science', startTime: '09:00', endTime: '10:00' },
            { subject: 'English', startTime: '10:00', endTime: '11:00' },
            { subject: 'History', startTime: '11:00', endTime: '12:00' },
            { subject: 'Geography', startTime: '13:00', endTime: '14:00' },
            { subject: 'Art', startTime: '14:00', endTime: '15:00' },
            { subject: 'PE', startTime: '15:00', endTime: '16:00' },
          ]
        },
        {
          name: 'Section 2',
          schedule: [
            { subject: 'Math', startTime: '08:30', endTime: '09:30' },
            { subject: 'Science', startTime: '09:30', endTime: '10:30' },
            { subject: 'English', startTime: '10:30', endTime: '11:30' },
            { subject: 'History', startTime: '11:30', endTime: '12:30' },
            { subject: 'Geography', startTime: '13:30', endTime: '14:30' },
            { subject: 'Art', startTime: '14:30', endTime: '15:30' },
            { subject: 'PE', startTime: '15:30', endTime: '16:30' },
          ]
        },
        {
          name: 'Section 3',
          schedule: [
            { subject: 'Math', startTime: '08:45', endTime: '09:45' },
            { subject: 'Science', startTime: '09:45', endTime: '10:45' },
            { subject: 'English', startTime: '10:45', endTime: '11:45' },
            { subject: 'History', startTime: '11:45', endTime: '12:45' },
            { subject: 'Geography', startTime: '13:45', endTime: '14:45' },
            { subject: 'Art', startTime: '14:45', endTime: '15:45' },
            { subject: 'PE', startTime: '15:45', endTime: '16:45' },
          ]
        },
        {
          name: 'Section 4',
          schedule: [
            { subject: 'Math', startTime: '09:00', endTime: '10:00' },
            { subject: 'Science', startTime: '10:00', endTime: '11:00' },
            { subject: 'English', startTime: '11:00', endTime: '12:00' },
            { subject: 'History', startTime: '12:00', endTime: '13:00' },
            { subject: 'Geography', startTime: '14:00', endTime: '15:00' },
            { subject: 'Art', startTime: '15:00', endTime: '16:00' },
            { subject: 'PE', startTime: '16:00', endTime: '17:00' },
          ]
        },
        {
          name: 'Section 5',
          schedule: [
            { subject: 'Math', startTime: '07:45', endTime: '08:45' },
            { subject: 'Science', startTime: '08:45', endTime: '09:45' },
            { subject: 'English', startTime: '09:45', endTime: '10:45' },
            { subject: 'History', startTime: '10:45', endTime: '11:45' },
            { subject: 'Geography', startTime: '12:45', endTime: '13:45' },
            { subject: 'Art', startTime: '13:45', endTime: '14:45' },
            { subject: 'PE', startTime: '14:45', endTime: '15:45' },
          ]
        }
      ];
    
      // Store the generated events
      const events = [];
      const february2025StartDate = new Date(2025, 1, 1); // February 1, 2025
      const february2025EndDate = new Date(2025, 1, 28); // February 28, 2025
    
      // Loop through each day of February 2025 and generate events for each section
      let count = 0;
      for (let date = new Date(february2025StartDate); date <= february2025EndDate; date.setDate(date.getDate() + 1)) {
        // Only add events for Sunday (0) to Thursday (4)
        if (date.getDay() >= 0 && date.getDay() <= 4) {
            sections.forEach((section) => {
                section.schedule.forEach((subjectSchedule) => {
                const { subject, startTime, endTime } = subjectSchedule;
                
                const [startHour, startMinute] = startTime.split(':').map(Number);
                const [endHour, endMinute] = endTime.split(':').map(Number);
        
                // Set the start time for the event
                const eventStart = new Date(date);
                eventStart.setHours(startHour, startMinute, 0, 0);
        
                // Set the end time for the event
                const eventEnd = new Date(date);
                eventEnd.setHours(endHour, endMinute, 0, 0);
        
                // Get the color for the subject from the subjectColors mapping
                const eventColor = subjectColors[subject] || 'gray'; // Default to gray if not found
        
                events.push({
                    id: `${count}-${section.name}-${subject}`,
                    title: `${subject} - ${section.name}`,
                    start: eventStart,
                    end: eventEnd,
                    description: `${section.name} - ${subject}`,
                    color: eventColor,
                    backgroundColor: eventColor,
                });
                });
            });
            count++;
        }
    }
    const [tableView, setTableView] = React.useState(false);

    return (
        <div>
            <AppModal title='Import Timetable'
                description='Import timetable from a file'
                button={
                    <Button size="sm">
                        <Database/>   Import Timetable
                    </Button>
                }>
                <FormPlaceholder/>
            </AppModal>
            <Card className='mt-2'>
                <CardHeader>
                    <div className="grid grid-cols-12">
                        <div className="col-span-6">
                            <CardTitle>Timetables</CardTitle>
                            <CardDescription>Timetable for school year 2025-2026</CardDescription>
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
        </div>
    )
}

export default CalendarTab
