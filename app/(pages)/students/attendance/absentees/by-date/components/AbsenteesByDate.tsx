"use client"

import { useState } from "react"
import { CalendarIcon, Download, Filter, Phone, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function AbsenteesTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const dummyData = [
    {
      id: 1,
      student: "Baker Nikki",
      year: "Year 13",
      form: "13SG",
      date: "Thu, 13 Feb 2025",
      lessons: "(Entire Day)",
      days: 1,
      mark: "Illness (I)",
      notes: "No Reason (N)",
      isIllness: true,
    },
    {
      id: 2,
      student: "James Clare",
      year: "Year 13",
      form: "13MS",
      date: "Thu, 13 Feb 2025",
      lessons: "1/4 lessons",
      days: 1,
      mark: "No Reason (N)",
      notes: "",
      needsCall: false,
    },
    {
      id: 3,
      student: "Phillips Sarah",
      year: "Year 13",
      form: "13MS",
      date: "Thu, 13 Feb 2025",
      lessons: "1/4 lessons",
      days: 2,
      mark: "No Reason (N)",
      notes: "",
      needsCall: true,
    },
  ]

  return (
    <div className="container mx-auto py-2">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span>Start Date 13th Feb 2025. End Date 13th Feb 2025. Showing Group by date.</span>
          <Button variant="outline" size="sm" className="ml-auto">
            Change
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Bulk action</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Mark as Present</DropdownMenuItem>
              <DropdownMenuItem>Mark as Absent</DropdownMenuItem>
              <DropdownMenuItem>Send Notification</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Hide columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Student</DropdownMenuItem>
              <DropdownMenuItem>Year</DropdownMenuItem>
              <DropdownMenuItem>Form</DropdownMenuItem>
              <DropdownMenuItem>Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search this table"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]">
                <input type="checkbox" />
              </TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Form</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Lessons</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Mark</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Follow-up</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>
                  <a href="#" className="text-primary hover:underline">
                    {row.student}
                  </a>
                </TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.form}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.lessons}</TableCell>
                <TableCell>{row.days}</TableCell>
                <TableCell>
                  <Badge variant="destructive">{row.mark}</Badge>
                </TableCell>
                <TableCell>{row.notes}</TableCell>
                <TableCell>
                  {row.needsCall && (
                    <Button variant="outline" size="sm" className="text-green-600">
                      <Phone className="h-4 w-4 mr-2" />
                      Telephone Call
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

