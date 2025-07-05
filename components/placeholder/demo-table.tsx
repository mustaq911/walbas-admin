import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Column<T> {
    header: string
    accessor: keyof T
    render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface DataTableProps<T extends Record<string, unknown>> {
    data: T[]
    columns: Column<T>[]
}

export default function DemoTable<T extends Record<string, unknown>>({ data, columns }: DataTableProps<T>) {
    return (
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                {columns.map((column, colIndex) => (
                    <TableHead key={colIndex}>{column.header}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                    {columns.map((column) => (
                        <TableCell key={`${rowIndex}-${column.accessor as string}`}>
                             {column.render ? column.render(row[column.accessor], row) : (row[column.accessor] as React.ReactNode)}
                        </TableCell>
                    ))}
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    )
}

