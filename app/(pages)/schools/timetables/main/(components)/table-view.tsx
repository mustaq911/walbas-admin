import { Badge } from '@/components/ui/badge';
import React from 'react';

interface Event {
    id: string;
    title: string;
    daysOfWeek?: number[];
    startTime?: string;
    endTime?: string;
    start?: string;
    end?: string;
    backgroundColor: string;
}

interface TableViewProps {
    events: Event[];
}

const TableView: React.FC<TableViewProps> = ({ events }) => {
    const dayMap: Record<number, string> = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
    };
      
    return (
        <div className='h-[65dvh] overflow-y-auto'>
        {events?.map((event, index) => (
                <div key={`${index}`} className='border rounded-lg mb-2 p-2'>
                    <Badge style={{backgroundColor: event.backgroundColor}}>{event.title}</Badge>
                    {event.daysOfWeek && (
                        <p>Days: {event.daysOfWeek.map((day) => dayMap[day]).join(', ')}</p>
                    )}
                    {event.startTime && event.endTime && (
                        <p>
                            Time: {event.startTime} - {event.endTime}
                        </p>
                    )}
                    {event.start && event.end && (
                        <p>
                            Date: {new Date(event.start).toLocaleDateString()} to {new Date(event.end).toLocaleDateString()}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TableView;
