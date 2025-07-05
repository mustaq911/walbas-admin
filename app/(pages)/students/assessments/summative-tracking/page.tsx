"use client"

import { useState } from "react"
import {
    Search,
    Download,
    Settings2,
    Calendar,
    ChevronDown,
    CheckCircle2,
    XCircle,
    Users,
    BookOpen,
    Timer,
} from "lucide-react"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const dummyData = [
    {
        id: "1",
        name: "KS3 Math Current Grade",
        period: "Spring Term",
        group: "KS3 Math: Year 7: Y7Set1",
        academicLead: "Lilly Williams, Adrian Johnson",
        status: "Started",
        progress: 65,
        studentsCompleted: 18,
        totalStudents: 25,
        dueIn: "5 days",
        marksApproved: false,
    },
    {
        id: "2",
        name: "KS3 Math Current Grade",
        period: "Spring Term",
        group: "KS3 Math: Year 7: Y7Set2",
        academicLead: "Daisy Morgan, Amber Kennedy",
        status: "Started",
        progress: 80,
        studentsCompleted: 22,
        totalStudents: 26,
        dueIn: "5 days",
        marksApproved: false,
    },
    {
        id: "3",
        name: "KS3 Math Current Grade",
        period: "Spring Term",
        group: "KS3 Math: Year 7: Y7Set3",
        academicLead: "Holly Graham, Darren Rogers",
        status: "Started",
        progress: 45,
        studentsCompleted: 12,
        totalStudents: 24,
        dueIn: "5 days",
        marksApproved: false,
    },
    {
        id: "4",
        name: "KS3 Math Current Grade",
        period: "Spring Term",
        group: "KS3 Math: Year 8: Y8Set1",
        academicLead: "Selina Bennett, Adrian Johnson",
        status: "Not Started",
        progress: 0,
        studentsCompleted: 0,
        totalStudents: 28,
        dueIn: "7 days",
        marksApproved: false,
    },
    {
        id: "5",
        name: "KS3 Math Current Grade",
        period: "Spring Term",
        group: "KS3 Math: Year 8: Y8Set2",
        academicLead: "Alexandra Young, Amber Kennedy",
        status: "Completed",
        progress: 100,
        studentsCompleted: 27,
        totalStudents: 27,
        dueIn: "7 days",
        marksApproved: true,
    },
]

export default function AssessmentDashboard() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredAssessments = dummyData.filter((assessment) => {
        const matchesSearch =
            assessment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assessment.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assessment.academicLead.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || assessment.status.toLowerCase() === statusFilter.toLowerCase()

        return matchesSearch && matchesStatus
    })

    const totalAssessments = dummyData.length
    const startedAssessments = dummyData.filter((a) => a.status === "Started").length
    const completedAssessments = dummyData.filter((a) => a.progress === 100).length

    return (
        <div className="min-h-screen bg-gray-50/40 dark:bg-gray-900/40">
            <div className="container mx-auto p-6 space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">Summative Tracking</h1>
                        <p className="text-muted-foreground mt-1">Track and manage your assessment progress</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />

                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>

                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                                <BookOpen className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Assessments</p>
                                <p className="text-2xl font-bold">{totalAssessments}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                                <Timer className="h-6 w-6 text-green-700 dark:text-green-300" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                                <p className="text-2xl font-bold">{startedAssessments}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                                <CheckCircle2 className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                                <p className="text-2xl font-bold">{completedAssessments}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by assessment name, group, or academic lead..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="started">Started</SelectItem>
                                <SelectItem value="not started">Not Started</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Settings2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Assessment Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredAssessments.map((assessment) => (
                        <Card key={assessment.id} className="transition-all hover:shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-md">{assessment.name}</h3>
                                        <p className="text-sm text-muted-foreground">{assessment.period}</p>
                                    </div>
                                    <Badge
                                        variant={assessment.status === "Started" ? "default" : assessment.status === "Completed" ? "success" : "secondary"}
                                        className="ml-2"
                                    >
                                        {assessment.status}
                                    </Badge>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium mb-1">Student Group</p>
                                        <p className="text-sm text-muted-foreground">{assessment.group}</p>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-medium">{assessment.progress}%</span>
                                        </div>
                                        <Progress value={assessment.progress} className="h-2" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">
                                                {assessment.studentsCompleted}/{assessment.totalStudents}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 justify-end">
                                            <Timer className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">Due in {assessment.dueIn}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium mb-1">Academic Lead</p>
                                        <p className="text-sm text-muted-foreground">{assessment.academicLead}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <span className="text-sm">Marks Approved</span>
                                        {assessment.marksApproved ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

