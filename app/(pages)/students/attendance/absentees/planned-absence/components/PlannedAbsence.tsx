"use client"

import { useState } from "react"
import { Download, Filter, PlusCircle, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const dummyData = [
  {
    id: 1,
    student: "Turner Rob",
    year: "Year 8",
    regForm: "7NP",
    absenceDates: {
      start: "Mon, 17th Feb 2025, 00:00",
      end: "Tue, 25th Feb 2025, 00:00",
    },
    mark: "Illness (I)",
    notes: "Rob Turner got ill",
  },
  {
    id: 2,
    student: "Turner Joseph",
    year: "Year 8",
    regForm: "8CD",
    absenceDates: {
      start: "Mon, 17th Feb 2025, 00:00",
      end: "Tue, 25th Feb 2025, 00:00",
    },
    mark: "Illness (I)",
    notes: "Joseph Turner got ill",
  },
  {
    id: 3,
    student: "Holmes Melissa",
    year: "Year 10",
    regForm: "10AV",
    absenceDates: {
      start: "Mon, 17th Feb 2025, 00:00",
      end: "Tue, 25th Feb 2025, 00:00",
    },
    mark: "Family Holiday (Not Agreed) (G)",
    notes: "Melissa Holmes extended family holiday (not agreed)",
  },
  {
    id: 4,
    student: "Richards Gavin",
    year: "Year 10",
    regForm: "10XM",
    absenceDates: {
      start: "Mon, 17th Feb 2025, 00:00",
      end: "Tue, 25th Feb 2025, 00:00",
    },
    mark: "Study Leave (S)",
    notes: "Gavin Richards study leave",
  },
]

export default function PlannedAbsences() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto py-2">
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Record Planned Absence
          </Button>
        </div>

        <Tabs defaultValue="planned" className="w-full">
          <TabsList>
            <TabsTrigger value="planned">Planned Absences</TabsTrigger>
            <TabsTrigger value="pending">Pending Absence Records</TabsTrigger>
          </TabsList>

          <TabsContent value="planned" className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Filter className="h-4 w-4 text-green-600" />
              <span>Start Date 24th Feb 2025. End Date 31st Aug 2025.</span>
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
                    <TableHead>Reg. Form</TableHead>
                    <TableHead>Absence Dates</TableHead>
                    <TableHead>Mark</TableHead>
                    <TableHead>Notes</TableHead>
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
                      <TableCell>{row.regForm}</TableCell>
                      <TableCell>
                        <div className="whitespace-nowrap">
                          {row.absenceDates.start}
                          <br />- {row.absenceDates.end}
                        </div>
                      </TableCell>
                      <TableCell>{row.mark}</TableCell>
                      <TableCell>{row.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              No pending absence records
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

