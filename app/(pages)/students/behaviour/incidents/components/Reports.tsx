"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import {
  Download,
  ChevronDown,
  Group,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  SlidersHorizontal,
  X,
} from "lucide-react"
import { useState } from "react"

interface Incident {
  id: string
  dateTime: string
  severity: "Level 4 Negative" | "Level 3 Negative" | "Level 2 Negative" | "Level 1 Negative"
  behaviour: string
  student: string
  status: "Resolved" | "Not Resolved" | "In Progress"
}

const mockData: Incident[] = Array.from({ length: 10 }, (_, i) => ({
  id: (i + 1).toString(),
  dateTime: "20 Feb 2025, 09:41",
  severity: "Level 4 Negative",
  behaviour: "C4",
  student: ["Elijah Johnson", "Daniel Turner", "Mr L Adams"][i % 3],
  status: ["Not Resolved", "In Progress", "Resolved"][i % 3] as "Not Resolved" | "In Progress" | "Resolved",
}))

export default function IncidentReporting() {

  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col bg-gray-50/40 dark:bg-gray-900/40">

      <div className="p-6 border-b space-y-4 bg-background shadow-sm">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
    

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Group className="h-4 w-4" />
                  No grouping
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Group by Severity</DropdownMenuItem>
                <DropdownMenuItem>Group by Status</DropdownMenuItem>
                <DropdownMenuItem>Group by Behaviour</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <X className="h-4 w-4 mr-2" /> Clear Grouping
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="h-9 hover:bg-gray-100 dark:hover:bg-gray-800">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search incidents..." className="h-9 pl-8 w-[250px] md:w-[300px] pr-4" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Download CSV</DropdownMenuItem>
                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Print Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="bg-background rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold" onClick={() => handleSort("dateTime")}>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    Date/Time
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold" onClick={() => handleSort("severity")}>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    Severity
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold" onClick={() => handleSort("behaviour")}>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    Behaviour
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold" onClick={() => handleSort("student")}>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    Students involved
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold" onClick={() => handleSort("status")}>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    Status
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((incident) => (
                <TableRow key={incident.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                  <TableCell className="font-medium">{incident.dateTime}</TableCell>
                  <TableCell>
                    <div className="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center">
                      {incident.severity}
                    </div>
                  </TableCell>
                  <TableCell>{incident.behaviour}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium">
                        {incident.student
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      {incident.student}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn("px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1", {
                        "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400":
                          incident.status === "Not Resolved",
                        "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400":
                          incident.status === "Resolved",
                        "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400":
                          incident.status === "In Progress",
                      })}
                    >
                      <span
                        className={cn("h-1.5 w-1.5 rounded-full", {
                          "bg-orange-500": incident.status === "Not Resolved",
                          "bg-green-500": incident.status === "Resolved",
                          "bg-blue-500": incident.status === "In Progress",
                        })}
                      />
                      {incident.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="border-t px-6 py-4 bg-background shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">10</span> results
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

