/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    parseISO,
    addMonths,
    subMonths,
    setYear,
    setMonth,
    startOfWeek,
    endOfWeek,
} from "date-fns"
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, CalendarIcon, MapPin, User, FileText, BookOpen, GraduationCap } from "lucide-react"

// Dummy user data
const dummyUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", avatar: "/placeholder.svg?height=32&width=32" },

]

// Sample examination data for February 2025
const initialExams = [
    {
        id: 1,
        subject: "Mathematics",
        date: "2025-02-05",
        time: "09:00",
        duration: "3 hours",
        room: "Hall A",
        type: "Final",
        proctor: "Dr. Smith",
        students: 45,
        notes: "Test notes",
        registeredStudents: [3], // Using user IDs
    },
    {
        id: 2,
        subject: "Physics",
        date: "2025-02-05",
        time: "14:00",
        duration: "2 hours",
        room: "Lab 101",
        type: "Midterm",
        proctor: "Prof. Johnson",
        students: 30,
        notes: "No electronic devices",
        registeredStudents: [4, 5],
    },
    {
        id: 3,
        subject: "Literature",
        date: "2025-02-05",
        time: "10:00",
        duration: "2 hours",
        room: "Room 201",
        type: "Quiz",
        proctor: "Ms. Brown",
        students: 25,
        notes: "Open book exam",
        registeredStudents: [],
    },
    {
        id: 4,
        subject: "Chemistry",
        date: "2025-02-05",
        time: "13:00",
        duration: "3 hours",
        room: "Lab 102",
        type: "Final",
        proctor: "Dr. White",
        students: 40,
        notes: "Safety goggles required",
        registeredStudents: [],
    },

]

