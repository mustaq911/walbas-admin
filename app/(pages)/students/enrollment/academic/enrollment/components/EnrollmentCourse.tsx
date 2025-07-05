"use client"

import { useState } from "react"
import { Search, Plus, Users, BookOpen, GraduationCap, ChevronRight, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

interface Course {
  id: string
  name: string
  yearGroup: string
  subject: string
  academicLead: string
  students: number
  code: string
  setNumber?: string
}

export default function EnrollmentCourse() {
  const [courses,] = useState<Course[]>([
    {
      id: "1",
      name: "Applied Art and Design",
      yearGroup: "Year 10",
      subject: "Art & Design",
      academicLead: "Tom Knight and Andy Holmes",
      students: 29,
      code: "Y10-ART-1",
      setNumber: "Set 1",
    },
    {
      id: "2",
      name: "Applied Art and Design",
      yearGroup: "Year 10",
      subject: "Art & Design",
      academicLead: "Elizabeth Williams and Andy Holmes",
      students: 28,
      code: "Y10-ART-2",
      setNumber: "Set 2",
    },
    {
      id: "3",
      name: "Applied Art and Design",
      yearGroup: "Year 10",
      subject: "Art & Design",
      academicLead: "Erin Reid and Andy Holmes",
      students: 29,
      code: "Y10-ART-3",
      setNumber: "Set 3",
    },
    {
      id: "4",
      name: "Applied Art and Design",
      yearGroup: "Year 10",
      subject: "Art & Design",
      academicLead: "Natalie Russell",
      students: 30,
      code: "Y10-ART-4",
      setNumber: "Set 4",
    },
    {
      id: "5",
      name: "Mathematics",
      yearGroup: "Year 11",
      subject: "Mathematics",
      academicLead: "Fiona Hall",
      students: 26,
      code: "Y11-MAT-1",
      setNumber: "Set 1",
    },
    {
      id: "6",
      name: "English Literature",
      yearGroup: "Year 11",
      subject: "English",
      academicLead: "Sarah Parker",
      students: 28,
      code: "Y11-ENG-1",
      setNumber: "Set 1",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.academicLead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.yearGroup.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-2">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Courses & Classes</h1>
            <p className="text-gray-600 mt-2">Manage course enrollments and class assignments</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="2024/2025">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024/2025">2024/2025</SelectItem>
                <SelectItem value="2023/2024">2023/2024</SelectItem>
                <SelectItem value="2022/2023">2022/2023</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Course
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gray-100">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl text-gray-800">{course.subject}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {course.yearGroup} • {course.setNumber}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{course.code}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="text-2xl font-bold text-gray-800">{course.students}</span>
                    <span className="text-gray-600">Students</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Academic Lead</h4>
                  <p className="text-sm text-gray-700">{course.academicLead}</p>
                </div>
                <div className="flex items-center justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCourse(course)
                      setIsDetailsOpen(true)
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setSelectedCourse(course)
                  setIsAddStudentOpen(true)
                }}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Students
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedCourse?.subject} • {selectedCourse?.yearGroup}
            </DialogTitle>
            <DialogDescription>
              {selectedCourse?.setNumber} • Course Code: {selectedCourse?.code}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="mr-2 h-5 w-5 text-gray-500" />
                    Subject Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Year Group: {selectedCourse?.yearGroup}</p>
                    <p className="text-sm text-gray-600">Set: {selectedCourse?.setNumber}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <GraduationCap className="mr-2 h-5 w-5 text-gray-500" />
                    Academic Lead
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{selectedCourse?.academicLead}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-gray-500" />
                    Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{selectedCourse?.students}</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Enrolled Students</CardTitle>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Students
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-gray-500 text-center py-8">Student list will be displayed here</div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Add Students to {selectedCourse?.subject}</SheetTitle>
            <SheetDescription>
              {selectedCourse?.yearGroup} • {selectedCourse?.setNumber}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="space-y-4">
                <div className="text-gray-500 text-center py-8">Student selection list will be displayed here</div>
              </div>
            </ScrollArea>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddStudentOpen(false)}>
              Cancel
            </Button>
            <Button>Add Selected Students</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

