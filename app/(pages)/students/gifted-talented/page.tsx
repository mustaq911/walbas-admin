"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Calendar, GraduationCap, Trophy, Medal, Palette, Dumbbell, Filter } from "lucide-react"

interface Student {
  id: string
  name: string
  subject?: string
  talent?: string
  startDate: string
  endDate: string
  regForm: string
  grade?: string
  achievements?: string[]
  type: "academic" | "sports" | "arts"
  status: "active" | "expired" | "upcoming"
  level?: string
}

export default function GiftedStudentsPage() {
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const students: Student[] = [
    {
      id: "1",
      name: "Brown Katie",
      talent: "Volleyball",
      startDate: "19 Sep 2024",
      endDate: "19 Sep 2025",
      regForm: "11XQ",
      type: "sports",
      status: "upcoming",
      level: "National Team",
      achievements: ["Regional Champion 2023", "School Team Captain"],
    },
    {
      id: "2",
      name: "Reid Imogen",
      talent: "Boxing",
      startDate: "15 Jan 2024",
      endDate: "15 Jan 2025",
      regForm: "11MA",
      type: "sports",
      status: "active",
      level: "State Level",
      achievements: ["Junior Championship Gold", "Best Fighter 2023"],
    },
    {
      id: "3",
      name: "Walker Adrian",
      talent: "Music",
      subject: "Piano Performance",
      startDate: "01 Mar 2024",
      endDate: "01 Mar 2025",
      regForm: "11XQ",
      type: "arts",
      status: "active",
      level: "Advanced",
      achievements: ["Royal Conservatory Grade 8", "School Orchestra Lead"],
    },
  ]

  const getTalentIcon = (type: Student["type"]) => {
    switch (type) {
      case "sports":
        return <Dumbbell className="h-5 w-5" />
      case "arts":
        return <Palette className="h-5 w-5" />
      case "academic":
        return <GraduationCap className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 border-green-300"
      case "expired":
        return "bg-red-500/10 text-red-700 border-red-300"
      case "upcoming":
        return "bg-blue-500/10 text-blue-700 border-blue-300"
    }
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.talent?.toLowerCase().includes(search.toLowerCase()) ||
      student.subject?.toLowerCase().includes(search.toLowerCase())
    const matchesType = filterType === "all" || student.type === filterType
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "gifted" && student.type === "academic") ||
      (activeTab === "talented" && (student.type === "sports" || student.type === "arts"))
    return matchesSearch && matchesType && matchesTab
  })

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold">Student Programs</h1>
          <p className="text-muted-foreground mt-1">Manage gifted and talented student programs</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Student to Program</DialogTitle>
              <DialogDescription>Add a student to the gifted or talented program</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="talented" className="mt-4">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="talented">Talented Student</TabsTrigger>
                <TabsTrigger value="gifted">Gifted Student</TabsTrigger>
              </TabsList>
              <TabsContent value="talented" className="space-y-6 mt-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Student Name</label>
                      <Input placeholder="Enter full name" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Registration Form</label>
                      <Input placeholder="e.g. 11XQ" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Talent Category</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="arts">Arts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Specific Talent</label>
                      <Input placeholder="e.g. Volleyball, Piano, etc." />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Achievement Level</label>
                    <Input placeholder="e.g. National Team, Grade 8 Music, etc." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Input type="date" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">End Date</label>
                      <Input type="date" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="gifted" className="space-y-6 mt-4">
                {/* Gifted student form fields similar to previous version */}
              </TabsContent>
            </Tabs>
            <Button className="w-full mt-6">Save Student</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="talented">Talented</TabsTrigger>
          <TabsTrigger value="gifted">Gifted</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="arts">Arts</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{student.name}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    Form {student.regForm}
                  </CardDescription>
                </div>
                <Badge variant="outline" className={`${getStatusColor(student.status)}`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getTalentIcon(student.type)}
                  <div>
                    <div className="font-medium">{student.talent || student.subject}</div>
                    {student.level && <div className="text-sm text-muted-foreground">{student.level}</div>}
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {student.type.charAt(0).toUpperCase() + student.type.slice(1)}
                  </Badge>
                </div>

                {student.achievements && student.achievements.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        Achievements
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {student.achievements.map((achievement, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <Medal className="h-3 w-3" />
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Start Date
                    </div>
                    <div className="font-medium">{student.startDate}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      End Date
                    </div>
                    <div className="font-medium">{student.endDate}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No students found matching your criteria</div>
        </div>
      )}
    </div>
  )
}

