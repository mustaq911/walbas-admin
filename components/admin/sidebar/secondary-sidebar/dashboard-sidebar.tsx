import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader } from '@/components/ui/sidebar'
import { Calendar } from '@/components/ui/calendar'
import { Bell, CalendarIcon, ListCheck, MessageCircle, NotebookPen, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const DashboardSidebar = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const tasks = [
        {
            "id": 1,
            "title": "Grade Assignments",
            "description": "Review and grade students math assignments.",
            "status": "in-progress",
            "priority": "high",
            "due_date": "2024-11-10",
            "bg_color": "bg-red-100"
        },
        {
            "id": 2,
            "title": "Update Attendance Records",
            "description": "Ensure all student attendance is updated for October.",
            "status": "pending",
            "priority": "medium",
            "due_date": "2024-11-08",
            "bg_color": "bg-yellow-100"
        },
        {
            "id": 3,
            "title": "Schedule Parent-Teacher Meeting",
            "description": "Organize a meeting to discuss student progress.",
            "status": "completed",
            "priority": "low",
            "due_date": "2024-11-05",
            "bg_color": "bg-green-100"
        },
        {
            "id": 4,
            "title": "Prepare Exam Timetable",
            "description": "Draft and finalize the examination schedule.",
            "status": "pending",
            "priority": "high",
            "due_date": "2024-11-12",
            "bg_color": "bg-blue-100"
        },
        {
            "id": 5,
            "title": "Update Student Profiles",
            "description": "Add new student data and update existing records.",
            "status": "in-progress",
            "priority": "medium",
            "due_date": "2024-11-15",
            "bg_color": "bg-purple-100"
        },
        {
            "id": 6,
            "title": "Inventory Check",
            "description": "Audit classroom supplies and order missing items.",
            "status": "pending",
            "priority": "low",
            "due_date": "2024-11-20",
            "bg_color": "bg-indigo-100"
        }
    ];
    return (
        <Sidebar collapsible='none' className="flex-1 md:flex">
            <SidebarHeader className="pl-4">
                <div className="flex w-full flex-col">
                    <div className="font-medium text-foreground text-lg">
                        Dashboard</div>
                    <div className="text-xs">Manage your dashboard here</div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="px-0">
                    <SidebarGroupContent className='p-4'>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                        <div className="border rounded-lg p-3 mt-3">
                            <div className='font-bold flex mb-3'>To Do
                                <Badge variant="destructive" className='rounded-full ml-auto'>{tasks.length}</Badge>
                            </div>
                            <div className='h-[30dvh] overflow-auto'>
                                {tasks.map((task) => (
                                    <div
                                    key={task.id}
                                    className={`p-3 rounded-lg  ${task.bg_color} mb-2`}
                                    >   
                                        {task.priority == "medium" && (<Badge className='bg-amber-500'>Medium</Badge>)}
                                        {task.priority == "low" && (<Badge className='bg-emerald-500'>Low</Badge>)}
                                        {task.priority == "high" && (<Badge className='bg-rose-500'>High</Badge>)}
                                        <div className="text-xs flex mt-2">
                                            <CalendarIcon className='me-1 size-3'/> {task.due_date}
                                        </div>
                                        <p className="font-semibold">{task.title}</p>
                                        <p className="text-xs text-gray-600">{task.description}</p>
                                        
                                     
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            <div className="col-span-1">
                                <button className=" rounded-xl flex flex-col p-3 w-full items-center justify-center hover:bg-secondary">
                                    <Bell/>
                                    <span className='text-xs'>Notifications</span>
                                </button>
                            </div>
                            <div className="col-span-1">
                                <button className=" rounded-xl flex flex-col p-3 w-full items-center justify-center hover:bg-secondary">
                                    <Star/>
                                    <span className='text-xs'>Favourites</span>
                                </button>
                            </div>
                            <div className="col-span-1">
                                <button className=" rounded-xl flex flex-col p-3 w-full items-center justify-center hover:bg-secondary">
                                    <NotebookPen/>
                                    <span className='text-xs'>Reminders</span>
                                </button>
                            </div>
                            <div className="col-span-1">
                                <button className=" rounded-xl flex flex-col p-3 w-full items-center justify-center hover:bg-secondary">
                                    <MessageCircle/>
                                    <span className='text-xs'>Message</span>
                                </button>
                            </div>
                            <div className="col-span-1">
                                <button className=" rounded-xl flex flex-col p-3 w-full items-center justify-center hover:bg-secondary">
                                    <ListCheck/>
                                    <span className='text-xs'>To do</span>
                                </button>
                            </div>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default DashboardSidebar