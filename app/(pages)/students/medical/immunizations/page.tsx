import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Syringe, Calendar, CheckCircle, XCircle, Building2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"



export default function Immunizations() {
    const studentsData = [
        {
            id: 1,
            name: "Adams Oliver",
            photo: "/placeholder.svg?height=100&width=100",
            immunizations: [
                { name: "Influenza", date: "29 Sep 2023", status: "Completed", provider: "Treewood Health Practice (THP)" },
                { name: "MMR", date: "15 Mar 2022", status: "Completed", provider: "City Central Hospital" },
                { name: "Tdap", date: "10 Jan 2023", status: "Completed", provider: "Treewood Health Practice (THP)" },
            ],
        },
        {
            id: 2,
            name: "Allen Emma",
            photo: "/placeholder.svg?height=100&width=100",
            immunizations: [
                { name: "Influenza", date: "29 Sep 2023", status: "Completed", provider: "Treewood Health Practice (THP)" },
                { name: "MMR", date: "22 Feb 2022", status: "Completed", provider: "Westside Medical Center" },
                { name: "Tdap", date: "18 Dec 2022", status: "Completed", provider: "Treewood Health Practice (THP)" },
                { name: "HPV", date: "07 Jun 2023", status: "Completed", provider: "Treewood Health Practice (THP)" },
            ],
        },
        {
            id: 3,
            name: "Allen Logan",
            photo: "/placeholder.svg?height=100&width=100",
            immunizations: [
                { name: "Influenza", date: "29 Sep 2023", status: "Completed" },
                { name: "MMR", date: "05 Apr 2022", status: "Completed" },

            ],
        },

    ]

    return (
        <div className="w-full px-6 py-6 bg-gray-50 min-h-screen">
            <div className="mb-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">Immunizations</h1>
                    <div className="flex items-center gap-4">
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Record Immunisations
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search students or immunizations..." className="pl-8 bg-white" />
                    </div>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-[240px] bg-white">
                            <SelectValue placeholder="Select students" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Enrolled Students</SelectItem>
                            <SelectItem value="year7">Year 7</SelectItem>
                            <SelectItem value="year8">Year 8</SelectItem>
                            <SelectItem value="year9">Year 9</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {studentsData.map((student) => (
                    <Card key={student.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-4">

                                <div>
                                    <CardTitle className="text-xl">{student.name}</CardTitle>
                                    <p className="text-sm text-gray-500">Student ID: {student.id}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {student.immunizations.map((immunization, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Syringe className="h-5 w-5 text-blue-500" />
                                                <span className="font-medium text-lg">{immunization.name}</span>
                                            </div>
                                            <Badge
                                                variant='success'
                                            >
                                                {immunization.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {immunization.date || "Not scheduled"}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Building2 className="h-4 w-4" />
                                                Treewood Health Practice (THP)
                                            </div>
                                        </div>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex items-center gap-2 text-sm font-medium cursor-help">
                                                        {immunization.status === "Completed" ? (
                                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                                        ) : immunization.status === "Incomplete" ? (
                                                            <XCircle className="h-5 w-5 text-yellow-500" />
                                                        ) : (
                                                            <XCircle className="h-5 w-5 text-red-500" />
                                                        )}
                                                        Status details
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{immunization.status}</p>
                                                    {immunization.status === "Incomplete" && (
                                                        <p className="text-xs text-gray-500">Follow-up required</p>
                                                    )}
                                                    {immunization.status === "Not Started" && (
                                                        <p className="text-xs text-gray-500">Schedule immunization</p>
                                                    )}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
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

