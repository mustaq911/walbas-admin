"use client"

import { useState } from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  Calendar,
  ChevronRight,
  Download,
  GraduationCap,
  Menu,
  TrendingUp,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const studentData = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    avgScore: 92,
    topSubject: "Mathematics",
    improvement: "Science",
    trend: "up",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    avgScore: 88,
    topSubject: "History",
    improvement: "English",
    trend: "up",
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    avgScore: 85,
    topSubject: "Art",
    improvement: "Mathematics",
    trend: "down",
  },
  {
    id: 4,
    name: "Diana Ross",
    avatar: "/placeholder.svg?height=32&width=32",
    avgScore: 90,
    topSubject: "Science",
    improvement: "History",
    trend: "up",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    avatar: "/placeholder.svg?height=32&width=32",
    avgScore: 87,
    topSubject: "English",
    improvement: "Art",
    trend: "down",
  },
]

const subjectData = [
  { subject: "Mathematics", avgScore: 85, prevScore: 82, students: 120, topStudent: "Alice Johnson" },
  { subject: "Science", avgScore: 78, prevScore: 75, students: 115, topStudent: "Diana Ross" },
  { subject: "English", avgScore: 72, prevScore: 70, students: 125, topStudent: "Ethan Hunt" },
  { subject: "History", avgScore: 68, prevScore: 65, students: 110, topStudent: "Bob Smith" },
  { subject: "Art", avgScore: 90, prevScore: 88, students: 95, topStudent: "Charlie Brown" },
]

const recentExams = [
  {
    id: 1,
    date: "2023-11-15",
    subject: "Mathematics",
    type: "End of Quarter",
    avgScore: 82,
    topScore: 98,
    participants: 120,
    status: "Graded",
  },
  {
    id: 2,
    date: "2023-11-10",
    subject: "Science",
    type: "Mid-term",
    avgScore: 78,
    topScore: 95,
    participants: 115,
    status: "Grading in Progress",
  },
  {
    id: 3,
    date: "2023-11-05",
    subject: "English Literature",
    type: "Essay Submission",
    avgScore: null,
    topScore: null,
    participants: 125,
    status: "Pending Review",
  },
  {
    id: 4,
    date: "2023-10-30",
    subject: "History",
    type: "Quiz",
    avgScore: 75,
    topScore: 92,
    participants: 110,
    status: "Graded",
  },
]

const insights = [
  {
    icon: TrendingUp,
    color: "text-green-500",
    title: "Overall Improvement",
    description: "Average scores have increased by 2.3% across all subjects.",
  },
  {
    icon: Brain,
    color: "text-yellow-500",
    title: "Focus Area: History",
    description: "History scores are lagging. Consider additional resources and engaging teaching methods.",
  },
  {
    icon: GraduationCap,
    color: "text-blue-500",
    title: "Advanced Placement",
    description: "15 students qualify for advanced courses based on their performance.",
  },
  {
    icon: Users,
    color: "text-purple-500",
    title: "Peer Tutoring Opportunity",
    description: "Implement a peer tutoring program to leverage top performers in helping others.",
  },
]

