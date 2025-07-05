"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Phone, Mail, Star, Shield, UserCheck, ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Guardian {
    id: string
    name: string
    relationship: string
    isLegal: boolean
    isPrimary: boolean
    canCollect: boolean
    email: string
    phone: string
    emergencyPriority: string
    notes?: string
}

interface Student {
    id: string
    name: string
    year: string
    form: string
    guardians: Guardian[]
}

const initialStudents: Student[] = [
    {
        id: "1",
        name: "Emma Allen",
        year: "Year 8",
        form: "8FV",
        guardians: [
            {
                id: "g1",
                name: "Emma Deakin",
                relationship: "Mother",
                isLegal: true,
                isPrimary: true,
                canCollect: true,
                email: "emma.deakin@example.com",
                phone: "+44 7700 900123",
                emergencyPriority: "1st priority",
            },
            {
                id: "g2",
                name: "John Allen",
                relationship: "Father",
                isLegal: true,
                isPrimary: false,
                canCollect: true,
                email: "john.allen@example.com",
                phone: "+44 7700 900124",
                emergencyPriority: "2nd priority",
            },
            {
                id: "gd2",
                name: "Johndasdas Allen",
                relationship: "Faasdther",
                isLegal: true,
                isPrimary: false,
                canCollect: true,
                email: "john.allen@example.com",
                phone: "+44 7700 900124",
                emergencyPriority: "2nd priority",
            },

        ],
    },
    {
        id: "2",
        name: "Daniel Brooks",
        year: "Year 8",
        form: "8BT",
        guardians: [
            {
                id: "g3",
                name: "Sarah Brooks",
                relationship: "Aunt",
                isLegal: true,
                isPrimary: true,
                canCollect: true,
                email: "sarah.brooks@example.com",
                phone: "+44 7700 900456",
                emergencyPriority: "1st priority",
            },
        ],
    },
]

