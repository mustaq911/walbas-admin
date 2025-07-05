"use client"

import { useState } from "react"
import { CalendarIcon, Download, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const dummyData = [
  {
    id: 1,
    student: "Price Carole",
    year: "Year 13",
    regForm: "13NJ",
    statutoryCount: 17,
    lessonCount: 24,
    statutoryPercentage: 70.8,
    lessonPercentage: 100,
  },
  {
    id: 2,
    student: "Buch Sid",
    year: "Year 13",
    regForm: "13BI",
    statutoryCount: 14,
    lessonCount: 21,
    statutoryPercentage: 58.3,
    lessonPercentage: 87.5,
  },
  {
    id: 3,
    student: "Stewart Heather",
    year: "Year 12",
    regForm: "12LC",
    statutoryCount: 11,
    lessonCount: 12,
    statutoryPercentage: 45.8,
    lessonPercentage: 50,
  },
]

export default function BrokenWeeks() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto py-2">
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>Start Date 1st Sep 2024. End Date 24th Feb 2025. Showing Unauthorised absence marks.</span>
            <Button variant="outline" size="sm" className="ml-auto">
              Change
            </Button>
          </CardDescription>
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
                  <TableHead>Reg. Form</TableHead>
                  <TableHead className="text-right">Statutory/Roll Call</TableHead>
                  <TableHead className="text-right">Lesson by Lesson</TableHead>

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
                    <TableCell>{row.regForm}</TableCell>
                    <TableCell className="text-right font-medium">{row.statutoryCount}</TableCell>
                    <TableCell className="text-right font-medium">{row.lessonCount}</TableCell>
   
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

