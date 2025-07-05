"use client"

import { useState } from "react"
import { Users, UserPlus, UserMinus, ChevronRight, Search, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface YearGroup {
  id: string
  name: string
  heads: string
  students: number
}

interface Student {
  id: string
  name: string
  yearGroup: string | null
}

export default function EnrollmentDashboard() {
  const [yearGroups, setYearGroups] = useState<YearGroup[]>([
    { id: "1", name: "Year 7", heads: "Fakaruddin Babu", students: 120 },
    { id: "2", name: "Year 8", heads: "Quentin Carter and Abbie Cooper", students: 115 },
    { id: "3", name: "Year 9", heads: "Steve Mason", students: 118 },
    { id: "4", name: "Year 10", heads: "Shannon Morris", students: 122 },
    { id: "5", name: "Year 11", heads: "Charlotte Phillips", students: 110 },
    { id: "6", name: "Year 12", heads: "Linda Simpson", students: 98 },
    { id: "7", name: "Year 13", heads: "Tom Baker", students: 95 },
  ])

  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Alice Johnson", yearGroup: "Year 7" },
    { id: "2", name: "Bob Smith", yearGroup: "Year 8" },
    { id: "3", name: "Charlie Brown", yearGroup: "Year 9" },
    { id: "4", name: "Diana Prince", yearGroup: "Year 10" },
    { id: "5", name: "Ethan Hunt", yearGroup: "Year 11" },
    { id: "6", name: "Fiona Apple", yearGroup: "Year 12" },
    { id: "7", name: "George Michael", yearGroup: "Year 13" },
    { id: "8", name: "Hannah Montana", yearGroup: "Year 7" },
    { id: "9", name: "Ian McKellen", yearGroup: "Year 8" },
    { id: "10", name: "Julia Roberts", yearGroup: "Year 9" },
    { id: "11", name: "Kevin Bacon", yearGroup: null },
    { id: "12", name: "Laura Dern", yearGroup: null },
    { id: "13", name: "Matt Damon", yearGroup: null },
    { id: "14", name: "Natalie Portman", yearGroup: null },
    { id: "15", name: "Owen Wilson", yearGroup: null },
  ])

  const [selectedYearGroup, setSelectedYearGroup] = useState<YearGroup | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const handleYearGroupClick = (yearGroup: YearGroup) => {
    setSelectedYearGroup(yearGroup)
    setIsModalOpen(true)
  }

  const handleEnrollClick = (yearGroup: YearGroup) => {
    setSelectedYearGroup(yearGroup)
    setIsSheetOpen(true)
    setSelectedStudents([])
  }

  const handleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId],
    )
  }

  const handleAssignStudents = () => {
    const updatedStudents = students.map((student) =>
      selectedStudents.includes(student.id) ? { ...student, yearGroup: selectedYearGroup!.name } : student,
    )
    setStudents(updatedStudents)

    const updatedYearGroups = yearGroups.map((group) =>
      group.id === selectedYearGroup?.id ? { ...group, students: group.students + selectedStudents.length } : group,
    )
    setYearGroups(updatedYearGroups)

    setIsSheetOpen(false)
    setSelectedStudents([])
  }

  const handleRemoveStudent = (studentId: string) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, yearGroup: null } : student,
    )
    setStudents(updatedStudents)

    const updatedYearGroups = yearGroups.map((group) =>
      group.id === selectedYearGroup?.id ? { ...group, students: group.students - 1 } : group,
    )
    setYearGroups(updatedYearGroups)
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) && student.yearGroup !== selectedYearGroup?.name,
  )

  const enrolledStudents = students.filter((student) => student.yearGroup === selectedYearGroup?.name)

  return (
    <div className="container mx-auto py-2">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-gray-600 mt-2">Manage year groups and student enrollments</p>
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
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {yearGroups.map((group) => (
          <Card key={group.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-xl text-gray-800">{group.name}</CardTitle>
              <CardDescription className="text-gray-600 mt-1">Head: {group.heads}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-2xl font-bold text-gray-800">{group.students}</span>
                  <span className="text-gray-600">Students</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleYearGroupClick(group)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50">
              <Button className="w-full" variant="outline" onClick={() => handleEnrollClick(group)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Enroll Students
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Enroll Students in {selectedYearGroup?.name}</SheetTitle>
            <SheetDescription>Select students to enroll in this year group.</SheetDescription>
          </SheetHeader>
          <div className="mt-6 flex flex-col h-[calc(100vh-200px)]">
            <div className="mb-4 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="flex-grow">
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-md">
                    <Checkbox
                      id={student.id}
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => handleStudentSelection(student.id)}
                    />
                    <Avatar>
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Label htmlFor={student.id} className="flex-grow">
                      {student.name}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignStudents}>Enroll Students</Button>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedYearGroup?.name} Details</DialogTitle>
            <DialogDescription>View and manage students enrolled in this year group.</DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-gray-600" />
                  Head of Year
                </h3>
                <p className="text-gray-700">{selectedYearGroup?.heads}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-gray-600" />
                  Total Students
                </h3>
                <p className="text-3xl font-bold text-gray-800">{selectedYearGroup?.students}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-gray-600" />
                Enrolled Students
              </h3>
              <div className="mb-4">
                <Input
                  placeholder="Search enrolled students..."
                  className="w-full"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {enrolledStudents
                    .filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-md hover:bg-gray-100"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{student.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveStudent(student.id)}>
                          <UserMinus className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

