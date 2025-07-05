"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, CheckCircle2, XCircle, Clock, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  student: {
    id: string
    name: string
    form: string
    year: string
    lessons: {
      period: string
      time: string
      subject: string
      room: string
      teacher: string
      status: string
    }[]
  } | null
}

export function StudentModal({ isOpen, onClose, student }: StudentModalProps) {
  const [editingLesson, setEditingLesson] = useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "late":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!student) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Student Summary</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Student Info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline">{student.form}</Badge>
                <Badge variant="outline">{student.year}</Badge>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Today Schedule</h4>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {student.lessons.map((lesson) => (
                  <Card key={lesson.period}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">{lesson.subject}</div>
                          <div className="text-sm text-muted-foreground">
                            {lesson.teacher} • {lesson.room}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">{lesson.time}</div>
                          {editingLesson === lesson.period ? (
                            <Select
                              defaultValue={lesson.status}
                              onValueChange={(value) => {
                                // Here you would update the lesson status
                                console.log(`Updated ${lesson.period} to ${value}`)
                                setEditingLesson(null)
                              }}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="present">Present</SelectItem>
                                <SelectItem value="absent">Absent</SelectItem>
                                <SelectItem value="late">Late</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge variant="secondary" className={getStatusColor(lesson.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(lesson.status)}
                                {lesson.status}
                              </span>
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingLesson(editingLesson === lesson.period ? null : lesson.period)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

