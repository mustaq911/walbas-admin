"use client"

import * as React from "react"
import { ChevronRight, Lock, Plus, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Category {
  id: number
  name: string
  shortCode: string
  isManaged?: boolean
  subCategories?: Category[]
}

const categories: Category[] = [
  { id: 1, name: "Rapid Reader Plus", shortCode: "RR+" },
  { id: 2, name: "GCSE Additional Support", shortCode: "GCSE Add" },
  { id: 3, name: "Isolation", shortCode: "ISO" },
  { id: 4, name: "Attendance", shortCode: "ATT" },
  { id: 5, name: "GCSE Resits", shortCode: "Resits" },
  { id: 6, name: "Mental Health Support", shortCode: "MHS" },
  { id: 16, name: "Catch up", shortCode: "CUP" },
  { id: 17, name: "Year 12", shortCode: "Y12" },
  { id: 18, name: "Metacognition", shortCode: "Meta", isManaged: true },
  { id: 19, name: "Behavioural, Emotional and Social", shortCode: "BESD", isManaged: true },
  { id: 20, name: "General Curriculum Development", shortCode: "GCD", isManaged: true },
  { id: 21, name: "EAL Support", shortCode: "EAL", isManaged: true },
  { id: 22, name: "Extended School Activities", shortCode: "ESA", isManaged: true },
]

export default function InterventionSetup() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.shortCode.toLowerCase().includes(searchQuery.toLowerCase()),
  )


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Intervention Categories</h1>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-end items-center">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search categories..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-220px)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Short Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                      <>
                        <TableRow className="cursor-pointer hover:bg-gray-50" key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>{category.shortCode}</TableCell>
                          <TableCell>
                            {category.isManaged ? (
                              <Badge variant="secondary" className="gap-1">
                                <Lock className="h-3 w-3" />
                                Managed by Arbor
                              </Badge>
                            ) : (
                              <Badge variant="outline">Editable</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" disabled={category.isManaged} className="h-8 w-8 p-0">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>


                      </>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

