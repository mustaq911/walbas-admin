"use client"

import { useState } from "react"
import { Download, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"


const dummyData = [
  {
    id: 1,
    student: "Mason Alison",
    year: "Year 10",
    form: "10KH",
    mark: "No Reason (N)",
    absencePeriod: "13 Feb 2025",
    consecutiveDays: 1,
    status: "no-reason",
  },
  {
    id: 2,
    student: "Carter Aaliyah",
    year: "Year 7 s1",
    form: "8CD",
    mark: "Excluded With No Alternative",
    absencePeriod: "13 Feb 2025",
    consecutiveDays: 1,
    status: "excluded",
  },
  {
    id: 3,
    student: "Campbell Holly",
    year: "Year 12",
    form: "12YK",
    mark: "Illness (I)",
    absencePeriod: "11 Feb 2025 - 13 Feb 2025",
    consecutiveDays: 3,
    status: "illness",
  },
]

export default function ContinuousAbsence() {

  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "no-reason":
        return "destructive"
      case "illness":
        return "warning"
      case "excluded":
        return "secondary"
      case "traveller":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <div className="container mx-auto py-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
  
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
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
                  <TableHead>Mark</TableHead>
                  <TableHead>Absence Period</TableHead>
                  <TableHead className="text-right">Consecutive Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </TableCell>
                    <TableCell>
                      <a href="#" className="text-primary hover:underline font-medium">
                        {row.student}
                      </a>
                    </TableCell>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.form}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(row.status)}>{row.mark}</Badge>
                    </TableCell>
                    <TableCell>{row.absencePeriod}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="ml-auto">
                        {row.consecutiveDays} {row.consecutiveDays === 1 ? "day" : "days"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