export default function ExaminationReports() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row">

        {/* Main Content */}
        <div className="flex-1">
          <header className="border-b border-gray-200 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="2023-2024" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2022-2023">2022-2023</SelectItem>
                  <SelectItem value="2021-2022">2021-2022</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="mr-1 h-4 w-4" /> Export
              </Button>
            </div>
          </header>

          <main className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
              <Card>
                <CardHeader className="p-2">
                  <CardTitle className="text-xs font-medium text-gray-500 flex items-center">
                    <Users className="h-3 w-3 mr-1" /> Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0">
                  <div className="text-lg font-bold text-gray-900">1,234</div>
                  <p className="text-xs text-green-600">+2.5% from prev. year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-2">
                  <CardTitle className="text-xs font-medium text-gray-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" /> Avg. Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0">
                  <div className="text-lg font-bold text-gray-900">82.7%</div>
                  <p className="text-xs text-green-600">+1.2% from prev. year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-2">
                  <CardTitle className="text-xs font-medium text-gray-500 flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" /> Top Subject
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0">
                  <div className="text-lg font-bold text-gray-900">Art</div>
                  <p className="text-xs text-gray-600">90% avg. score</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-2">
                  <CardTitle className="text-xs font-medium text-gray-500 flex items-center">
                    <Brain className="h-3 w-3 mr-1" /> Needs Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0">
                  <div className="text-lg font-bold text-gray-900">History</div>
                  <p className="text-xs text-gray-600">68% avg. score</p>
                </CardContent>
              </Card>
              <Card className="sm:col-span-2 lg:col-span-1">
                <CardHeader className="p-2">
                  <CardTitle className="text-xs font-medium text-gray-500 flex items-center">
                    <GraduationCap className="h-3 w-3 mr-1" /> Graduation Rate
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0">
                  <div className="text-lg font-bold text-gray-900">94.5%</div>
                  <p className="text-xs text-green-600">+0.8% from prev. year</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <Card className="lg:col-span-2">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">Subject Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Avg. Score</TableHead>
                        <TableHead>vs Prev.</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Top Student</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subjectData.map((subject) => (
                        <TableRow key={subject.subject}>
                          <TableCell className="font-medium">{subject.subject}</TableCell>
                          <TableCell>{subject.avgScore}%</TableCell>
                          <TableCell>
                            <span className={subject.avgScore > subject.prevScore ? "text-green-600" : "text-red-600"}>
                              {subject.avgScore > subject.prevScore ? "▲" : "▼"}{" "}
                              {Math.abs(subject.avgScore - subject.prevScore)}%
                            </span>
                          </TableCell>
                          <TableCell>{subject.students}</TableCell>
                          <TableCell>{subject.topStudent}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">Recent Examinations</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-4">
                    {recentExams.map((exam) => (
                      <li key={exam.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <p className="font-medium text-sm">{exam.subject}</p>
                            <p className="text-xs text-gray-500">
                              {exam.date} - {exam.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge
                            variant={
                              exam.status === "Graded"
                                ? "default"
                                : exam.status === "Grading in Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="mr-2"
                          >
                            {exam.status}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="p-0">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {exam.subject} - {exam.type}
                                </DialogTitle>
                                <DialogDescription>Examination Details</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 items-center gap-4">
                                  <span className="font-medium">Date:</span>
                                  <span>{exam.date}</span>
                                </div>
                                <div className="grid grid-cols-2 items-center gap-4">
                                  <span className="font-medium">Status:</span>
                                  <Badge
                                    variant={
                                      exam.status === "Graded"
                                        ? "default"
                                        : exam.status === "Grading in Progress"
                                          ? "secondary"
                                          : "outline"
                                    }
                                  >
                                    {exam.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 items-center gap-4">
                                  <span className="font-medium">Participants:</span>
                                  <span>{exam.participants}</span>
                                </div>
                                {exam.avgScore && (
                                  <div className="grid grid-cols-2 items-center gap-4">
                                    <span className="font-medium">Average Score:</span>
                                    <span>{exam.avgScore}%</span>
                                  </div>
                                )}
                                {exam.topScore && (
                                  <div className="grid grid-cols-2 items-center gap-4">
                                    <span className="font-medium">Top Score:</span>
                                    <span>{exam.topScore}%</span>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-4">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Top Performing Students</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead>Top Subject</TableHead>
                      <TableHead>Improvement Area</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentData.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {student.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Progress value={student.avgScore} className="w-16 mr-2" />
                            <span>{student.avgScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.topSubject}</TableCell>
                        <TableCell>{student.improvement}</TableCell>
                        <TableCell>
                          {student.trend === "up" ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insights.map((insight, index) => (
                    <div key={index} className="flex items-start">
                      <insight.icon className={`h-5 w-5 ${insight.color} mr-3 mt-1`} />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{insight.title}</h3>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}

