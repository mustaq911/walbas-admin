import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useStudent from '@/hooks/students/use-student'
import { Student } from '@/types/student'
import { ChevronLeft, ChevronRight, MoreHorizontal, UserX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type StudentsProps = {
    searchStudent: string,
    students: Student[]
}

export default function StudenList({ searchStudent, students }: StudentsProps) {

    const { setOpenModal } = useStudent()
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(12)
    const filteredStudents = students.filter(
        (student) =>
            student.name.toLowerCase().includes(searchStudent.toLowerCase())
    )

    const displayedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    const pageCount = Math.ceil(filteredStudents.length / itemsPerPage)
    return (
        <>
            {filteredStudents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedStudents.map((student) => (
                        <Card key={student.id} className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            {student.avatar ? (
                                                <Image
                                                    src={student.avatar}
                                                    alt={`${student.name}'s avatar`}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-full"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <span className="text-gray-600 text-sm font-medium">
                                                        {student.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                            <span
                                                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${student.status === "Active" ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold truncate">{student.name}</h2>
                                            <p className="text-xs text-gray-500 truncate">{student.email}</p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <Link href={`/students/masterlist/${student.id}`}>
                                                <DropdownMenuItem>View details</DropdownMenuItem>
                                            </Link>

                                            <DropdownMenuItem onClick={() => setOpenModal(true)}>Edit student</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">Delete student</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="grid grid-cols-2 gap-y-1 text-sm">
                                    <div>
                                        Year: <span className="font-medium text-muted-foreground">{student.year}</span>
                                    </div>
                                    <div>
                                        Section: <span className="font-medium text-muted-foreground">{student.section}</span>
                                    </div>
                                    <div>
                                        Age: <span className="font-medium text-muted-foreground">{student.age}</span>
                                    </div>
                                    <div>
                                        Grade: <span className="font-medium text-muted-foreground">{student.grade}th</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <UserX className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No students found</h3>
                    <div className="mt-6">
                        <Button>Clear filters</Button>
                    </div>
                </div>
            )}

            {filteredStudents.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-600">Items per page:</p>
                        <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                            <SelectTrigger className="w-[70px]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="12">12</SelectItem>
                                <SelectItem value="24">24</SelectItem>
                                <SelectItem value="36">36</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <p className="text-sm text-gray-600">
                            Page {currentPage} of {pageCount}
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
                            disabled={currentPage === pageCount}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}
