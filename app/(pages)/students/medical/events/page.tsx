import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Download,
  Filter,
  HelpCircle,
  Search,
  Settings2,
  Calendar,
  Clock,
  FileText,
  Stethoscope,
  AlertTriangle,
} from "lucide-react"

export default function MedicalEvents() {
  const medicalEvents = [
    {
      id: 1,
      photo: "/placeholder.svg?height=40&width=40",
      student: {
        name: "Adams L",
        form: "Form 11NK",
      },
      events: [
        {
          type: "First Aid",
          description: "Paracetamol x1 tab given",
          date: "11 Feb 2025",
          time: "12:47",
          severity: "low",
        },
        {
          type: "First Aid",
          description: "Given Paracetamol x1 tab",
          date: "11 Feb 2025",
          time: "12:49",
          severity: "low",
        },
        {
          type: "First Aid",
          description: "test",
          date: "14 Feb 2025",
          time: "13:05",
          severity: "low",
        },
      ],
    },
    {
      id: 2,
      photo: "/placeholder.svg?height=40&width=40",
      student: {
        name: "Adams Oliver",
        form: "Form 8BT",
      },
      events: [
        {
          type: "Accident/Injury",
          description: "hit head",
          date: "09 Dec 2024",
          time: "14:59",
          severity: "high",
        },
        {
          type: "First Aid",
          description: "Bumped head",
          date: "28 Jan 2025",
          time: "11:52",
          severity: "medium",
        },
      ],
    },
  ]

  return (
    <div className="w-full px-6 py-6 bg-gray-50 min-h-screen">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Medical Events</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
              <Settings2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search medical events..." className="pl-8 bg-white" />
          </div>
        <span>DATE RANGE PICKER HERE</span>
          <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900 md:w-auto w-full">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {medicalEvents.map((student) => (
          <Card key={student.id} className="overflow-hidden bg-white shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={student.photo} alt={`${student.student.name}'s avatar`} />
                    <AvatarFallback>
                      {student.student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{student.student.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-500">{student.student.form}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {student.events.map((event, index) => (
                  <div key={index} className="relative pl-6 pb-4">
                    <div className="absolute left-0 top-2 h-full w-px bg-gray-200" />
                    <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-primary" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {event.type === "First Aid" ? (
                            <Stethoscope
                              className={`h-5 w-5 ${event.severity === "low" ? "text-blue-500" : "text-yellow-500"}`}
                            />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          )}
                          <span className="font-medium text-gray-900">{event.type}</span>
                        </div>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

