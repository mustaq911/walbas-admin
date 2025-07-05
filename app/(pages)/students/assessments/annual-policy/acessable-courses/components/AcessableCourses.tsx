"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Camera, HelpCircle, Maximize2, Settings2 } from "lucide-react"

export default function AssessableCourses() {
    const [searchTerm, setSearchTerm] = useState("")


    const filteredCourses = courses.filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase()))


    return (
        <div className="container mx-auto py-4">


            <div className="flex justify-between items-center mb-4 gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Academic Year</span>
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
                </div>

                <div className="flex items-center gap-2 flex-1 justify-end">
                    <div className="relative max-w-sm flex-1">
                        <Input
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <Button variant="ghost" size="icon" title="Take Screenshot">
                        <Camera className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Settings">
                        <Settings2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Help">
                        <HelpCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Expand">
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[300px]">Name</TableHead>
                            <TableHead>Course Code</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCourses.map((course, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{course.name}</TableCell>
                                <TableCell>{course.code}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                <div>Showing {filteredCourses.length} results</div>

            </div>
        </div>
    )
}

const courses = [
    { name: "Applied Art and Design", code: "KS4" },
    { name: "Applied Art and Design", code: "KS5" },
    { name: "Art and Design / Art", code: "" },
    { name: "Biology / Botany / Zoology / Ecology", code: "" },
    { name: "Chemistry", code: "" },
    { name: "Computer Science", code: "" },
    { name: "Design and Technology", code: "" },
    { name: "Design and Technology - Textiles", code: "" },
    { name: "English", code: "" },
    { name: "Entry Sheet Exams 2025", code: "" },
    { name: "Entry Sheet for Exams HOD", code: "" },
    { name: "Entry sheet HOD", code: "" },
    { name: "Exam entry sheet HOD 2025", code: "" },
]

