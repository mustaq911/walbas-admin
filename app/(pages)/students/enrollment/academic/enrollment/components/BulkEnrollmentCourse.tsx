"use client"

import { useState } from "react"
import { Search, Users, BookOpen, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Student {
  id: string
  name: string
  yearGroup: string
  avatar?: string
}

interface Course {
  id: string
  code: string
  name: string
  subject: string
  yearGroup: string
  setNumber: string
  capacity: number
  enrolled: number
}

interface Enrollment {
  studentId: string
  courseId: string
}

export default function BulkEnrollment() {
  const [students] = useState<Student[]>([
    { id: "1", name: "Allen Emma", yearGroup: "Test" },
    { id: "2", name: "Baker Olivia", yearGroup: "Test" },
    { id: "3", name: "Bennett Lily", yearGroup: "Test", },
    { id: "4", name: "Brooks Daniel", yearGroup: "Test"},
    { id: "5", name: "Foster Ava", yearGroup: "Test",},
    { id: "6", name: "Hughes Charlie", yearGroup: "Test" },
    { id: "7", name: "Patel David", yearGroup: "Test"  },
    { id: "8", name: "Phillips Noah", yearGroup: "Test" },
  ])

  const [courses] = useState<Course[]>([
    {
      id: "1",
      code: "MAT1",
      name: "Mathematics Set 1",
      subject: "Mathematics",
      yearGroup: "Year 10",
      setNumber: "Set 1",
      capacity: 30,
      enrolled: 28,
    },
    {
      id: "2",
      code: "MAT2",
      name: "Mathematics Set 2",
      subject: "Mathematics",
      yearGroup: "Year 10",
      setNumber: "Set 2",
      capacity: 30,
      enrolled: 25,
    },
    {
      id: "3",
      code: "ENG1",
      name: "English Literature",
      subject: "English",
      yearGroup: "Year 10",
      setNumber: "Set 1",
      capacity: 25,
      enrolled: 22,
    },
    {
      id: "4",
      code: "SCI1",
      name: "Combined Science",
      subject: "Science",
      yearGroup: "Year 10",
      setNumber: "Set 1",
      capacity: 28,
      enrolled: 26,
    },
    {
      id: "5",
      code: "ART1",
      name: "Art & Design",
      subject: "Art",
      yearGroup: "Year 10",
      setNumber: "Set 1",
      capacity: 20,
      enrolled: 18,
    },
  ])

  const [, setEnrollments] = useState<Enrollment[]>([
    { studentId: "1", courseId: "1" },
    { studentId: "1", courseId: "3" },
    { studentId: "2", courseId: "2" },
    { studentId: "3", courseId: "2" },
  ])

  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [studentSearch, setStudentSearch] = useState("")
  const [courseSearch, setCourseSearch] = useState("")
  const [yearFilter, setYearFilter] = useState<string>("all")
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(studentSearch.toLowerCase()) &&
      (yearFilter === "all" || student.yearGroup === yearFilter),
  )

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
      course.subject.toLowerCase().includes(courseSearch.toLowerCase()),
  )

  const handleBulkEnroll = () => {
    const newEnrollments = selectedStudents.flatMap((studentId) =>
      selectedCourses.map((courseId) => ({
        studentId,
        courseId,
      })),
    )
    setEnrollments((prev) => [...prev, ...newEnrollments])
    setSelectedStudents([])
    setSelectedCourses([])
    setIsConfirmationOpen(false)
  }

  return (
    <div className="container mx-auto py-2">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Bulk Course Enrollment</h1>
            <p className="text-gray-600 mt-2">Efficiently manage multiple student enrollments</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="2024/2025">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024/2025">2024/2025</SelectItem>
                <SelectItem value="2023/2024">2023/2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Students Selection */}
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Select Students</CardTitle>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                {selectedStudents.length} selected
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search students..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="Test">Test</SelectItem>
                    <SelectItem value="Year 10">Year 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ScrollArea className="h-[400px] border rounded-md">
                <div className="p-4 space-y-2">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                        selectedStudents.includes(student.id) ? "bg-gray-100" : ""
                      }`}
                    >
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedStudents((prev) => [...prev, student.id])
                          } else {
                            setSelectedStudents((prev) => prev.filter((id) => id !== student.id))
                          }
                        }}
                      />
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.yearGroup}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Courses Selection */}
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Select Courses</CardTitle>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                {selectedCourses.length} selected
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search courses..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <ScrollArea className="h-[400px] border rounded-md">
                <div className="p-4 space-y-2">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                        selectedCourses.includes(course.id) ? "bg-gray-100" : ""
                      }`}
                    >
                      <Checkbox
                        checked={selectedCourses.includes(course.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCourses((prev) => [...prev, course.id])
                          } else {
                            setSelectedCourses((prev) => prev.filter((id) => id !== course.id))
                          }
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{course.name}</div>
                        <div className="text-sm text-gray-500">
                          {course.subject} • {course.yearGroup} • {course.setNumber}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <Progress value={(course.enrolled / course.capacity) * 100} className="w-24" />
                          <span className="text-xs text-gray-500">
                            {course.enrolled}/{course.capacity}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">{course.code}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {selectedStudents.length} students and {selectedCourses.length} courses selected
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedStudents([])
              setSelectedCourses([])
            }}
          >
            Clear Selection
          </Button>
          <Button
            onClick={() => setIsConfirmationOpen(true)}
            disabled={selectedStudents.length === 0 || selectedCourses.length === 0}
          >
            Review Enrollment
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Confirm Bulk Enrollment</DialogTitle>
            <DialogDescription>
              Please review the selected students and courses before confirming the enrollment.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                This action will enroll {selectedStudents.length} students in {selectedCourses.length} courses. Please
                ensure all selections are correct before proceeding.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Selected Students ({selectedStudents.length})
                </h3>
                <ScrollArea className="h-[300px] border rounded-md">
                  <div className="p-4 space-y-2">
                    {selectedStudents.map((id) => {
                      const student = students.find((s) => s.id === id)
                      return (
                        <div key={id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student?.avatar} alt={student?.name} />
                            <AvatarFallback>
                              {student?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student?.name}</div>
                            <div className="text-sm text-gray-500">{student?.yearGroup}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Selected Courses ({selectedCourses.length})
                </h3>
                <ScrollArea className="h-[300px] border rounded-md">
                  <div className="p-4 space-y-2">
                    {selectedCourses.map((id) => {
                      const course = courses.find((c) => c.id === id)
                      return (
                        <div key={id} className="p-2 hover:bg-gray-100 rounded-lg">
                          <div className="font-medium">{course?.name}</div>
                          <div className="text-sm text-gray-500">
                            {course?.subject} • {course?.yearGroup} • {course?.setNumber}
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <Progress
                              value={((course?.enrolled ?? 0) / (course?.capacity ?? 1)) * 100}
                              className="w-24"
                            />
                            <span className="text-xs text-gray-500">
                              {course?.enrolled}/{course?.capacity}
                            </span>
                          </div>
                          <Badge variant="outline" className="mt-1">
                            {course?.code}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkEnroll}>Confirm Enrollment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

