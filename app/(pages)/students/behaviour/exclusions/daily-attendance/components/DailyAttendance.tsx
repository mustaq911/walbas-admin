"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, Download, HelpCircle, Settings2, SortAsc } from "lucide-react"
import { useState } from "react"
import CreateExclusionDialog from "./CreateExclusion"


interface Column {
    id: string
    label: string
    visible: boolean
}

export default function ExclusionTable() {
    const [columns, setColumns] = useState<Column[]>([
        { id: "time", label: "Time", visible: true },
        { id: "lesson", label: "Lesson/Event", visible: true },
        { id: "teacher", label: "Teacher", visible: true },
        { id: "marks", label: "Marks", visible: true },
        { id: "room", label: "Room", visible: true },
        { id: "capacity", label: "Capacity", visible: true },
    ])

    const toggleColumn = (columnId: string) => {
        setColumns(columns.map((col) => (col.id === columnId ? { ...col, visible: !col.visible } : col)))
    }

    return (
        <div className="px-6">
            <div className="mb-6">
                <div className="flex justify-end items-center">

                    <CreateExclusionDialog />
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
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

                <div className="flex items-center gap-2">
                    <Input type="search" placeholder="Search this table" className="w-80" />
                    <Button size="icon" variant="outline">
                        <Download className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                        <Settings2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                        <HelpCircle className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns
                                .filter((col) => col.visible)
                                .map((column) => (
                                    <TableHead key={column.id} className="whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {column.label}
                                            <SortAsc className="h-4 w-4" />
                                        </div>
                                    </TableHead>
                                ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                colSpan={columns.filter((col) => col.visible).length}
                                className="text-center h-32 text-muted-foreground"
                            >
                                No items to show
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="text-sm text-muted-foreground mt-2">Showing 0 results</div>
        </div>
    )
}

