"use client"

import { useState } from "react"
import { Download, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const dummyData = [
  {
    id: 1,
    student: "Johnson Mia",
    year: "Year 8",
    form: "8FV",
    unauthorized: 4.19,
    authorized: 21.99,
    absent: 26.18,
    present: 73.82,
    breakdown: [
      { type: "Illness (I)", sessions: 36, percentage: 18.8 },
      { type: "Family Holiday (Not Agreed) (G)", sessions: 8, percentage: 4.2 },
      { type: "Traveller Absence (T)", sessions: 6, percentage: 3.1 },
    ],
    totalAbsences: 50,
  },
  {
    id: 2,
    student: "Brown Noah",
    year: "Year 8",
    form: "8FV",
    unauthorized: 1.05,
    authorized: 13.61,
    absent: 14.66,
    present: 85.34,
    breakdown: [{ type: "Study Leave (S)", sessions: 4, percentage: 2.1 }],
    totalAbsences: 4,
  },
]

export default function PersistentAbsentees() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto py-2">
      <div className="space-y-4">

        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-2">
            <Filter className="h-4 w-4 text-green-600" />
            Start Date 1st Sep 2024. End Date 24th Feb 2025. Mark Type Statutory/Roll Call. Filter Using Overall
            Absence...
          </span>
          <Button variant="outline" size="sm" className="ml-auto">
            Change
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Bulk action
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Hide columns
            </Button>
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

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]">
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Form</TableHead>
                <TableHead className="text-right">Unauth.</TableHead>
                <TableHead className="text-right">Auth.</TableHead>
                <TableHead className="text-right">Absent</TableHead>
                <TableHead className="text-right">Present</TableHead>
                <TableHead>Breakdown</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell>
                    <a href="#" className="text-primary hover:underline">
                      {row.student}
                    </a>
                  </TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.form}</TableCell>
                  <TableCell className="text-right">{row.unauthorized}%</TableCell>
                  <TableCell className="text-right">{row.authorized}%</TableCell>
                  <TableCell className="text-right">{row.absent}%</TableCell>
                  <TableCell className="text-right">{row.present}%</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {row.breakdown.map((item, index) => (
                        <div key={index}>
                          {item.type}: {item.sessions} sessions ({item.percentage}%)
                        </div>
                      ))}
                      <div className="pt-1">
                        <span className="font-medium">Total Absences: {row.totalAbsences} sessions</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

