import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'

export default function CreateStudentForm() {
    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        year: "",
        section: "",
        grade: "",
        status: "Active",
    })
    return (
        <>
            <form>
                <ScrollArea className='h-[450px]'>

                    <div className="grid gap-4 py-4 px-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newStudent.name}
                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="email" className="text-left">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={newStudent.email}
                                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="year" className="text-left">
                                Year
                            </Label>
                            <Select
                                value={newStudent.year}
                                onValueChange={(value) => setNewStudent({ ...newStudent, year: value })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Freshman">Freshman</SelectItem>
                                    <SelectItem value="Sophomore">Sophomore</SelectItem>
                                    <SelectItem value="Junior">Junior</SelectItem>
                                    <SelectItem value="Senior">Senior</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="section" className="text-left">
                                Section
                            </Label>
                            <Select
                                value={newStudent.section}
                                onValueChange={(value) => setNewStudent({ ...newStudent, section: value })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select section" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A">Section A</SelectItem>
                                    <SelectItem value="B">Section B</SelectItem>
                                    <SelectItem value="C">Section C</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="grade" className="text-left">
                                Grade
                            </Label>
                            <Input
                                id="grade"
                                type="number"
                                min="9"
                                max="12"
                                value={newStudent.grade}
                                onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                </ScrollArea>

                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </>
    )
}
