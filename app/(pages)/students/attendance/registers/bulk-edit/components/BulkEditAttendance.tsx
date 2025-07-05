"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, XCircle, Clock } from "lucide-react"
import { StudentModal } from "./student-modal-attendance"

// Dummy data
const students = [
  {
    id: "1",
    name: "Emma Allen",
    form: "8FV",
    year: "Year 8",
    lessons: [
      {
        period: "1",
        time: "09:00 - 09:50",
        subject: "Mathematics",
        room: "Room 101",
        teacher: "Mr. Smith",
        status: "present",
      },
      {
        period: "2",
        time: "10:00 - 10:50",
        subject: "English",
        room: "Room 102",
        teacher: "Mrs. Johnson",
        status: "present",
      },
      {
        period: "3",
        time: "11:00 - 11:50",
        subject: "Science",
        room: "Lab 1",
        teacher: "Dr. Wilson",
        status: "late",
      },
      {
        period: "4",
        time: "13:00 - 13:50",
        subject: "History",
        room: "Room 205",
        teacher: "Ms. Davis",
        status: "not started",
      },
    ],
  },
  {
    id: "2",
    name: "Oliver Baker",
    form: "8IY",
    year: "Year 8",
    lessons: [
      {
        period: "1",
        time: "09:00 - 09:50",
        subject: "Physics",
        room: "Lab 2",
        teacher: "Dr. Brown",
        status: "absent",
      },
      {
        period: "2",
        time: "10:00 - 10:50",
        subject: "Mathematics",
        room: "Room 103",
        teacher: "Mr. Smith",
        status: "absent",
      },
      {
        period: "3",
        time: "11:00 - 11:50",
        subject: "English",
        room: "Room 104",
        teacher: "Mrs. Johnson",
        status: "not started",
      },
    ],
  },

]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "present":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "absent":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "late":
      return <Clock className="h-4 w-4 text-yellow-500" />
    default:
      return null
  }
}

export default function StudentList() {
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleStudentClick = (student: (typeof students)[0]) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Students</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Form</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-center">Period 1</TableHead>
                <TableHead className="text-center">Period 2</TableHead>
                <TableHead className="text-center">Period 3</TableHead>
                <TableHead className="text-center">Period 4</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleStudentClick(student)}
                >
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.form}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  {[1, 2, 3, 4].map((period) => {
                    const lesson = student.lessons.find((l) => l.period === period.toString())
                    return (
                      <TableCell key={period} className="text-center">
                        {lesson ? getStatusIcon(lesson.status) : "-"}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <StudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} student={selectedStudent} />
    </div>
  )
}

