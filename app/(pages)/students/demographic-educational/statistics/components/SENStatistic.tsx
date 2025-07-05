"use client"

import { BarChart, Download, Filter, Info, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


const senData = [
  {
    status: "Education, Health and Care Plan",
    students: 25,
    senPercentage: 29.41,
    totalPercentage: 1.64,
  },
  {
    status: "School ActionPlus and Statutory Assessment",
    students: 8,
    senPercentage: 9.41,
    totalPercentage: 0.52,
  },
  {
    status: "School/Early Years Action",
    students: 10,
    senPercentage: 11.76,
    totalPercentage: 0.65,
  },
  {
    status: "School/Early Years Action+",
    students: 9,
    senPercentage: 10.59,
    totalPercentage: 0.59,
  },
  {
    status: "SEN Support",
    students: 11,
    senPercentage: 12.94,
    totalPercentage: 0.72,
  },
  {
    status: "Statement",
    students: 10,
    senPercentage: 11.76,
    totalPercentage: 0.65,
  },
  {
    status: "Monitoring",
    students: 12,
    senPercentage: 14.12,
    totalPercentage: 0.79,
  },
]

export default function SENStatistic() {
  const totalStudents = senData.reduce((acc, curr) => acc + curr.students, 0)

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <div className="flex flex-col gap-4 p-4 md:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">February 25th, 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Filter data</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Print</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">Across all SEN categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Highest Category</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">29.41%</div>
              <p className="text-xs text-muted-foreground">Education, Health and Care Plan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Average Students</CardTitle>
              <Info className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalStudents / senData.length).toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Per category</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Breakdown of SEN statuses and their percentages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {senData.map((item) => (
                <div key={item.status} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.status}</div>
                      <div className="text-muted-foreground">{item.students} students</div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="text-right">
                        <div className="font-medium">{item.senPercentage}%</div>
                        <div className="text-xs text-muted-foreground">of SEN students</div>
                      </div>
                      <div className="text-right min-w-[60px]">
                        <div className="font-medium">{item.totalPercentage}%</div>
                        <div className="text-xs text-muted-foreground">of total</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${item.senPercentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

