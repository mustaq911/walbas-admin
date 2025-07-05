"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronLeft, ChevronRight, HelpCircle, Settings2 } from "lucide-react"
import { useState } from "react"

interface Column {
    id: string
    label: string
    visible: boolean
}

const mockData = [
    {
        id: 1,
        student: { name: "Hall Danielle", link: true },
        regForm: "Form 9HU",
        severity: { level: "Level 1 Negative", color: "yellow" },
        behaviour: "R3 classroom removal",
        reporter: { name: "Brown Nathan", firstName: "Nathan" },
        date: "27 Feb 2025",
        status: "Not Resolved",
    },
    {
        id: 2,
        student: { name: "Turner Brandon", link: true },
        regForm: "Form 9LQ",
        severity: { level: "Level 1 Negative", color: "yellow" },
        behaviour: "R3 classroom removal",
        reporter: { name: "Brown Nathan", firstName: "Nathan" },
        date: "27 Feb 2025",
        status: "Not Resolved",
    },
    {
        id: 3,
        student: { name: "Turner Brandon", link: true },
        regForm: "Form 9LQ",
        severity: { level: "Level 4 Negative", color: "red" },
        behaviour: "Refusal",
        reporter: { name: "Brown Nathan", firstName: "Nathan" },
        date: "26 Feb 2025",
        status: "Not Resolved",
    },

]

export default function OverviewPage() {
    const [columns, setColumns] = useState<Column[]>([
        { id: "student", label: "Student", visible: true },
        { id: "regForm", label: "Reg. Form", visible: true },
        { id: "severity", label: "Severity", visible: true },
        { id: "behaviour", label: "Behaviour", visible: true },
        { id: "reporter", label: "Reporter", visible: true },
        { id: "date", label: "Incident date/time", visible: true },
        { id: "status", label: "Status", visible: true },
    ])

    const toggleColumn = (columnId: string) => {
        setColumns(columns.map((col) => (col.id === columnId ? { ...col, visible: !col.visible } : col)))
    }

    return (
        <div className="px-6">


            <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="pending">Pending internal exclusions</TabsTrigger>
                    <TabsTrigger value="all">Internal Exclusions</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="gap-2">
                                Bulk action <ChevronDown className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="gap-2">
                                        Hide columns <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {columns.map((column) => (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            checked={column.visible}
                                            onCheckedChange={() => toggleColumn(column.id)}
                                        >
                                            {column.label}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-2">
                            <Input type="search" placeholder="Search this table" className="w-80" />
                            <Button variant="outline" className="gap-2">
                                Download <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline">
                                <Settings2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline">
                                <HelpCircle className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell className="w-12">
                                        <Checkbox />
                                    </TableCell>
                                    {columns
                                        .filter((col) => col.visible)
                                        .map((column) => (
                                            <TableHead key={column.id}>
                                                <div className="flex items-center gap-2">
                                                    {column.label}
                                                    <ChevronDown className="h-4 w-4" />
                                                </div>
                                            </TableHead>
                                        ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>
                                            {row.student.link ? (
                                                <a href="#" className="text-blue-600 hover:underline">
                                                    {row.student.name}
                                                </a>
                                            ) : (
                                                row.student.name
                                            )}
                                        </TableCell>
                                        <TableCell>{row.regForm}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded ${row.severity.color === "yellow" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"
                                                    }`}
                                            >
                                                {row.severity.level}
                                            </span>
                                        </TableCell>
                                        <TableCell>{row.behaviour}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium">{row.reporter.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>
                                            <span className="text-orange-500">{row.status}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Showing 55 of 173 results</div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                1
                            </Button>
                            <Button variant="outline" size="sm">
                                2
                            </Button>
                            <Button variant="outline" size="sm">
                                3
                            </Button>
                            <Button variant="outline" size="sm">
                                4
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="all"></TabsContent>
            </Tabs>
        </div>
    )
}

