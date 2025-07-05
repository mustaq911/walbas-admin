"use client"

import { useState } from "react"
import { Users, UserPlus, ChevronRight, Search, Home, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface House {
  id: string
  name: string
  headOfHouse: string
  students: number
  color: string
  points: number
}



export default function Houses() {
  const [houses,] = useState<House[]>([
    { id: "1", name: "Acklam", headOfHouse: "None assigned", students: 304, color: "bg-red-100", points: 1250 },
    { id: "2", name: "Colville", headOfHouse: "None assigned", students: 322, color: "bg-blue-100", points: 1420 },
    { id: "3", name: "Ladbroke", headOfHouse: "None assigned", students: 311, color: "bg-green-100", points: 1380 },
    { id: "4", name: "Westbourne", headOfHouse: "None assigned", students: 285, color: "bg-yellow-100", points: 1290 },
  ])

  const [selectedHouse, setSelectedHouse] = useState<House | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="container mx-auto py-2">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-gray-600 mt-2">Manage houses and student assignments</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="2024/2025">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024/2025">2024/2025</SelectItem>
              <SelectItem value="2023/2024">2023/2024</SelectItem>
              <SelectItem value="2022/2023">2022/2023</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Home className="mr-2 h-4 w-4" />
            New House
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {houses.map((house) => (
          <Card key={house.id} className={`overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
            <CardHeader className={`${house.color}`}>
              <CardTitle className="text-xl text-gray-800">{house.name}</CardTitle>
              <CardDescription className="text-gray-700">
                {house.headOfHouse === "None assigned" ? (
                  <span className="text-yellow-600 font-medium">No head of house assigned</span>
                ) : (
                  `Head: ${house.headOfHouse}`
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="text-2xl font-bold text-gray-800">{house.students}</span>
                    <span className="text-gray-600">Students</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-gray-500" />
                    <span className="text-2xl font-bold text-gray-800">{house.points}</span>
                    <span className="text-gray-600">Points</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedHouse(house)
                      setIsDetailsOpen(true)
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setSelectedHouse(house)
                  setIsAddStudentOpen(true)
                }}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Students
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedHouse?.name} House</DialogTitle>
            <DialogDescription>View and manage students in this house</DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Head of House</h3>
                <p className="text-gray-700">{selectedHouse?.headOfHouse}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Total Students</h3>
                <p className="text-3xl font-bold text-gray-800">{selectedHouse?.students}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">House Points</h3>
                <p className="text-3xl font-bold text-gray-800">{selectedHouse?.points}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Students</h3>
                <Button variant="outline" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </div>
              <Input
                placeholder="Search students..."
                className="mb-4"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {/* Placeholder for student list */}
                  <div className="text-gray-500 text-center py-8">Student list will be displayed here</div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Add Students to {selectedHouse?.name} House</SheetTitle>
            <SheetDescription>Select students to add to this house.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {/* Placeholder for student selection list */}
                <div className="text-gray-500 text-center py-8">Student selection list will be displayed here</div>
              </div>
            </ScrollArea>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddStudentOpen(false)}>
              Cancel
            </Button>
            <Button>Add Selected Students</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

