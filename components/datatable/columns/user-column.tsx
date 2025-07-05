"use client"

import { ColumnDef } from "@tanstack/react-table"

import {   FolderOpen } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User } from "@/types/user"

export const UserColumn: ColumnDef<User>[] = [
  
    {
        accessorKey: "id_number",
        header: "ID Number",
        cell: ({ row }) => {
            const data = row.original
            return (
                <Link href="/users">
                    <Button variant="link" className="hover:text-primary font-bold" size="sm">
                        <FolderOpen/> {data.serial_number}
                    </Button>
                </Link>
            )
        },
    },
   
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const data = row.original
            return (
                <>
                    { 
                        data.is_active ? <Badge variant="outline">Active</Badge> : <Badge variant="destructive">Inactive</Badge>
                    }
                </>
            )
        },
    },
]