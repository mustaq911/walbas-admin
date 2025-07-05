"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Search } from "lucide-react"
import { CreateTalent } from "./components/TalentForm"

interface Talent {
  id: string
  name: string
  managedBy: string
  isActive: boolean
}

export default function TalentList() {
  const [search, setSearch] = useState("")
  const [talents, setTalents] = useState<Talent[]>([
    { id: "1", name: "Art", managedBy: "Innovatix", isActive: true },
    { id: "2", name: "Athletics", managedBy: "Innovatix", isActive: false },
    { id: "3", name: "Basketball", managedBy: "Innovatix", isActive: true },
    { id: "4", name: "Boxing", managedBy: "Innovatix", isActive: true },
    { id: "5", name: "Catching", managedBy: "Innovatix", isActive: false },
    { id: "6", name: "Chess", managedBy: "Innovatix", isActive: true },
    { id: "7", name: "Cricket", managedBy: "Innovatix", isActive: true },
    { id: "8", name: "Dance", managedBy: "Innovatix", isActive: false },
    { id: "9", name: "Design & Technology", managedBy: "Innovatix", isActive: true },
    { id: "10", name: "Golf", managedBy: "Innovatix", isActive: true },
  ])

  const filteredTalents = talents.filter((talent) => talent.name.toLowerCase().includes(search.toLowerCase()))

  const addTalent = (name: string) => {
    const newTalent: Talent = {
      id: (talents.length + 1).toString(),
      name,
      managedBy: "User",
      isActive: true,
    }
    setTalents([...talents, newTalent])
  }

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Talents</h1>
        <CreateTalent onSubmit={addTalent} />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search talents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Talent</TableHead>
              <TableHead className="font-semibold">Managed By</TableHead>
              <TableHead className="text-right font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTalents.map((talent) => (
              <TableRow key={talent.id} className="group hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex items-center justify-between">
                    <span>{talent.name}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{talent.managedBy}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={talent.isActive ? "default" : "destructive"}
                    className={`${talent.isActive ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}`}
                  >
                    {talent.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredTalents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No talents found</p>
        </div>
      )}
    </div>
  )
}

