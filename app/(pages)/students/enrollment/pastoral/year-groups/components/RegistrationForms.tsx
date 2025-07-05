"use client"

import { useState } from "react"
import { Users, UserPlus, ChevronRight, Search, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface RegistrationForm {
  id: string
  code: string
  tutor: string
  students: number
}


export default function RegistrationForms() {
  const [forms,] = useState<RegistrationForm[]>([
    { id: "1", code: "Form 7FO", tutor: "Donna Davis", students: 9 },
    { id: "2", code: "Form 7JY", tutor: "Evie Davis", students: 36 },
    { id: "3", code: "Form 7KY", tutor: "Bethany Fox", students: 30 },
    { id: "4", code: "Form 7NP", tutor: "Devendra Ganguly", students: 29 },
    { id: "5", code: "Form 7NZ", tutor: "Donna Jackson", students: 23 },
    { id: "6", code: "Form 7QB", tutor: "None assigned", students: 3 },
    { id: "7", code: "Form 7SL", tutor: "Jacob Richardson", students: 52 },
    { id: "8", code: "Form 7XV", tutor: "Fakaruddin Babu", students: 29 },
    { id: "9", code: "Form 9CN", tutor: "Justine Roberts", students: 28 },
    { id: "10", code: "Form 9EF", tutor: "Ross Price", students: 35 },
    { id: "11", code: "Form 9HU", tutor: "Martin Young", students: 27 },
    { id: "12", code: "Form 9LQ", tutor: "Joanne Hill", students: 28 },
  ])

  const [selectedForm, setSelectedForm] = useState<RegistrationForm | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-gray-600 mt-2">Manage registration forms and student assignments</p>
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
            <ClipboardList className="mr-2 h-4 w-4" />
            New Form
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {forms.map((form) => (
          <Card key={form.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-xl text-gray-800">{form.code}</CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Tutor:{" "}
                {form.tutor === "None assigned" ? (
                  <span className="text-yellow-600">No tutor assigned</span>
                ) : (
                  form.tutor
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 h-340">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-2xl font-bold text-gray-800">{form.students}</span>
                  <span className="text-gray-600">Students</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedForm(form)
                    setIsDetailsOpen(true)
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setSelectedForm(form)
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
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedForm?.code} Details</DialogTitle>
            <DialogDescription>View and manage students in this registration form</DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Form Tutor</h3>
                <p className="text-gray-700">{selectedForm?.tutor}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Total Students</h3>
                <p className="text-3xl font-bold text-gray-800">{selectedForm?.students}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Students</h3>
                <Button variant="outline" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </div>
              <Input
                placeholder="Search students..."
                className="mb-4"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {/* Placeholder for student list */}
                  <div className="text-gray-500 text-center py-8">Student list will be displayed here</div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Add Students to {selectedForm?.code}</SheetTitle>
            <SheetDescription>Select students to add to this registration form.</SheetDescription>
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
                {/* Placeholder for student selection list */}
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

