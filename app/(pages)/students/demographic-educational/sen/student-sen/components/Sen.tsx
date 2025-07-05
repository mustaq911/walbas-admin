"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Brain, Calendar, FileText, Filter, GraduationCap, Search, User2 } from "lucide-react"

interface Student {
  id: string
  name: string
  regForm: string
  senStatus: string
  startDate: string
  endDate: string
  senNeeds: string
  ongoing: boolean
}

export default function SENStudentsList() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const students: Student[] = [
    {
      id: "1",
      name: "Adams L.",
      regForm: "11NK",
      senStatus: "Education, Health and Care Plan",
      startDate: "01 Jan 2025",
      endDate: "Ongoing",
      senNeeds: "Autistic Spectrum Disorder and Attention Deficit",
      ongoing: true,
    },
    {
      id: "2",
      name: "Adams Oliver",
      regForm: "8BT",
      senStatus: "Education, Health and Care Plan",
      startDate: "28 Jan 2025",
      endDate: "Ongoing",
      senNeeds: "Dyslexia",
      ongoing: true,
    },
    // Add more students as needed
  ]

  const getStatusColor = (status: string) => {
    if (status.includes("Education, Health and Care Plan")) {
      return "bg-blue-50 border-blue-200 text-blue-700"
    }
    if (status.includes("Monitoring")) {
      return "bg-purple-50 border-purple-200 text-purple-700"
    }
    if (status.includes("Support")) {
      return "bg-emerald-50 border-emerald-200 text-emerald-700"
    }
    return "bg-gray-50 border-gray-200 text-gray-700"
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.senNeeds.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.senStatus.includes(statusFilter)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-2 space-y-6">
      <div>
        <p className="text-muted-foreground mt-1">Manage and track students with special educational needs</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search students or SEN needs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[250px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Education">Education, Health and Care Plan</SelectItem>
            <SelectItem value="Monitoring">Monitoring</SelectItem>
            <SelectItem value="Support">SEN Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <User2 className="h-4 w-4 text-muted-foreground" />
                    {student.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Form {student.regForm}
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className={`${student.ongoing ? "bg-green-50 border-green-200 text-green-700" : "bg-gray-50 border-gray-200 text-gray-700"}`}
                >
                  {student.ongoing ? "Ongoing" : "Completed"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  SEN Status
                </div>
                <Badge variant="outline" className={`${getStatusColor(student.senStatus)} text-xs`}>
                  {student.senStatus}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  SEN Needs
                </div>
                <p className="text-sm font-medium">{student.senNeeds}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date
                  </div>
                  <p className="text-sm font-medium">{student.startDate}</p>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    End Date
                  </div>
                  <p className="text-sm font-medium">{student.endDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No students found matching your criteria</p>
        </div>
      )}
    </div>
  )
}

