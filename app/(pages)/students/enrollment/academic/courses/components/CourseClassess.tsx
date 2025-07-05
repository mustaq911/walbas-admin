"use client"

import { useState } from "react"
import { ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CourseForm } from "./CourseForm"

export default function CoursesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [expandedCourses, setExpandedCourses] = useState<string[]>([])

  const toggleCourse = (courseId: string) => {
    setExpandedCourses((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
        
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-3">
          <span className="font-medium">Academic Year</span>
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

      <div className="border rounded-lg">
        <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Courses & Classes</h2>
          <Button onClick={() => setIsAddDialogOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="divide-y">
          {courses.map((course) => (
            <div key={course.id} className="p-4">
              <button
                onClick={() => toggleCourse(course.id)}
                className="w-full flex items-center justify-between hover:bg-gray-50 rounded p-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${expandedCourses.includes(course.id) ? "rotate-90" : ""}`}
                  />
                  <span className="font-medium">{course.name}</span>
                  {course.status && <span className="text-sm text-red-600">({course.status})</span>}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>Add New Course to 2024/2025</DialogTitle>
          </DialogHeader>
          <CourseForm onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const courses = [
  { id: "1", name: "AAA", status: "No lessons scheduled" },
  { id: "2", name: "Applied Art and Design (KS4)" },
  { id: "3", name: "Applied Art and Design (KS5)" },
  { id: "4", name: "Art and Design / Art" },
  { id: "5", name: "Biology / Botany / Zoology / Ecology" },
  { id: "6", name: "Break A" },
  { id: "7", name: "Break B" },
  { id: "8", name: "Chemistry" },
  { id: "9", name: "Computer Science" },
  { id: "10", name: "Design and Technology" },
]

