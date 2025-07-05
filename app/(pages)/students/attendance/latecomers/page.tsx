"use client"

import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, Settings2 } from "lucide-react"


type Student = {
    id: string
    name: string
    year: string
    form: string
    date: string
    mark: string
    minsLate: number
    lesson: string
    note: string
}

const data: Student[] = [
    {
        id: "1",
        name: "Brown Rachel",
        year: "Year 9",
        form: "9EF",
        date: "Mon, 24 Feb 2025, 08:30",
        mark: "Late (L)",
        minsLate: 7,
        lesson: "Registration",
        note: "Year 9 Assembly",
    },
    {
        id: "2",
        name: "Callum Smith",
        year: "Year 8",
        form: "7FO",
        date: "Mon, 24 Feb 2025, 08:35",
        mark: "Late (L)",
        minsLate: 15,
        lesson: "Registration",
        note: "Year 8 Assembly",
    },
    {
        id: "3",
        name: "Campbell Lewis",
        year: "Year 9",
        form: "9PA",
        date: "Mon, 24 Feb 2025, 08:45",
        mark: "Late (L)",
        minsLate: 15,
        lesson: "Registration",
        note: "Bus Delay",
    },
    {
        id: "4",
        name: "Carter Yvonne",
        year: "Year 11",
        form: "11XQ",
        date: "Mon, 24 Feb 2025, 08:38",
        mark: "Late (L)",
        minsLate: 8,
        lesson: "Registration",
        note: "Medical Appointment",
    },
    {
        id: "5",
        name: "Clark Stephen",
        year: "Year 12",
        form: "12DG",
        date: "Mon, 24 Feb 2025, 08:47",
        mark: "Late (L)",
        minsLate: 17,
        lesson: "Registration",
        note: "Traffic Delay",
    },
    {
        id: "6",
        name: "Cox David",
        year: "Year 13",
        form: "13NJ",
        date: "Mon, 24 Feb 2025, 08:35",
        mark: "Late (L)",
        minsLate: 5,
        lesson: "Registration",
        note: "Public Transport Delay",
    },
    {
        id: "7",
        name: "Evans George",
        year: "Year 13",
        form: "13SG",
        date: "Mon, 24 Feb 2025, 08:46",
        mark: "Late (L)",
        minsLate: 16,
        lesson: "Registration",
        note: "Overslept",
    },
    {
        id: "8",
        name: "Evans Zoe",
        year: "Year 13",
        form: "13MS",
        date: "Mon, 24 Feb 2025, 08:37",
        mark: "Late (L)",
        minsLate: 7,
        lesson: "Registration",
        note: "Family Emergency",
    },
    {
        id: "9",
        name: "Foster Oliver",
        year: "Year 8",
        form: "8BT",
        date: "Mon, 24 Feb 2025, 08:38",
        mark: "Late (L)",
        minsLate: 8,
        lesson: "Registration",
        note: "Weather Conditions",
    },
    {
        id: "10",
        name: "Fox Stephen",
        year: "Year 10",
        form: "10WJ",
        date: "Mon, 24 Feb 2025, 08:46",
        mark: "Late (L)",
        minsLate: 16,
        lesson: "Registration",
        note: "Car Breakdown",
    },
    {
        id: "11",
        name: "Graham Jackson",
        year: "Year 9",
        form: "9OL",
        date: "Mon, 24 Feb 2025, 08:47",
        mark: "Late (L)",
        minsLate: 17,
        lesson: "Registration",
        note: "Dentist Appointment",
    },
    {
        id: "12",
        name: "Harris Nick",
        year: "Year 8",
        form: "7NP",
        date: "Mon, 24 Feb 2025, 08:43",
        mark: "Late (L)",
        minsLate: 13,
        lesson: "Registration",
        note: "Road Works Delay",
    },
]

export const columns: ColumnDef<Student>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Student",
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "year",
        header: "Year",
    },
    {
        accessorKey: "form",
        header: "Form",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "mark",
        header: "Mark",
        cell: ({ row }) => <Badge variant="secondary">{row.getValue("mark")}</Badge>,
    },
    {
        accessorKey: "minsLate",
        header: "Mins Late",
        cell: ({ row }) => <Badge variant="destructive">{row.getValue("minsLate")}</Badge>,
    },
    {
        accessorKey: "lesson",
        header: "Lesson",
    },
    {
        accessorKey: "note",
        header: "Note",
    },
]

export default function LatecomerTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})


    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Latecomers</CardTitle>
                            <CardDescription>Manage and track student late arrivals</CardDescription>
                        </div>

                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 py-4">
                        <Input
                            placeholder="Filter students..."
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                            className="max-w-sm"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    <Filter className="mr-2 h-4 w-4" />
                                    View
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button variant="outline">
                            <Settings2 className="mr-2 h-4 w-4" />
                            Bulk Actions
                        </Button>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-muted-foreground text-sm">
                            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                            selected.
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

