import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Download,
  Filter,
  HelpCircle,
  Search,
  Settings2,
  ChevronRight,
  AlertCircle,
  Pill,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function MedicalConditionsCards() {
  const medicalData = [
    {
      id: 1,
      photo: "",
      name: "Evans Molly",
      age: 15,
      condition: "Abdominal pain",
      severity: "Moderate",
      summary: "Ongoing abdominal discomfort affecting daily activities",
      symptoms: "Pain in lower abdomen, nausea, occasional vomiting",
      treatment: "Prescribed pain relievers, dietary changes, regular check-ups",
      status: "Ongoing",
      lastUpdated: "2025-02-15",
    },
    {
      id: 2,
      photo: "",
      name: "Adams L",
      age: 16,
      condition: "Afebrile seizures",
      severity: "Severe",
      summary: "Recently diagnosed with seizure disorder, requires close monitoring",
      symptoms: "Fainting/Shaking, brief loss of consciousness",
      treatment: "Anti-epileptic medication, regular neurologist visits, emergency protocol in place",
      status: "11 Feb 2025 - ongoing",
      lastUpdated: "2025-02-11",
    },

  ]

  return (
    <div className="w-full px-6 py-6 bg-gray-50 min-h-screen">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Medical Conditions</h1>
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

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search medical conditions..." className="pl-8 bg-white" />
          </div>
          <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {medicalData.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={item.photo} alt={`${item.name}'s avatar`} />
                    <AvatarFallback>
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                    <p className="text-sm text-gray-500">Age: {item.age}</p>
                  </div>
                </div>
                <Badge variant={item.severity === "Severe" ? "destructive" : "secondary"} className="font-medium">
                  {item.severity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.condition}</h3>
                    <p className="text-sm text-gray-600">{item.summary}</p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Symptoms:</span> {item.symptoms}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Pill className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Treatment:</span> {item.treatment}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-normal">
                        {item.status}
                      </Badge>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Updated: {item.lastUpdated}
                      </span>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Link href={`/medical-condition/${item.id}`}>
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

