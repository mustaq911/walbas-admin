"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, Search } from "lucide-react"

export default function ManageAssessments() {
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const itemsPerPage = 10

    const filteredAssessments = assessments.filter(
        (assessment) =>
            assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assessment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assessment.keyStage.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const sortedAssessments = [...filteredAssessments].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
        return 0
    })

    const paginatedAssessments = sortedAssessments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const totalPages = Math.ceil(sortedAssessments.length / itemsPerPage)

    const handleSort = (column: string) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-end items-center mb-6">
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Assessment
                </Button>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="relative w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search assessments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
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

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                                Name {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("subject")} className="cursor-pointer">
                                Subject {sortColumn === "subject" && (sortDirection === "asc" ? "▲" : "▼")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("keyStage")} className="cursor-pointer">
                                Key Stage {sortColumn === "keyStage" && (sortDirection === "asc" ? "▲" : "▼")}
                            </TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedAssessments.map((assessment, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{assessment.name}</TableCell>
                                <TableCell>{assessment.subject}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{assessment.keyStage}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge>Summative</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, sortedAssessments.length)} of {sortedAssessments.length} entries
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

const assessments = [
    { name: "Mathematics", subject: "Mathematics", keyStage: "KS3" },
    { name: "Art and Design", subject: "MAT-LIVE Art", keyStage: "KS3" },
    { name: "Art and Design", subject: "MAT-LIVE Art", keyStage: "KS4" },
    { name: "Biology", subject: "MAT-LIVE Science", keyStage: "KS4" },
    { name: "Business Studies", subject: "MAT-LIVE Business", keyStage: "KS4" },
    { name: "Chemistry", subject: "MAT-LIVE Science", keyStage: "KS4" },
    { name: "Child Development", subject: "MAT-LIVE Social Studies", keyStage: "KS4" },
    { name: "Computer Science", subject: "MAT-LIVE Computing", keyStage: "KS3" },
    { name: "Computer Science", subject: "MAT-LIVE Computing", keyStage: "KS4" },
    { name: "Design & Technology", subject: "MAT-LIVE Design", keyStage: "KS3" },
    { name: "Drama", subject: "MAT-LIVE Arts", keyStage: "KS3" },
    { name: "Drama", subject: "MAT-LIVE Arts", keyStage: "KS4" },
    { name: "English", subject: "MAT-LIVE English", keyStage: "KS3" },
    { name: "English Literature", subject: "MAT-LIVE English", keyStage: "KS4" },
    { name: "Geography", subject: "MAT-LIVE Humanities", keyStage: "KS3" },
    { name: "History", subject: "MAT-LIVE Humanities", keyStage: "KS3" },
    { name: "Physics", subject: "MAT-LIVE Science", keyStage: "KS4" },
    { name: "Spanish", subject: "MAT-LIVE Languages", keyStage: "KS3" },
    { name: "French", subject: "MAT-LIVE Languages", keyStage: "KS4" },
    { name: "Music", subject: "MAT-LIVE Arts", keyStage: "KS3" },
]

