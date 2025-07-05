"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Download, Settings, HelpCircle, Columns, ChevronDown, Maximize2 } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IssueDetentionDialog } from "./IssueDetentionDialog"

interface Detention {
  type: string
  startDate: string
  endDate: string
  room: string
  capacity: number | string
  staff: string
  students: number
  link?: string 
  staffStatus?: "none" 
}

export default function DetentionDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage,] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(100)

  const detentions: Detention[] = [
    {
      type: "ILU",
      startDate: "Tue, 25 Feb 2025, 09:00",
      endDate: "Tue, 25 Feb 2025, 14:30",
      room: "Site 1: 219",
      capacity: 32,
      staff: "Allen Allen",
      students: 0,
    },
    {
      type: "Reflection",
      startDate: "Tue, 25 Feb 2025, 09:00",
      endDate: "Tue, 25 Feb 2025, 15:25",
      room: "Site 1: 220",
      capacity: 34,
      staff: "Allen Allen",
      students: 9,
    },
    // Add more sample data as needed
  ]

  const recentDetentions: Detention[] = [
    {
      type: "late to school",
      link: "late-to-school",
      startDate: "Thu, 13 Feb 2025, 15:10",
      endDate: "Thu, 13 Feb 2025, 15:40",
      room: "Site 1: Hall",
      capacity: 150,
      staff: "Allen Allen",
      students: 0,
    },
    {
      type: "40 minute Detention",
      link: "40-minute-detention",
      startDate: "Thu, 13 Feb 2025, 15:00",
      endDate: "Thu, 13 Feb 2025, 15:30",
      room: "Howard Keel Theatre: Howard Building",
      capacity: 500,
      staff: "Allen Allen",
      students: 6,
    },
    {
      type: "OCE",
      link: "oce",
      startDate: "Thu, 13 Feb 2025, 15:00",
      endDate: "Thu, 13 Feb 2025, 15:20",
      room: "Site 1: 797",
      capacity: 32,
      staff: "None allocated",
      staffStatus: "none",
      students: 0,
    },
    // Add more sample data...
  ]

  const filteredDetentions = detentions.filter((detention) =>
    Object.values(detention).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="container mx-auto py-2 space-y-6">
      <div className="flex justify-end items-center">
        <IssueDetentionDialog />
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Detention</TabsTrigger>
          <TabsTrigger value="recent">Recent Detention</TabsTrigger>
          <TabsTrigger value="unallocated">Unallocated Detentions</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="flex justify-between items-center gap-4 flex-wrap">
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
                  <DropdownMenuItem>Detention Type</DropdownMenuItem>
                  <DropdownMenuItem>Start Date</DropdownMenuItem>
                  <DropdownMenuItem>End Date</DropdownMenuItem>
                  <DropdownMenuItem>Room</DropdownMenuItem>
                  <DropdownMenuItem>Capacity</DropdownMenuItem>
                  <DropdownMenuItem>Staff</DropdownMenuItem>
                  <DropdownMenuItem>Students</DropdownMenuItem>
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

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Detention Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Students</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDetentions.map((detention, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{detention.type}</TableCell>
                    <TableCell>{detention.startDate}</TableCell>
                    <TableCell>{detention.endDate}</TableCell>
                    <TableCell>{detention.room}</TableCell>
                    <TableCell>{detention.capacity}</TableCell>
                    <TableCell>{detention.staff}</TableCell>
                    <TableCell>{detention.students}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="flex justify-between items-center gap-4 flex-wrap">
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
                  <DropdownMenuItem>Detention Type</DropdownMenuItem>
                  <DropdownMenuItem>Start Date</DropdownMenuItem>
                  <DropdownMenuItem>End Date</DropdownMenuItem>
                  <DropdownMenuItem>Room</DropdownMenuItem>
                  <DropdownMenuItem>Capacity</DropdownMenuItem>
                  <DropdownMenuItem>Staff</DropdownMenuItem>
                  <DropdownMenuItem>Students</DropdownMenuItem>
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

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Detention Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Students</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDetentions.map((detention, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {detention.link ? (
                        <a href={`#${detention.link}`} className="text-blue-600 hover:underline">
                          {detention.type}
                        </a>
                      ) : (
                        detention.type
                      )}
                    </TableCell>
                    <TableCell>{detention.startDate}</TableCell>
                    <TableCell>{detention.endDate}</TableCell>
                    <TableCell>{detention.room}</TableCell>
                    <TableCell>{detention.capacity}</TableCell>
                    <TableCell>
                      <span className={detention.staffStatus === "none" ? "text-orange-500" : ""}>
                        {detention.staff}
                      </span>
                    </TableCell>
                    <TableCell>{detention.students}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 78 results</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1}>
                Previous
              </Button>
              <span className="text-sm">Page {currentPage}</span>
              <Button variant="outline" size="sm">
                Next
              </Button>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50/page</SelectItem>
                  <SelectItem value="100">100/page</SelectItem>
                  <SelectItem value="200">200/page</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Maximize2 className="h-4 w-4" />
                <span className="sr-only">Expand table</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="unallocated">
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            Unallocated detentions content
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

