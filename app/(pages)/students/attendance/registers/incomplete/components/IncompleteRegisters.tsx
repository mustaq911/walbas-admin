"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle2, Clock, Download, Search, Settings2, XCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function IncompleteRegisters() {
  const [dateRange] = useState("Thu, 06 Feb 2025 - Mon, 24 Feb 2025")
  const stats = {
    unopened: 12,
    incomplete: 8,
    validation: 3,
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Incomplete Registers</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4" />
              {dateRange}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings2 className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <Tabs defaultValue="unopened" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="w-auto">
              <TabsTrigger value="unopened" className="relative">
                Unopened
                <Badge variant="secondary" className="ml-2 bg-muted">
                  {stats.unopened}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="incomplete" className="relative">
                Incomplete
                <Badge variant="secondary" className="ml-2 bg-muted">
                  {stats.incomplete}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="validation" className="relative">
                Validation Errors
                <Badge variant="secondary" className="ml-2 bg-muted">
                  {stats.validation}
                </Badge>
              </TabsTrigger>
            </TabsList>
            <div className="relative w-[300px]">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search registers..." className="pl-8" />
            </div>
          </div>

          <TabsContent value="unopened">
            <IncompleteTable registers={registers.filter((r) => r.status === "unopened")} />
          </TabsContent>
          <TabsContent value="incomplete">
            <IncompleteTable registers={registers.filter((r) => r.status === "incomplete")} />
          </TabsContent>
          <TabsContent value="validation">
            <IncompleteTable registers={registers.filter((r) => r.status === "validation_error")} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function IncompleteTable({ registers }: { registers: Register[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[30px]">
              <input type="checkbox" className="rounded border-gray-300" />
            </TableHead>
            <TableHead>Lesson/Event</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead className="w-[140px]">Status</TableHead>
            <TableHead className="w-[180px]">Room</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registers.map((register) => (
            <Sheet key={register.id}>
              <TableRow className="group">
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium truncate">{register.lesson}</p>
                    <p className="text-sm text-muted-foreground">
                      {register.date} • {register.yearGroup}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {register.teacher
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span>{register.teacher}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-3 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-4 w-4" /> {register.present}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-600">
                      <Clock className="h-4 w-4" /> {register.late}
                    </span>
                    <span className="flex items-center gap-1 text-red-600">
                      <XCircle className="h-4 w-4" /> {register.absent}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="w-full justify-center">
                    {register.room}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </SheetTrigger>
                </TableCell>
              </TableRow>
              <SheetContent>
                <RegisterDetail register={register} />
              </SheetContent>
            </Sheet>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function RegisterDetail({ register }: { register: Register }) {
  return (
    <div className="space-y-6">
        
      <SheetHeader>
        <SheetTitle>Lesson Attendance Records</SheetTitle>
      </SheetHeader>

      <div className="space-y-4">
        <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
          <div className="text-muted-foreground">Lesson</div>
          <div className="font-medium">{register.lesson}</div>

          <div className="text-muted-foreground">Date</div>
          <div>{register.date}</div>

          <div className="text-muted-foreground">Staff</div>
          <div>{register.teacher}</div>

          <div className="text-muted-foreground">Room</div>
          <div>{register.room}</div>

          <div className="text-muted-foreground">Status</div>
          <div>Attendance register opened</div>
        </div>

        <ScrollArea className="h-[400px] mb-10">
        <div className="rounded-md border">
          <div className="bg-muted/50 px-4 py-2 text-sm font-medium">Attendance Records</div>
          <div className="divide-y">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between px-4 py-2">
                <div className="flex gap-2">
                  <span className="font-medium">{student.lastName}</span>
                  <span className="text-muted-foreground">{student.firstName}</span>
                </div>
                <div>
                  {student.status === "present" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                  {student.status === "absent" && <XCircle className="h-4 w-4 text-red-600" />}
                  {student.status === "late" && <Clock className="h-4 w-4 text-yellow-600" />}
                  {student.status === "unmark" && <div className="h-4 w-4" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        </ScrollArea>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Lesson Overview</Button>
          <Button>Edit Register</Button>
        </div>
      </div>
    </div>
  )
}

interface Register {
  id: number
  date: string
  lesson: string
  yearGroup: string
  teacher: string
  present: number
  late: number
  absent: number
  unmark: number
  room: string
  openedOn: string
  status: "unopened" | "incomplete" | "validation_error"
}

const registers: Register[] = [
  {
    id: 1,
    date: "Fri, 21st Feb 2025, 13:00",
    lesson: "Registration: Year 11: Form 11NK",
    yearGroup: "Year 11",
    teacher: "Sasha Rose",
    present: 28,
    late: 1,
    absent: 0,
    unmark: 2,
    room: "Site 1: 740",
    openedOn: "21 Feb 2025, 13:37",
    status: "incomplete",
  },
  {
    id: 2,
    date: "Thu, 20th Feb 2025, 08:45",
    lesson: "Registration: Year 7: Form 7A",
    yearGroup: "Year 7",
    teacher: "Donna Davis",
    present: 5,
    late: 1,
    absent: 2,
    unmark: 1,
    room: "Site 1: 761",
    openedOn: "20 Feb 2025, 08:37",
    status: "validation_error",
  },

  {
    id: 3,
    date: "Wed, 19th Feb 2025, 09:15",
    lesson: "Mathematics: Year 8: Group A",
    yearGroup: "Year 8",
    teacher: "Alice Johnson",
    present: 25,
    late: 2,
    absent: 1,
    unmark: 0,
    room: "Site 2: 205",
    openedOn: "19 Feb 2025, 09:00",
    status: "unopened",
  },
  {
    id: 4,
    date: "Tue, 18th Feb 2025, 11:00",
    lesson: "Science: Year 9: Class X",
    yearGroup: "Year 9",
    teacher: "Bob Williams",
    present: 20,
    late: 0,
    absent: 3,
    unmark: 1,
    room: "Site 1: Lab A",
    openedOn: "18 Feb 2025, 10:45",
    status: "unopened",
  },
]

const students = [
  { id: 1, firstName: "L", lastName: "Adams", status: "late" },
  { id: 2, firstName: "Yasmine", lastName: "Adams", status: "present" },
  { id: 3, firstName: "Freddie", lastName: "Anderson", status: "present" },
  { id: 4, firstName: "Ray", lastName: "Baker", status: "present" },
  { id: 5, firstName: "Melissa", lastName: "Bell", status: "present" },
  { id: 6, firstName: "Jennifer", lastName: "Bradley", status: "unmark" },
  { id: 7, firstName: "Freya", lastName: "Brown", status: "present" },
  { id: 8, firstName: "Sona", lastName: "Chakrabarti", status: "present" },
  // Add more students as needed
  { id: 9, firstName: "David", lastName: "Clark", status: "present" },
  { id: 10, firstName: "Emily", lastName: "Davis", status: "absent" },
  { id: 11, firstName: "George", lastName: "Evans", status: "present" },
  { id: 12, firstName: "Hannah", lastName: "Foster", status: "late" },
]

