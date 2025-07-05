"use client"

import * as React from "react"
import { CalendarIcon, ChevronDownIcon, DownloadIcon, MoreHorizontal, SearchIcon } from "lucide-react"
import { format } from "date-fns"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Mock data
const exclusions = [
  {
    id: 1,
    student: "Watson, Caitlin",
    year: "9",
    form: "9CN",
    decisionDate: new Date("2025-02-03"),
    startDate: new Date("2025-02-03"),
    reasons: ["Physical assault/violent behaviour against a pupil"],
    severity: "high",
  },
  {
    id: 2,
    student: "Bailey, Ella",
    year: "10",
    form: "10SP",
    decisionDate: new Date("2025-01-27"),
    startDate: new Date("2025-01-27"),
    reasons: ["Alcohol related", "Drug dealing", "Sexual graffiti", "Theft", "Vandalism"],
    severity: "high",
  },
  {
    id: 3,
    student: "Clark, Aaron",
    year: "12",
    form: "12LC",
    decisionDate: new Date("2025-01-17"),
    startDate: new Date("2025-01-17"),
    reasons: ["Indecent exposure"],
    severity: "medium",
  },
  {
    id: 4,
    student: "Clark, Abigail",
    year: "13",
    form: "13BI",
    decisionDate: new Date("2024-10-23"),
    startDate: new Date("2024-10-23"),
    reasons: ["Damage to school property"],
    severity: "low",
  },
]

export default function ExclusionsList() {
  const [date, setDate] = React.useState<Date>()
  const [search, setSearch] = React.useState("")
  const [yearFilter, setYearFilter] = React.useState("all")

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Permanent Exclusions</h1>
          <p className="text-muted-foreground">Manage and monitor student exclusions</p>
        </div>

      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="9">Year 9</SelectItem>
              <SelectItem value="10">Year 10</SelectItem>
              <SelectItem value="11">Year 11</SelectItem>
              <SelectItem value="12">Year 12</SelectItem>
              <SelectItem value="13">Year 13</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          <div className="relative flex-1 sm:w-[300px]">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exclusions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <DownloadIcon className="mr-2 h-4 w-4" />
                Export
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Print</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-4">
        {exclusions.map((exclusion) => (
          <Card key={exclusion.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">{exclusion.student}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    Year {exclusion.year} • Form {exclusion.form}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div>
                    <span className="font-medium">Decision:</span> {format(exclusion.decisionDate, "dd MMM yyyy")}
                  </div>
                  <div>
                    <span className="font-medium">Start:</span> {format(exclusion.startDate, "dd MMM yyyy")}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="space-y-2">
                <h3 className="font-semibold text-base">Reasons for Exclusion:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {exclusion.reasons.map((reason, index) => (
                    <li key={index} className="text-base">
                      • {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

