"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, Clock, Search, UserRound, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export default function RegistersByDate() {
  const [selectedRegister, setSelectedRegister] = useState<Register | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
 
        <div className="flex items-center gap-2">
          <div className="relative w-[200px]">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search registers..." className="pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                View
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Hide columns</DropdownMenuItem>
              <DropdownMenuItem>Show all details</DropdownMenuItem>
              <DropdownMenuItem>Compact view</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="morning" className="w-full">
              <div className="flex items-center justify-between mb-3">
                <TabsList>
                  <TabsTrigger value="morning">Morning</TabsTrigger>
                  <TabsTrigger value="afternoon">Afternoon</TabsTrigger>
                  <TabsTrigger value="all-day">All Day</TabsTrigger>
                </TabsList>
                <Badge variant="secondary" className="ml-2">
                  24 Registers
                </Badge>
              </div>
              <TabsContent value="morning">
                <RegistersTable
                  registers={registers.filter((r) => r.time.startsWith("08:") || r.time.startsWith("09:"))}
                  onSelectRegister={setSelectedRegister}
                />
              </TabsContent>
              <TabsContent value="afternoon">
                <RegistersTable
                  registers={registers.filter((r) => r.time.startsWith("13:") || r.time.startsWith("14:"))}
                  onSelectRegister={setSelectedRegister}
                />
              </TabsContent>
              <TabsContent value="all-day">
                <RegistersTable registers={registers} onSelectRegister={setSelectedRegister} />
              </TabsContent>
            </Tabs>
          </div>
        </CardHeader>
      </Card>

      <Sheet open={!!selectedRegister} onOpenChange={() => setSelectedRegister(null)}>
        <SheetContent>
          <RegisterDetail register={selectedRegister} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

function RegistersTable({
  registers,
  onSelectRegister,
}: {
  registers: Register[]
  onSelectRegister: (register: Register) => void
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[130px]">Time</TableHead>
            <TableHead>Class/Event</TableHead>
            <TableHead className="w-[180px]">Staff</TableHead>
            <TableHead className="w-[130px]">Room</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registers.map((register) => (
            <TableRow
              key={register.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onSelectRegister(register)}
            >
              <TableCell>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {register.time}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{register.lesson}</div>
                  {register.yearGroup && <div className="text-xs text-muted-foreground">{register.yearGroup}</div>}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                    {register.staff
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-sm">{register.staff}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {register.room}
                </Badge>
              </TableCell>
              <TableCell>
                {register.opened ? (
                  <Badge variant="secondary">Opened</Badge>
                ) : (
                  <Badge variant="outline">Unopened</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function RegisterDetail({ register }: { register: Register | null }) {
  if (!register) return null

  return (
    <div className="space-y-6">
      <SheetHeader>
        <SheetTitle>{register.lesson}</SheetTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {register.time}
          </div>
          <div className="flex items-center gap-1">
            <UserRound className="h-4 w-4" />
            {register.staff}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {register.room}
          </div>
        </div>
      </SheetHeader>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Student List</h3>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Year Group</TableHead>
                  <TableHead>Form</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {student.firstName[0]}
                            {student.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {student.lastName}, {student.firstName}
                          </div>
                          <div className="text-xs text-muted-foreground">ID: {student.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.yearGroup}</TableCell>
                    <TableCell>{student.form}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface Register {
  id: number
  time: string
  date: string
  lesson: string
  yearGroup?: string
  staff: string
  room: string
  status: string
  opened: boolean
}

interface Student {
  id: number
  firstName: string
  lastName: string
  yearGroup: string
  form: string
}

const registers: Register[] = [
  {
    id: 1,
    time: "08:00 - 15:54",
    date: "24 Feb 2025",
    lesson: "Alton Towers",
    staff: "Allen Allen",
    room: "Site 1: 103",
    status: "Not opened",
    opened: false,
  },
  {
    id: 2,
    time: "08:45 - 09:00",
    date: "24 Feb 2025",
    lesson: "Registration: Form 7FO",
    yearGroup: "Year 7",
    staff: "Donna Davis",
    room: "Site 1: 761",
    status: "Not opened",
    opened: false,
  },
  {
    id: 3,
    time: "09:15 - 10:15",
    date: "24 Feb 2025",
    lesson: "Mathematics",
    yearGroup: "Year 8",
    staff: "John Smith",
    room: "Site 1: 205",
    status: "Opened",
    opened: true,
  },
  {
    id: 4,
    time: "13:30 - 14:30",
    date: "24 Feb 2025",
    lesson: "English Literature",
    yearGroup: "Year 9",
    staff: "Emma Watson",
    room: "Site 2: 110",
    status: "Not opened",
    opened: false,
  },
  {
    id: 5,
    time: "14:45 - 15:45",
    date: "24 Feb 2025",
    lesson: "Physical Education",
    yearGroup: "Year 10",
    staff: "Mike Johnson",
    room: "Sports Hall",
    status: "Opened",
    opened: true,
  },
]

const students: Student[] = [
  { id: 1, firstName: "Charlotte", lastName: "Bate", yearGroup: "Year 7", form: "7A" },
  { id: 2, firstName: "Imogen", lastName: "Bennett", yearGroup: "Year 7", form: "7B" },
  { id: 3, firstName: "Mibble", lastName: "Bibble", yearGroup: "Year 8", form: "8C" },
  { id: 4, firstName: "Smith", lastName: "Callum", yearGroup: "Year 8", form: "8A" },
  { id: 5, firstName: "Fred", lastName: "Green", yearGroup: "Year 9", form: "9D" },
  { id: 6, firstName: "Polly", lastName: "James", yearGroup: "Year 9", form: "9B" },
  { id: 7, firstName: "Bob", lastName: "Johnson", yearGroup: "Year 10", form: "10C" },
  { id: 8, firstName: "Janet", lastName: "Smith", yearGroup: "Year 10", form: "10A" },
  { id: 9, firstName: "Sophie", lastName: "General", yearGroup: "Year 11", form: "11B" },
  { id: 10, firstName: "Oliver", lastName: "Brown", yearGroup: "Year 11", form: "11D" },
]

