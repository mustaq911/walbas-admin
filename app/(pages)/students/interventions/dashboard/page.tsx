"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Download, Filter, Plus, Search, Settings2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const interventions = [
  {
    id: 1,
    name: "6th Form Teacher Absence",
    groups: 0,
    effectiveDate: "18 Dec 2024 - 19 Dec 2024",
    reviewDate: "19 Dec 2024",
    status: "Upcoming",
  },
  {
    id: 2,
    name: "6th Form U Grade Prediction Intervention",
    groups: 0,
    effectiveDate: "25 Nov 2024 - 01 Apr 2025",
    reviewDate: "01 Apr 2025",
    status: "Active",
  },
  {
    id: 3,
    name: "AMA Triage",
    groups: 50,
    effectiveDate: "17 Jan 2025 - 25 Jul 2025",
    reviewDate: "25 Jul 2025",
    status: "Planned",
  },
  {
    id: 4,
    name: "Art club",
    groups: 1,
    effectiveDate: "27 Oct 2024 - 31 Aug 2025",
    reviewDate: "31 Aug 2025",
    status: "Active",
  },
  {
    id: 5,
    name: "Attendance Boot Camp",
    groups: 2,
    effectiveDate: "01 Sep 2024 - 31 Aug 2025",
    reviewDate: "31 Aug 2025",
    status: "Active",
  },
  {
    id: 6,
    name: "Attendance Monitoring",
    groups: 2,
    effectiveDate: "13 Nov 2024 - 20 Nov 2024",
    reviewDate: "20 Nov 2024",
    status: "Upcoming",
  },
  {
    id: 7,
    name: "At the bus",
    groups: 1,
    effectiveDate: "30 Jan 2025 - 31 Aug 2025",
    reviewDate: "31 Aug 2025",
    status: "Planned",
  },
  {
    id: 8,
    name: "Chimp Paradox Meeting",
    groups: 1,
    effectiveDate: "18 Oct 2024 - 12 Aug 2025",
    reviewDate: "12 Aug 2025",
    status: "Active",
  },
  {
    id: 9,
    name: "Confident Me ET",
    groups: 1,
    effectiveDate: "18 Oct 2024 - 31 Aug 2025",
    reviewDate: "31 Aug 2025",
    status: "Active",
  },
  {
    id: 10,
    name: "Core Catch up",
    groups: 1,
    effectiveDate: "01 Sep 2024 - 31 Aug 2025",
    reviewDate: "31 Aug 2025",
    status: "Active",
  },
]

export default function InterventionsDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])

  const filteredInterventions = interventions.filter(
    (intervention) =>
      intervention.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter.length === 0 || statusFilter.includes(intervention.status)),
  )

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Select defaultValue="2024/2025" >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024/2025">2024/2025</SelectItem>
                  <SelectItem value="2023/2024">2023/2024</SelectItem>
                  <SelectItem value="2022/2023">2022/2023</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="ml-2">
                <Settings2 className="h-4 w-4" />
              </Button>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Create Intervention
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>All Interventions</CardTitle>
              <div className="flex flex-1 sm:flex-none items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none sm:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search interventions..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes("Active")}
                      onCheckedChange={(checked) =>
                        setStatusFilter((prev) =>
                          checked ? [...prev, "Active"] : prev.filter((status) => status !== "Active"),
                        )
                      }
                    >
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes("Upcoming")}
                      onCheckedChange={(checked) =>
                        setStatusFilter((prev) =>
                          checked ? [...prev, "Upcoming"] : prev.filter((status) => status !== "Upcoming"),
                        )
                      }
                    >
                      Upcoming
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes("Planned")}
                      onCheckedChange={(checked) =>
                        setStatusFilter((prev) =>
                          checked ? [...prev, "Planned"] : prev.filter((status) => status !== "Planned"),
                        )
                      }
                    >
                      Planned
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="space-y-4">
                {filteredInterventions.map((intervention) => (
                  <Card key={intervention.id} className="hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{intervention.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {intervention.effectiveDate}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            intervention.status === "Active"
                              ? "default"
                              : intervention.status === "Upcoming"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {intervention.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

