"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Settings2, HelpCircle, Maximize2, ChevronDown, Eye, Clock, UserCheck } from "lucide-react"
import IncidentForm from "./IncidentForm"



interface Incident {
  id: string
  date: string
  severity: "Low" | "Medium" | "High"
  behaviour: string
  student: string
}

export default function IncidentManagement() {


  const incidents: Incident[] = [] // Your incidents data here

  return (
    <div className="container mx-auto py-2">
      <div className="flex justify-end items-center mb-6">
        <IncidentForm />
      </div>

      <Tabs defaultValue="assigned" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="assigned" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Assigned To Me
          </TabsTrigger>
          <TabsTrigger value="watched" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Watched By Me
          </TabsTrigger>
          <TabsTrigger value="resolved" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Resolved In Last Week
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Bulk action
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                <DropdownMenuItem>Assign to me</DropdownMenuItem>
                <DropdownMenuItem>Export selected</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  Hide columns
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Date</DropdownMenuItem>
                <DropdownMenuItem>Severity</DropdownMenuItem>
                <DropdownMenuItem>Behaviour</DropdownMenuItem>
                <DropdownMenuItem>Student</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Input placeholder="Search this table" className="w-[300px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon">
              <Settings2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <input type="checkbox" />
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Behaviour</TableHead>
                <TableHead>Student</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No behavioural incidents assigned to you.
                  </TableCell>
                </TableRow>
              ) : (
                incidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{incident.date}</TableCell>
                    <TableCell>{incident.severity}</TableCell>
                    <TableCell>{incident.behaviour}</TableCell>
                    <TableCell>{incident.student}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Tabs>
    </div>
  )
}

