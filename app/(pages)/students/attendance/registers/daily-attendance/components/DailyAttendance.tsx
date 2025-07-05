"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Calendar, Clock, Filter, Search, UserRound, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AttendanceDashboard() {


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Button variant="destructive" className="gap-2 bg-red-600 hover:bg-red-700">
          <AlertCircle className="h-4 w-4" />
          Emergency Register
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Today
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Event Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
          <TabsTrigger value="trips">Trips</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <EventsGrid events={events} />
        </TabsContent>
        <TabsContent value="lessons" className="space-y-4">
          <EventsGrid events={events.filter((event) => event.type === "Lesson")} />
        </TabsContent>
        <TabsContent value="clubs" className="space-y-4">
          <EventsGrid events={events.filter((event) => event.type === "Club")} />
        </TabsContent>
        <TabsContent value="trips" className="space-y-4">
          <EventsGrid events={events.filter((event) => event.type === "Trip")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EventsGrid({ events }: { events: Event[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Sheet key={event.id}>
          <SheetTrigger asChild>
            <Card className="cursor-pointer transition-colors hover:bg-accent/5">
              <CardHeader className="space-y-0 pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant={event.status === "in_progress" ? "default" : "secondary"}>
                    {event.status === "in_progress" ? "In Progress" : "Upcoming"}
                  </Badge>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                <CardTitle className="text-lg font-semibold">{event.name}</CardTitle>
                <CardDescription>{event.yearGroup}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-muted-foreground" />
                    <span>{event.teacher}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Attendance</span>
                    <span className="font-medium">{event.attendance}%</span>
                  </div>
                  <Progress value={Number.parseInt(event.attendance)} className="mt-2 h-2" />
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-green-600">Present: {event.presentCount}</span>
                  <span className="text-red-600">Absent: {event.absentCount}</span>
                  <span className="text-yellow-600">Late: {event.lateCount}</span>
                </div>
              </CardContent>
            </Card>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-xl">
            <AttendanceRegister event={event} />
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}

function AttendanceRegister({ event }: { event: Event }) {
  const [students, setStudents] = useState(defaultStudents)

  const toggleAttendance = (studentId: number, status: "present" | "absent" | "late") => {
    setStudents(students.map((student) => (student.id === studentId ? { ...student, status } : student)))
  }

  const attendanceSummary = students.reduce(
    (acc, student) => {
      acc[student.status]++
      return acc
    },
    { present: 0, absent: 0, late: 0 },
  )

  return (
    <div className="h-full flex flex-col">
      <SheetHeader>
        <SheetTitle>{event.name}</SheetTitle>
        <SheetDescription>
          {event.type} - {event.time}
        </SheetDescription>
      </SheetHeader>
      <div className="flex items-center justify-between mt-4 mb-2">
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-2">
            <UserRound className="h-4 w-4" />
            {event.teacher}
          </Badge>
          <Badge variant="outline" className="gap-2">
            <Users className="h-4 w-4" />
            {students.length} Students
          </Badge>
        </div>
        <Button size="sm">Save Register</Button>
      </div>
      <div className="grid grid-cols-3 gap-2 my-4">
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-sm font-medium text-green-600">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceSummary.present}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-sm font-medium text-red-600">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceSummary.absent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Late</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceSummary.late}</div>
          </CardContent>
        </Card>
      </div>
      <ScrollArea className="flex-1 -mx-6">
        <div className="px-6 space-y-4">
          {students.map((student) => (
            <Card key={student.id}>
              <CardContent className="p-3">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?${student.id}`} />
                    <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">{student.name}</p>
                    <p className="text-sm text-muted-foreground">#{student.id.toString().padStart(4, "0")}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={student.status === "present" ? "default" : "outline"}
                      className={cn("w-24", student.status === "present" && "bg-green-500 hover:bg-green-600")}
                      onClick={() => toggleAttendance(student.id, "present")}
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "absent" ? "default" : "outline"}
                      className={cn("w-24", student.status === "absent" && "bg-red-500 hover:bg-red-600")}
                      onClick={() => toggleAttendance(student.id, "absent")}
                    >
                      Absent
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "late" ? "default" : "outline"}
                      className={cn("w-24", student.status === "late" && "bg-yellow-500 hover:bg-yellow-600")}
                      onClick={() => toggleAttendance(student.id, "late")}
                    >
                      Late
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

interface Event {
  id: number
  name: string
  yearGroup: string
  time: string
  teacher: string
  attendance: string
  status: "in_progress" | "upcoming"
  type: "Lesson" | "Club" | "Trip"
  presentCount: number
  absentCount: number
  lateCount: number
}

const events: Event[] = [
  {
    id: 1,
    name: "Year 7 Mathematics",
    yearGroup: "Year 7",
    time: "08:45 - 09:45",
    teacher: "Ms. Davis",
    attendance: "92",
    status: "in_progress",
    type: "Lesson",
    presentCount: 28,
    absentCount: 2,
    lateCount: 1,
  },
  {
    id: 2,
    name: "Year 8 English",
    yearGroup: "Year 8",
    time: "09:00 - 10:00",
    teacher: "Mr. Hunt",
    attendance: "88",
    status: "upcoming",
    type: "Lesson",
    presentCount: 26,
    absentCount: 3,
    lateCount: 2,
  },
  {
    id: 3,
    name: "KS3 Holiday Club",
    yearGroup: "KS3",
    time: "09:00 - 15:00",
    teacher: "Mr. Butler",
    attendance: "95",
    status: "in_progress",
    type: "Club",
    presentCount: 19,
    absentCount: 1,
    lateCount: 0,
  },
  {
    id: 4,
    name: "Year 9 Science Trip",
    yearGroup: "Year 9",
    time: "08:30 - 14:30",
    teacher: "Mrs. Johnson",
    attendance: "98",
    status: "in_progress",
    type: "Trip",
    presentCount: 32,
    absentCount: 0,
    lateCount: 1,
  },
  // Add more events as needed
]

const defaultStudents = [
  { id: 1, name: "Alice Johnson", status: "present" as const },
  { id: 2, name: "Bob Smith", status: "absent" as const },
  { id: 3, name: "Charlie Brown", status: "present" as const },
  { id: 4, name: "Diana Ross", status: "late" as const },
  { id: 5, name: "Edward Norton", status: "present" as const },
  { id: 6, name: "Fiona Apple", status: "present" as const },
  { id: 7, name: "George Michael", status: "absent" as const },
  { id: 8, name: "Hannah Montana", status: "present" as const },
  // Add more students as needed
]

