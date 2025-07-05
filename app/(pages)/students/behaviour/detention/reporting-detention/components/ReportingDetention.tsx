"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Download,
  Settings,
  HelpCircle,
  Columns,
  ChevronDown,
  Maximize2,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"


interface DetentionReport {
  student: {
    name: string
    link: string
  }
  reason: string
  detentionType: string
  issuedDate: string
  issuedBy: {
    name: string
    color: "green" | "brown"
  }
  detentionDate: string
  attendance?: string
  lastSession?: string
}

export default function DetentionReports() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage,] = useState(1)

  const reports: DetentionReport[] = [
    {
      student: {
        name: "Adams, Oliver",
        link: "adams-oliver",
      },
      reason: "Refusal",
      detentionType: "Reflection",
      issuedDate: "23 Feb 2025",
      issuedBy: {
        name: "Nathan",
        color: "brown",
      },
      detentionDate: "Wed, 26 Feb 2025, 09:00",
      lastSession: "Registration: Year 8: Form Time",
    },
    {
      student: {
        name: "Morris, Abigail",
        link: "morris-abigail",
      },
      reason: "Late to Form (before 8:50)",
      detentionType: "Uniform Detention",
      issuedDate: "14 Feb 2025",
      issuedBy: {
        name: "Fred",
        color: "green",
      },
      detentionDate: "Fri, 28 Feb 2025, 14:50",
      attendance: "Absent (failed to attend)",
      lastSession: "KS3 Math: Year 7: Y7Set4",
    },
    // Add more sample data...
  ]

  const filteredReports = reports.filter((report) =>
    Object.values(report).some(
      (value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  return (
    <div className="container mx-auto py-2 space-y-6">

      <div className="bg-white border rounded-md">
        <div className="p-4 flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Columns className="h-4 w-4" />
                  Hide columns
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Student</DropdownMenuItem>
                <DropdownMenuItem>Reason</DropdownMenuItem>
                <DropdownMenuItem>Detention Type</DropdownMenuItem>
                <DropdownMenuItem>Issued Date</DropdownMenuItem>
                <DropdownMenuItem>Issued By</DropdownMenuItem>
                <DropdownMenuItem>Detention Date</DropdownMenuItem>
                <DropdownMenuItem>Detention Attendance</DropdownMenuItem>
                <DropdownMenuItem>Last Timetabled Session</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Input
              placeholder="Search this table"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[300px]"
            />
            <Button variant="outline">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Detention Type</TableHead>
              <TableHead>Issued Date</TableHead>
              <TableHead>Issued By</TableHead>
              <TableHead>Detention Date</TableHead>
              <TableHead>Detention Attendance</TableHead>
              <TableHead>Last Timetabled Session</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report, index) => (
              <TableRow key={index}>
                <TableCell>
                  <a href={`#${report.student.link}`} className="text-blue-600 hover:underline">
                    {report.student.name}
                  </a>
                </TableCell>
                <TableCell>{report.reason}</TableCell>
                <TableCell>{report.detentionType}</TableCell>
                <TableCell>{report.issuedDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`${
                        report.issuedBy.color === "green"
                          ? "text-green-600 border-green-600"
                          : "text-amber-800 border-amber-800"
                      }`}
                    >
                      {report.issuedBy.name}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{report.detentionDate}</TableCell>
                <TableCell>{report.attendance && <span className="text-red-500">{report.attendance}</span>}</TableCell>
                <TableCell>{report.lastSession}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 flex items-center justify-between border-t">
          <p className="text-sm text-muted-foreground">Showing 150 of 151 results</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={currentPage === 1}>
              Previous
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                2
              </Button>
              <ChevronRight className="h-4 w-4" />
            </div>
            <Button variant="outline" size="icon">
              <Maximize2 className="h-4 w-4" />
              <span className="sr-only">Expand table</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