export default function StudentGuardiansList() {
    const [students, setStudents] = useState<Student[]>(initialStudents)
    const [editingGuardian, setEditingGuardian] = useState<Guardian | null>(null)
    const [sortColumn, setSortColumn] = useState<string>("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const handleSort = (column: string) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    const sortedStudents = [...students].sort((a, b) => {
        if (a[sortColumn as keyof Student] < b[sortColumn as keyof Student]) return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn as keyof Student] > b[sortColumn as keyof Student]) return sortDirection === "asc" ? 1 : -1
        return 0
    })

    const addGuardian = (studentId: string, newGuardian: Guardian) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === studentId ? { ...student, guardians: [...student.guardians, newGuardian] } : student,
            ),
        )
    }

    const updateGuardian = (studentId: string, updatedGuardian: Guardian) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === studentId
                    ? {
                        ...student,
                        guardians: student.guardians.map((g) => (g.id === updatedGuardian.id ? updatedGuardian : g)),
                    }
                    : student,
            ),
        )
        setEditingGuardian(null)
    }

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Students and Guardians</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort("name")}>
                                    Student Name
                                    {sortColumn === "name" &&
                                        (sortDirection === "asc" ? (
                                            <ChevronUp className="inline ml-2" />
                                        ) : (
                                            <ChevronDown className="inline ml-2" />
                                        ))}
                                </TableHead>
                                <TableHead className="w-[150px] cursor-pointer" onClick={() => handleSort("year")}>
                                    Year & Form
                                    {sortColumn === "year" &&
                                        (sortDirection === "asc" ? (
                                            <ChevronUp className="inline ml-2" />
                                        ) : (
                                            <ChevronDown className="inline ml-2" />
                                        ))}
                                </TableHead>
                                <TableHead className="w-[250px]">Guardians</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedStudents.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>
                                        {student.year} - {student.form}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-2">
                                            {student.guardians.map((guardian) => (
                                                <Badge key={guardian.id} variant="secondary">
                                                    {guardian.name}
                                                    {guardian.isPrimary && <Star className="h-3 w-3 ml-1 inline" />}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <Sheet>
                                                    <SheetTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View Details</DropdownMenuItem>
                                                    </SheetTrigger>
                                                    <SheetContent side="right" className="sm:max-w-2xl w-[90vw]">
                                                        <SheetHeader>
                                                            <SheetTitle>{student.name}</SheetTitle>
                                                        </SheetHeader>

                                                        <div className="mt-6">
                                                            <h3 className="text-lg font-semibold mb-2">Guardians</h3>
                                                            <ScrollArea className="h-[600px] pr-4">
                                                                {student.guardians.map((guardian) => (
                                                                    <Card key={guardian.id} className="mb-4">
                                                                        <CardHeader className="pb-2">
                                                                            <div className="flex items-center justify-between">
                                                                                <CardTitle className="text-lg">{guardian.name}</CardTitle>
                                                                                <Button variant="ghost" size="sm" onClick={() => setEditingGuardian(guardian)}>
                                                                                    Edit
                                                                                </Button>
                                                                            </div>
                                                                            <p className="text-sm text-muted-foreground">{guardian.relationship}</p>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                            {editingGuardian?.id === guardian.id ? (
                                                                                <form
                                                                                    onSubmit={(e) => {
                                                                                        e.preventDefault()
                                                                                        const formData = new FormData(e.currentTarget)
                                                                                        const updatedGuardian: Guardian = {
                                                                                            ...guardian,
                                                                                            relationship: formData.get("relationship") as string,
                                                                                            isLegal: formData.get("isLegal") === "on",
                                                                                            isPrimary: formData.get("isPrimary") === "on",
                                                                                            canCollect: formData.get("canCollect") === "on",
                                                                                            email: formData.get("email") as string,
                                                                                            phone: formData.get("phone") as string,
                                                                                            emergencyPriority: formData.get("emergencyPriority") as string,
                                                                                            notes: formData.get("notes") as string,
                                                                                        }
                                                                                        updateGuardian(student.id, updatedGuardian)
                                                                                    }}
                                                                                >
                                                                                    <div className="space-y-4">
                                                                                        <div className="space-y-2">
                                                                                            <Label>Relationship Type</Label>
                                                                                            <Select name="relationship" defaultValue={guardian.relationship}>
                                                                                                <SelectTrigger>
                                                                                                    <SelectValue />
                                                                                                </SelectTrigger>
                                                                                                <SelectContent>
                                                                                                    <SelectItem value="Mother">Mother (natural or adoptive)</SelectItem>
                                                                                                    <SelectItem value="Father">Father (natural or adoptive)</SelectItem>
                                                                                                    <SelectItem value="Aunt">Aunt</SelectItem>
                                                                                                    <SelectItem value="Uncle">Uncle</SelectItem>
                                                                                                    <SelectItem value="Grandparent">Grandparent</SelectItem>
                                                                                                </SelectContent>
                                                                                            </Select>
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            <Label>Options</Label>
                                                                                            <div className="space-y-2">
                                                                                                <div className="flex items-center space-x-2">
                                                                                                    <Checkbox
                                                                                                        id="isLegal"
                                                                                                        name="isLegal"
                                                                                                        defaultChecked={guardian.isLegal}
                                                                                                    />
                                                                                                    <label htmlFor="isLegal">Legal guardian</label>
                                                                                                </div>
                                                                                                <div className="flex items-center space-x-2">
                                                                                                    <Checkbox
                                                                                                        id="isPrimary"
                                                                                                        name="isPrimary"
                                                                                                        defaultChecked={guardian.isPrimary}
                                                                                                    />
                                                                                                    <label htmlFor="isPrimary">Primary guardian</label>
                                                                                                </div>
                                                                                                <div className="flex items-center space-x-2">
                                                                                                    <Checkbox
                                                                                                        id="canCollect"
                                                                                                        name="canCollect"
                                                                                                        defaultChecked={guardian.canCollect}
                                                                                                    />
                                                                                                    <label htmlFor="canCollect">Authorised to collect</label>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            <Label>Email</Label>
                                                                                            <Input name="email" defaultValue={guardian.email} />
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            <Label>Phone</Label>
                                                                                            <Input name="phone" defaultValue={guardian.phone} />
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            <Label>Emergency Contact Priority</Label>
                                                                                            <Select
                                                                                                name="emergencyPriority"
                                                                                                defaultValue={guardian.emergencyPriority}
                                                                                            >
                                                                                                <SelectTrigger>
                                                                                                    <SelectValue />
                                                                                                </SelectTrigger>
                                                                                                <SelectContent>
                                                                                                    <SelectItem value="1st priority">
                                                                                                        1st priority emergency contact
                                                                                                    </SelectItem>
                                                                                                    <SelectItem value="2nd priority">
                                                                                                        2nd priority emergency contact
                                                                                                    </SelectItem>
                                                                                                    <SelectItem value="3rd priority">
                                                                                                        3rd priority emergency contact
                                                                                                    </SelectItem>
                                                                                                </SelectContent>
                                                                                            </Select>
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            <Label>Notes</Label>
                                                                                            <Textarea name="notes" defaultValue={guardian.notes} />
                                                                                        </div>
                                                                                        <div className="flex justify-end space-x-2">
                                                                                            <Button
                                                                                                type="button"
                                                                                                variant="outline"
                                                                                                onClick={() => setEditingGuardian(null)}
                                                                                            >
                                                                                                Cancel
                                                                                            </Button>
                                                                                            <Button type="submit">Save Changes</Button>
                                                                                        </div>
                                                                                    </div>
                                                                                </form>
                                                                            ) : (
                                                                                <div className="space-y-2">
                                                                                    <div className="flex flex-wrap gap-2">
                                                                                        {guardian.isLegal && (
                                                                                            <Badge variant="secondary" className="flex items-center gap-1">
                                                                                                <Shield className="h-3 w-3" />
                                                                                                Legal Guardian
                                                                                            </Badge>
                                                                                        )}
                                                                                        {guardian.isPrimary && (
                                                                                            <Badge variant="secondary" className="flex items-center gap-1">
                                                                                                <Star className="h-3 w-3" />
                                                                                                Primary
                                                                                            </Badge>
                                                                                        )}
                                                                                        {guardian.canCollect && (
                                                                                            <Badge variant="secondary" className="flex items-center gap-1">
                                                                                                <UserCheck className="h-3 w-3" />
                                                                                                Can Collect
                                                                                            </Badge>
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="space-y-1">
                                                                                        <div className="flex items-center gap-2 text-sm">
                                                                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                                                                            <span>{guardian.email}</span>
                                                                                        </div>
                                                                                        <div className="flex items-center gap-2 text-sm">
                                                                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                                                                            <span>{guardian.phone}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="text-sm">
                                                                                        <span className="text-muted-foreground">Emergency Contact:</span>
                                                                                        <span className="ml-2 font-medium">{guardian.emergencyPriority}</span>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </CardContent>
                                                                    </Card>
                                                                ))}
                                                            </ScrollArea>
                                                        </div>
                                                    </SheetContent>
                                                </Sheet>
                                                <Sheet>
                                                    <SheetTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Add Guardian</DropdownMenuItem>
                                                    </SheetTrigger>
                                                    <SheetContent side="right">
                                                        <SheetHeader>
                                                            <SheetTitle>Add New Guardian for {student.name}</SheetTitle>
                                                        </SheetHeader>
                                                        <form
                                                            onSubmit={(e) => {
                                                                e.preventDefault()
                                                                const formData = new FormData(e.currentTarget)
                                                                const newGuardian: Guardian = {
                                                                    id: `g${Date.now()}`,
                                                                    name: formData.get("name") as string,
                                                                    relationship: formData.get("relationship") as string,
                                                                    isLegal: formData.get("isLegal") === "on",
                                                                    isPrimary: formData.get("isPrimary") === "on",
                                                                    canCollect: formData.get("canCollect") === "on",
                                                                    email: formData.get("email") as string,
                                                                    phone: formData.get("phone") as string,
                                                                    emergencyPriority: formData.get("emergencyPriority") as string,
                                                                    notes: formData.get("notes") as string,
                                                                }
                                                                addGuardian(student.id, newGuardian)
                                                            }}
                                                        >
                                                            <div className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="name" className="text-right">
                                                                        Name
                                                                    </Label>
                                                                    <Input id="name" name="name" className="col-span-3" required />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="relationship" className="text-right">
                                                                        Relationship
                                                                    </Label>
                                                                    <Select name="relationship" required>
                                                                        <SelectTrigger className="col-span-3">
                                                                            <SelectValue placeholder="Select relationship" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Mother">Mother</SelectItem>
                                                                            <SelectItem value="Father">Father</SelectItem>
                                                                            <SelectItem value="Grandparent">Grandparent</SelectItem>
                                                                            <SelectItem value="Aunt">Aunt</SelectItem>
                                                                            <SelectItem value="Uncle">Uncle</SelectItem>
                                                                            <SelectItem value="Other">Other</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="email" className="text-right">
                                                                        Email
                                                                    </Label>
                                                                    <Input id="email" name="email" type="email" className="col-span-3" required />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="phone" className="text-right">
                                                                        Phone
                                                                    </Label>
                                                                    <Input id="phone" name="phone" type="tel" className="col-span-3" required />
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label className="text-right">Options</Label>
                                                                    <div className="col-span-3 space-y-2">
                                                                        <div className="flex items-center space-x-2">
                                                                            <Checkbox id="isLegal" name="isLegal" />
                                                                            <label htmlFor="isLegal">Legal guardian</label>
                                                                        </div>
                                                                        <div className="flex items-center space-x-2">
                                                                            <Checkbox id="isPrimary" name="isPrimary" />
                                                                            <label htmlFor="isPrimary">Primary guardian</label>
                                                                        </div>
                                                                        <div className="flex items-center space-x-2">
                                                                            <Checkbox id="canCollect" name="canCollect" />
                                                                            <label htmlFor="canCollect">Authorised to collect</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="emergencyPriority" className="text-right">
                                                                        Emergency Priority
                                                                    </Label>
                                                                    <Select name="emergencyPriority" required>
                                                                        <SelectTrigger className="col-span-3">
                                                                            <SelectValue placeholder="Select priority" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="1st priority">1st priority</SelectItem>
                                                                            <SelectItem value="2nd priority">2nd priority</SelectItem>
                                                                            <SelectItem value="3rd priority">3rd priority</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="notes" className="text-right">
                                                                        Notes
                                                                    </Label>
                                                                    <Textarea id="notes" name="notes" className="col-span-3" />
                                                                </div>
                                                            </div>
                                                            <SheetClose asChild>
                                                                <Button type="submit">Add Guardian</Button>
                                                            </SheetClose>
                                                        </form>
                                                    </SheetContent>
                                                </Sheet>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

