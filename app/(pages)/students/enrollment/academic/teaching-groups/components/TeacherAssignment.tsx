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

interface Teacher {
    id: string
    name: string
    subject: string
    avatar?: string
}

interface Group {
    id: string
    name: string
    type: string
    yearGroup: string
    assignedTeachers: number
    capacity: number
}



export default function TeacherAssignment() {
    const [teachers] = useState<Teacher[]>([
        { id: "1", name: "John Smith", subject: "Mathematics", },
        { id: "2", name: "Emma Johnson", subject: "English", },
        { id: "3", name: "Michael Brown", subject: "Science", },
        { id: "4", name: "Sarah Davis", subject: "History", },
        { id: "5", name: "David Wilson", subject: "Physical Education", },
        { id: "6", name: "Lisa Taylor", subject: "Art", },
        { id: "7", name: "Robert Anderson", subject: "Music", },
        { id: "8", name: "Jennifer Thomas", subject: "Geography", },
    ])

    const [groups] = useState<Group[]>([
        { id: "1", name: "Year 7 Maths", type: "Subject", yearGroup: "Year 7", assignedTeachers: 2, capacity: 3 },
        { id: "2", name: "Year 8 English", type: "Subject", yearGroup: "Year 8", assignedTeachers: 1, capacity: 2 },
        { id: "3", name: "Year 9 Science", type: "Subject", yearGroup: "Year 9", assignedTeachers: 3, capacity: 4 },
        { id: "4", name: "Year 10 Form Group A", type: "Form", yearGroup: "Year 10", assignedTeachers: 1, capacity: 1 },
        { id: "5", name: "Year 11 History", type: "Subject", yearGroup: "Year 11", assignedTeachers: 1, capacity: 2 },
    ])


    const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
    const [selectedGroups, setSelectedGroups] = useState<string[]>([])
    const [teacherSearch, setTeacherSearch] = useState("")
    const [groupSearch, setGroupSearch] = useState("")
    const [subjectFilter, setSubjectFilter] = useState<string>("all")
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) &&
            (subjectFilter === "all" || teacher.subject === subjectFilter),
    )

    const filteredGroups = groups.filter(
        (group) =>
            group.name.toLowerCase().includes(groupSearch.toLowerCase()) ||
            group.type.toLowerCase().includes(groupSearch.toLowerCase()),
    )



    return (
        <div className="container mx-auto py-2">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 mt-2">Assign teachers to groups and classes</p>
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
                {/* Teachers Selection */}
                <Card className="shadow-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-semibold">Select Teachers</CardTitle>
                            <Badge variant="secondary" className="px-3 py-1 text-sm">
                                {selectedTeachers.length} selected
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        placeholder="Search teachers..."
                                        value={teacherSearch}
                                        onChange={(e) => setTeacherSearch(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Subjects</SelectItem>
                                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                                        <SelectItem value="English">English</SelectItem>
                                        <SelectItem value="Science">Science</SelectItem>
                                        <SelectItem value="History">History</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <ScrollArea className="h-[400px] border rounded-md">
                                <div className="p-4 space-y-2">
                                    {filteredTeachers.map((teacher) => (
                                        <div
                                            key={teacher.id}
                                            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 transition-colors ${selectedTeachers.includes(teacher.id) ? "bg-gray-100" : ""
                                                }`}
                                        >
                                            <Checkbox
                                                checked={selectedTeachers.includes(teacher.id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedTeachers((prev) => [...prev, teacher.id])
                                                    } else {
                                                        setSelectedTeachers((prev) => prev.filter((id) => id !== teacher.id))
                                                    }
                                                }}
                                            />
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                                                <AvatarFallback>
                                                    {teacher.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="font-medium">{teacher.name}</div>
                                                <div className="text-sm text-gray-500">{teacher.subject}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>

                {/* Groups Selection */}
                <Card className="shadow-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-semibold">Select Groups</CardTitle>
                            <Badge variant="secondary" className="px-3 py-1 text-sm">
                                {selectedGroups.length} selected
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="Search groups..."
                                    value={groupSearch}
                                    onChange={(e) => setGroupSearch(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                            <ScrollArea className="h-[400px] border rounded-md">
                                <div className="p-4 space-y-2">
                                    {filteredGroups.map((group) => (
                                        <div
                                            key={group.id}
                                            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 transition-colors ${selectedGroups.includes(group.id) ? "bg-gray-100" : ""
                                                }`}
                                        >
                                            <Checkbox
                                                checked={selectedGroups.includes(group.id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedGroups((prev) => [...prev, group.id])
                                                    } else {
                                                        setSelectedGroups((prev) => prev.filter((id) => id !== group.id))
                                                    }
                                                }}
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{group.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {group.type} • {group.yearGroup}
                                                </div>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <Progress value={(group.assignedTeachers / group.capacity) * 100} className="w-24" />
                                                    <span className="text-xs text-gray-500">
                                                        {group.assignedTeachers}/{group.capacity} teachers
                                                    </span>
                                                </div>
                                            </div>
                                            <Badge variant="outline">{group.type}</Badge>
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
                    {selectedTeachers.length} teachers and {selectedGroups.length} groups selected
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setSelectedTeachers([])
                            setSelectedGroups([])
                        }}
                    >
                        Clear Selection
                    </Button>
                    <Button
                        onClick={() => setIsConfirmationOpen(true)}
                        disabled={selectedTeachers.length === 0 || selectedGroups.length === 0}
                    >
                        Review Assignment
                    </Button>
                </div>
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Confirm Teacher Assignment</DialogTitle>
                        <DialogDescription>
                            Please review the selected teachers and groups before confirming the assignment.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6 space-y-6">
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Important</AlertTitle>
                            <AlertDescription>
                                This action will assign {selectedTeachers.length} teachers to {selectedGroups.length} groups. Please
                                ensure all selections are correct before proceeding.
                            </AlertDescription>
                        </Alert>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Selected Teachers ({selectedTeachers.length})
                                </h3>
                                <ScrollArea className="h-[300px] border rounded-md">
                                    <div className="p-4 space-y-2">
                                        {selectedTeachers.map((id) => {
                                            const teacher = teachers.find((t) => t.id === id)
                                            return (
                                                <div key={id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={teacher?.avatar} alt={teacher?.name} />
                                                        <AvatarFallback>
                                                            {teacher?.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{teacher?.name}</div>
                                                        <div className="text-sm text-gray-500">{teacher?.subject}</div>
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
                                    Selected Groups ({selectedGroups.length})
                                </h3>
                                <ScrollArea className="h-[300px] border rounded-md">
                                    <div className="p-4 space-y-2">
                                        {selectedGroups.map((id) => {
                                            const group = groups.find((g) => g.id === id)
                                            return (
                                                <div key={id} className="p-2 hover:bg-gray-100 rounded-lg">
                                                    <div className="font-medium">{group?.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {group?.type} • {group?.yearGroup}
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-2">
                                                        <Progress
                                                            value={((group?.assignedTeachers ?? 0) / (group?.capacity ?? 1)) * 100}
                                                            className="w-24"
                                                        />
                                                        <span className="text-xs text-gray-500">
                                                            {group?.assignedTeachers}/{group?.capacity} teachers
                                                        </span>
                                                    </div>
                                                    <Badge variant="outline" className="mt-1">
                                                        {group?.type}
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
                        <Button>Confirm Assignment</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