const ExamDetailsDialog = ({ exam, onClose, onRegisterStudent, users, open }: any) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedStudents, setSelectedStudents] = useState<number[]>([])

    const filteredStudents = users.filter((user: any) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const handleStudentToggle = (studentId: number) => {
        setSelectedStudents((prev) => {
            if (prev.includes(studentId)) {
                return prev.filter((id) => id !== studentId)
            }
            return [...prev, studentId]
        })
    }

    const handleRegisterSelected = () => {
        selectedStudents.forEach((studentId) => {
            if (!exam?.registeredStudents.includes(studentId)) {
                onRegisterStudent(exam.id, studentId)
            }
        })
        setSelectedStudents([])
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[1200px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{exam?.subject}</DialogTitle>
                    <DialogDescription className="text-sm">
                        <div className="flex items-center mt-2">
                            <CalendarIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                            {exam?.date && format(parseISO(exam.date), "MMMM d, yyyy")}
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-3 gap-6 mt-6">
                    {/* Exam Details Card */}
                    <div className="col-span-3 lg:col-span-1 space-y-6">
                        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                            <h3 className="font-semibold text-lg mb-4">Exam Details</h3>
                            <div className="flex items-center">
                                <Clock className="mr-3 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{exam?.time}</p>
                                    <p className="text-sm text-muted-foreground">Time</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FileText className="mr-3 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{exam?.duration}</p>
                                    <p className="text-sm text-muted-foreground">Duration</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-3 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{exam?.room}</p>
                                    <p className="text-sm text-muted-foreground">Room</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <BookOpen className="mr-3 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <Badge variant="outline" className="font-medium">
                                        {exam?.type}
                                    </Badge>
                                    <p className="text-sm text-muted-foreground">Exam Type</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <User className="mr-3 h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">{exam?.proctor}</p>
                                    <p className="text-sm text-muted-foreground">Proctor</p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <p className="font-medium mb-1">Notes:</p>
                                <p className="text-sm text-muted-foreground">{exam?.notes}</p>
                            </div>
                        </div>

                    
                    </div>

                    {/* Students Section */}
                    <div className="col-span-3 lg:col-span-2">
                        <div className="bg-muted/50 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-lg">Select Students</h3>
                                <div className="text-sm text-muted-foreground">{selectedStudents.length} selected</div>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search students..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>

                                <div className="border rounded-lg divide-y max-h-[400px] overflow-y-auto bg-white">
                                    {filteredStudents.map((student: any) => {
                                        const isRegistered = exam?.registeredStudents.includes(student.id)
                                        return (
                                            <div
                                                key={student.id}
                                                className="flex items-center space-x-4 p-3 hover:bg-muted/50 transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.includes(student.id)}
                                                    onChange={() => handleStudentToggle(student.id)}
                                                    disabled={isRegistered}
                                                    className="h-4 w-4 rounded border-gray-300"
                                                />
                                                <div className="flex items-center space-x-3 flex-1">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                                                        {student.name
                                                            .split(" ")
                                                            .map((n: any) => n[0])
                                                            .join("")}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{student.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {isRegistered ? "Registered" : "Not registered"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {selectedStudents.length > 0 && (
                                <Button className="w-full mt-4" onClick={handleRegisterSelected}>
                                    <GraduationCap className="mr-2 h-4 w-4" />
                                    Register Selected Students
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default function ScheduleRegistration() {
    const [currentDate, setCurrentDate] = useState(() => {
        const now = new Date()
        return setYear(setMonth(now, 1), 2025)
    })
    const [exams, setExams] = useState(initialExams)
    const [newExam, setNewExam] = useState({
        subject: "",
        time: "",
        duration: "",
        room: "",
        type: "Final",
        proctor: "",
        students: "",
        notes: "",
    })

    const [selectedExam, setSelectedExam] = useState(null)

    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)
    const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))
    const handleToday = () => setCurrentDate(new Date())



    const getExamsForDate = (date: Date) => {
        return exams.filter((exam) => isSameDay(parseISO(exam.date), date))
    }

    const getExamTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case "final":
                return "bg-blue-100 border-blue-200"
            case "midterm":
                return "bg-yellow-100 border-yellow-200"
            case "quiz":
                return "bg-green-100 border-green-200"
            default:
                return "bg-gray-100 border-gray-200"
        }
    }

    const handleExamClick = (exam: any) => {
        setSelectedExam(exam)
    }

    const handleCloseExamDetails = () => {
        setSelectedExam(null)
    }

    const handleRegisterStudent = ({ examId, studentId }: any) => {
        setExams((prevExams) =>
            prevExams.map((exam) =>
                exam.id === examId ? { ...exam, registeredStudents: [...exam.registeredStudents, studentId] } : exam,
            ),
        )
    }

    const DesktopCalendar = () => (
        <div className="border rounded-lg">
            <div className="grid grid-cols-7 border-b">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-4 text-sm font-medium text-center">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {calendarDays.map((day) => (
                    <div key={day.toString()} className="min-h-[120px] p-2 border-b border-r relative">
                        <div
                            className={`cursor-pointer hover:bg-gray-50 
                ${!isSameMonth(day, currentDate) ? "bg-gray-50 text-gray-400" : ""}
                ${isSameDay(day, new Date()) ? "bg-blue-50" : ""}`}

                        >
                            <span className={`text-sm ${!isSameMonth(day, currentDate) ? "text-gray-400" : "text-gray-600"}`}>
                                {format(day, "d")}
                            </span>

                            <div className="mt-1 space-y-1">
                                {getExamsForDate(day)
                                    .slice(0, 3)
                                    .map((exam) => (
                                        <div
                                            key={exam.id}
                                            className={`p-1 rounded text-xs ${getExamTypeColor(exam.type)} cursor-pointer`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleExamClick(exam)
                                            }}
                                        >
                                            <div className="font-medium truncate">{exam.subject}</div>
                                            <div className="text-gray-500 truncate">
                                                {exam.time} - {exam.room}
                                            </div>
                                        </div>
                                    ))}
                                {getExamsForDate(day).length > 3 && (
                                    <div className="text-xs text-gray-500 flex items-center">
                                        <MoreHorizontal className="h-3 w-3 mr-1" />
                                        {getExamsForDate(day).length - 3} more
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const MobileCalendar = () => (
        <div className="space-y-4">
            {monthDays.map((day) => (
                <div key={day.toString()} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-lg font-semibold">{format(day, "d")}</div>
                        <div className="text-sm text-gray-500">{format(day, "EEEE")}</div>
                    </div>
                    <div className="space-y-2">
                        {getExamsForDate(day).map((exam) => (
                            <div
                                key={exam.id}
                                className={`p-2 rounded-lg ${getExamTypeColor(exam.type)} cursor-pointer`}
                                onClick={() => handleExamClick(exam)}
                            >
                                <div className="font-medium">{exam.subject}</div>
                                <div className="text-sm text-gray-600">
                                    {exam.time} - {exam.room}
                                </div>
                                <div className="text-xs text-gray-500">{exam.type}</div>
                            </div>
                        ))}
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full mt-2">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Exam
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Schedule Examination</SheetTitle>
                                <SheetDescription>{format(day, "MMMM d, yyyy")}</SheetDescription>
                            </SheetHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        value={newExam.subject}
                                        onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                                        placeholder="Enter subject name"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="time">Time</Label>
                                        <Input
                                            id="time"
                                            type="time"
                                            value={newExam.time}
                                            onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="duration">Duration</Label>
                                        <Input
                                            id="duration"
                                            value={newExam.duration}
                                            onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
                                            placeholder="e.g., 2 hours"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="room">Room</Label>
                                    <Input
                                        id="room"
                                        value={newExam.room}
                                        onChange={(e) => setNewExam({ ...newExam, room: e.target.value })}
                                        placeholder="Enter room number/name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Exam Type</Label>
                                    <Select value={newExam.type} onValueChange={(value) => setNewExam({ ...newExam, type: value })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Final">Final</SelectItem>
                                            <SelectItem value="Midterm">Midterm</SelectItem>
                                            <SelectItem value="Quiz">Quiz</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="proctor">Proctor</Label>
                                    <Input
                                        id="proctor"
                                        value={newExam.proctor}
                                        onChange={(e) => setNewExam({ ...newExam, proctor: e.target.value })}
                                        placeholder="Enter proctor name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="students">Number of Students</Label>
                                    <Input
                                        id="students"
                                        type="number"
                                        value={newExam.students}
                                        onChange={(e) => setNewExam({ ...newExam, students: e.target.value })}
                                        placeholder="Enter number of students"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={newExam.notes}
                                        onChange={(e) => setNewExam({ ...newExam, notes: e.target.value })}
                                        placeholder="Add any additional notes"
                                    />
                                </div>
                            </div>
                            <SheetFooter>
                                <Button className="w-full">
                                    Schedule Exam
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            ))}
        </div>
    )

    return (
        <div className="min-w-full">

            <header className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium">{format(currentDate, "MMMM yyyy")}</span>
                        <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button variant="ghost" onClick={handleToday}>
                        Today
                    </Button>
                </div>


                <div className="flex items-center gap-4 overflow-x-auto pb-2">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input className="pl-8" placeholder="Search Exams" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="final">Final</SelectItem>
                            <SelectItem value="midterm">Midterm</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </header>


            <div className="hidden md:block">
                <DesktopCalendar />
            </div>
            <div className="md:hidden">
                <MobileCalendar />
            </div>

            <ExamDetailsDialog
                exam={selectedExam}
                onClose={handleCloseExamDetails}
                onRegisterStudent={handleRegisterStudent}
                users={dummyUsers}
                open={!!selectedExam}
            />
        </div>
    )
}

