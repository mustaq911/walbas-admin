"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Plus, ChevronDown, Search } from "lucide-react"

export default function Catalogue() {
    const [searchQuery, setSearchQuery] = useState("")

    const assessments = [
        { id: 1, name: "DfE NC Y1 Eng", subject: "English", keyStage: "Key Stage 1", type: "Curriculum" },
        { id: 2, name: "DfE NC KS3 Geo", subject: "Geography", keyStage: "Key Stage 3", type: "Curriculum" },
        { id: 3, name: "DfE NC KS3 Computing", subject: "Computer Science", keyStage: "Key Stage 3", type: "Curriculum" },
        { id: 4, name: "DfE NC KS3 Citizenship", subject: "Citizenship", keyStage: "Key Stage 3", type: "Curriculum" },
        { id: 5, name: "English Assessment KS3", subject: "English", keyStage: "Key Stage 3", type: "Summative" },
        { id: 6, name: "JL Maths KS4", subject: "Mathematics", keyStage: "Key Stage 4", type: "Curriculum" },
        { id: 7, name: "KS4 Maths Mocks", subject: "Mathematics", keyStage: "Key Stage 4", type: "Summative" },
        { id: 8, name: "English Roth", subject: "English", keyStage: "Key Stage 4", type: "Summative" },
        { id: 9, name: "avg marks", subject: "Computer Science", keyStage: "Key Stage 4", type: "Summative" },
        { id: 10, name: "KS5 Turkish Mock Grade", subject: "Turkish", keyStage: "Key Stage 5", type: "Summative" },
        { id: 11, name: "ATL Example", subject: "Mixed", keyStage: "Mixed", type: "Ad-Hoc" },
    ]

    const filteredAssessments = assessments.filter(
        (assessment) =>
            assessment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assessment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assessment.keyStage.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assessment.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Curriculum":
                return "bg-blue-100 text-blue-800"
            case "Summative":
                return "bg-green-100 text-green-800"
            case "Ad-Hoc":
                return "bg-purple-100 text-purple-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Columns
                        <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" /> Create new assessment
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search assessments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-[250px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Download CSV</DropdownMenuItem>
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>

            <div className="rounded-lg border shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold text-gray-600">Assessment</TableHead>
                            <TableHead className="font-semibold text-gray-600">Subject</TableHead>
                            <TableHead className="font-semibold text-gray-600">Key Stage</TableHead>
                            <TableHead className="font-semibold text-gray-600">Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAssessments.map((assessment, index) => (
                            <TableRow key={assessment.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <TableCell className="font-medium">
                                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                        {assessment.name}
                                    </a>
                                </TableCell>
                                <TableCell>{assessment.subject}</TableCell>
                                <TableCell>{assessment.keyStage}</TableCell>
                                <TableCell>
                                    <Badge className={`${getTypeColor(assessment.type)}`}>{assessment.type}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

