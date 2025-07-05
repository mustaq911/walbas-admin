"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Download, HelpCircle, Settings, Search } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function DataCollections() {
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex justify-end items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-500">Create new policy</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Policy</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Academic year*</Label>
                  <Select defaultValue="2024/2025">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024/2025">2024/2025</SelectItem>
                      <SelectItem value="2023/2024">2023/2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Policy name*</Label>
                  <Input placeholder="Enter policy name" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Policy Deadlines</h3>
                  <div>
                    <Label className="flex items-center gap-2">
                      Mark entry
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </Label>
                    <Select defaultValue="option1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">5 working days before the collection deadline</SelectItem>
                        <SelectItem value="option2">3 working days before the collection deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      Level 1 approval
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select deadline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3days">3 days</SelectItem>
                        <SelectItem value="5days">5 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      Level 2 approval
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select deadline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3days">3 days</SelectItem>
                        <SelectItem value="5days">5 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#8BC34A] hover:bg-[#7CB342]">Create Policy</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Hide columns</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Year</DropdownMenuItem>
                <DropdownMenuItem>Policy Name</DropdownMenuItem>
                <DropdownMenuItem>Collections</DropdownMenuItem>
                <DropdownMenuItem>Most Recent Collection</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search this table" className="pl-8 w-[300px]" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
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
              <TableHead className="w-[200px]">Year</TableHead>
              <TableHead>Policy Name</TableHead>
              <TableHead className="w-[150px]">Collections</TableHead>
              <TableHead className="w-[200px]">Most Recent Collection</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { year: "2024/2025", name: "Y11 Data Collection", collections: 2, recent: "12 Jun 2025" },
              { year: "2024/2025", name: "Year 11", collections: 2, recent: "03 Mar 2025" },
              { year: "2024/2025", name: "Year 10", collections: 1, recent: "31 Jan 2025" },
              { year: "2024/2025", name: "Autumn Term 24/25", collections: 1, recent: "21 Oct 2024" },
              { year: "2022/2023", name: "Year 11 - Autumn", collections: 1, recent: "30 Nov 2022" },
              { year: "2021/2022", name: "Termly ARR", collections: 3, recent: "15 Jul 2022" },
              { year: "2024/2025", name: "Y10 CG", collections: 0, recent: "" },
            ].map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.year}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.collections}</TableCell>
                <TableCell>{item.recent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t">
          <p className="text-sm text-muted-foreground">Showing 7 results</p>
        </div>
      </div>
    </div>
  )
}

