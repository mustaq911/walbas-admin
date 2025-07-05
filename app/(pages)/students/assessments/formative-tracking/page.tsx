"use client"

import type React from "react"

import { useState } from "react"
import { Bold, Download, File, FileText, Image, Italic, Settings2, Trash2, Underline, Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"

const assessmentLevels = [
    { value: "below-emerging", label: "Below Emerging" },
    { value: "emerging", label: "Emerging" },
    { value: "developing", label: "Developing" },
    { value: "secure", label: "Secure" },
]

const statusColors = {
    "below-emerging": "text-red-500",
    emerging: "text-orange-500",
    developing: "text-yellow-500",
    secure: "text-green-500",
}

const columns = [
    {
        id: "statement1",
        label: "Statement 1",
    },
    {
        id: "statement2",
        label: "Statement 2",
    },
    {
        id: "statement3",
        label: "Statement 3",
    },
    {
        id: "statement4",
        label: "Statement 4",
    },
    {
        id: "statement5",
        label: "Statement 5",
    },
]

const initialStudents = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        image: "https://github.com/shadcn.png",
        grades: {
            statement1: "secure",
            statement2: "developing",
            statement3: "emerging",
            statement4: "below-emerging",
            statement5: "developing",
        },
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        image: "https://avatars.githubusercontent.com/u/28345881?v=4",
        grades: {
            statement1: "developing",
            statement2: "emerging",
            statement3: "below-emerging",
            statement4: "secure",
            statement5: "emerging",
        },
    },
    {
        id: 3,
        name: "Robert Jones",
        email: "robert.jones@example.com",
        image: "https://unavatar.io/github/jeremynguyen",
        grades: {
            statement1: "emerging",
            statement2: "below-emerging",
            statement3: "secure",
            statement4: "developing",
            statement5: "below-emerging",
        },
    },
]

interface Evidence {
    date: string
    summary: string
    comment: string
    file?: File
}


interface UploadedFile {
    name: string
    size: string
    type: "image" | "document" | "other"
}

export default function AssessmentDatatable() {
    const [students, setStudents] = useState(initialStudents)
    const [visibleColumns, setVisibleColumns] = useState(columns.map((col) => col.id))
    const [searchTerm, setSearchTerm] = useState("")
    const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<string>("")
    const [selectedColumn, setSelectedColumn] = useState<string>("")
    const [newEvidence, setNewEvidence] = useState<Evidence>({
        date: new Date().toISOString().split("T")[0],
        summary: "",
        comment: "",
    })
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
        { name: "student_work_1.jpg", size: "2.3 MB", type: "image" },
        { name: "assessment_notes_1.pdf", size: "1.1 MB", type: "document" },
        { name: "audio_feedback_1.mp3", size: "3.7 MB", type: "other" },
        { name: "student_work_2.png", size: "1.8 MB", type: "image" },
        { name: "assessment_notes_2.pdf", size: "0.9 MB", type: "document" },
        { name: "video_presentation.mp4", size: "15.2 MB", type: "other" },
        { name: "written_assignment.docx", size: "0.5 MB", type: "document" },
        { name: "project_screenshot.jpg", size: "3.1 MB", type: "image" },
    ])



    const handleGradeChange = (studentId: number, columnId: string, value: string) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === studentId
                    ? {
                        ...student,
                        grades: {
                            ...student.grades,
                            [columnId]: value,
                        },
                    }
                    : student,
            ),
        )
    }

    const handleOpenEvidenceModal = (studentName: string, columnName: string) => {
        setSelectedStudent(studentName)
        setSelectedColumn(columnName)
        setIsEvidenceModalOpen(true)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const newFile: UploadedFile = {
                name: file.name,
                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                type: file.type.startsWith("image/") ? "image" : file.type === "application/pdf" ? "document" : "other",
            }
            setUploadedFiles([...uploadedFiles, newFile])
        }
    }

    const removeFile = (fileName: string) => {
        setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName))
    }

    const handleAddEvidence = () => {
        // Handle adding evidence here
        console.log("Adding evidence:", { selectedStudent, selectedColumn, newEvidence })
        // You would typically send this data to your backend here

        // Reset form and close modal
        setIsEvidenceModalOpen(false)
        setNewEvidence({
            date: new Date().toISOString().split("T")[0],
            summary: "",
            comment: "",
        })
    }

    return (
        <div className="flex min-h-screen flex-col">
            <div className="border-b">
                <div className="container flex h-20 items-center justify-between">


                    <span className="font-bold">Citizenship</span>
                    <div className="flex items-center space-x-4">
                        <Input
                            type="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <Settings2 className="h-4 w-4" />
                                    <span className="sr-only">Open settings</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                {columns.map((column) => (
                                    <DropdownMenuItem
                                        key={column.id}
                                        onClick={() => {
                                            if (visibleColumns.includes(column.id)) {
                                                setVisibleColumns(visibleColumns.filter((id) => id !== column.id))
                                            } else {
                                                setVisibleColumns([...visibleColumns, column.id])
                                            }
                                        }}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={visibleColumns.includes(column.id)}
                                                readOnly
                                                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                            />
                                            <span>{column.label}</span>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <div className="container py-6">
                <div className="rounded-lg border bg-white shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Student</TableHead>
                                {columns
                                    .filter((col) => visibleColumns.includes(col.id))
                                    .map((column) => (
                                        <TableHead key={column.id}>{column.label}</TableHead>
                                    ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={student.image} alt={student.name} />
                                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="font-medium">{student.name}</div>
                                        </div>
                                    </TableCell>
                                    {columns
                                        .filter((col) => visibleColumns.includes(col.id))
                                        .map((column) => (
                                            <TableCell key={column.id} className="relative">
                                                <div className="flex items-center gap-2">
                                                    <Select
                                                        value={student.grades[column.id]}
                                                        onValueChange={(value) => handleGradeChange(student.id, column.id, value)}
                                                    >
                                                        <SelectTrigger className="w-[130px]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {assessmentLevels.map((level) => (
                                                                <SelectItem key={level.value} value={level.value}>
                                                                    <span className={statusColors[level.value as keyof typeof statusColors]}>
                                                                        {level.label}
                                                                    </span>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        onClick={() => handleOpenEvidenceModal(student.name, column.label)}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <Dialog open={isEvidenceModalOpen} onOpenChange={setIsEvidenceModalOpen}>
                    <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                            <DialogTitle>Add Evidence</DialogTitle>
                            <DialogDescription>
                                Adding evidence for {selectedStudent} - {selectedColumn}
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[500px]">

                            <div className="space-y-6 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date</label>
                                    <Input
                                        type="date"
                                        value={newEvidence.date}
                                        onChange={(e) => setNewEvidence({ ...newEvidence, date: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Summary</label>
                                    <Input
                                        placeholder="Add a summary here..."
                                        value={newEvidence.summary}
                                        onChange={(e) => setNewEvidence({ ...newEvidence, summary: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium">Comments</label>
                                        <div className="flex items-center gap-1">
                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                <Bold className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                <Italic className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                <Underline className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Textarea
                                        placeholder="Add detailed comments here..."
                                        value={newEvidence.comment}
                                        onChange={(e) => setNewEvidence({ ...newEvidence, comment: e.target.value })}
                                        rows={6}
                                        className="resize-none"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-medium">Attachments</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="dropzone-file"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                                <p className="mb-1 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">PDF, PNG, JPG or MP3 (MAX. 10MB)</p>
                                            </div>
                                            <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                    {uploadedFiles.length > 0 && (
                                        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                            <div className="space-y-2 pr-4">
                                                {uploadedFiles.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border">
                                                        <div className="flex items-center space-x-3">
                                                            {file.type === "image" && <Image className="w-5 h-5 text-blue-500" />}
                                                            {file.type === "document" && <FileText className="w-5 h-5 text-green-500" />}
                                                            {file.type === "other" && <File className="w-5 h-5 text-yellow-500" />}
                                                            <span className="text-sm font-medium">{file.name}</span>
                                                            <span className="text-xs text-gray-500">{file.size}</span>
                                                        </div>
                                                        <Button variant="ghost" size="sm" onClick={() => removeFile(file.name)}>
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    )}
                                </div>
                            </div>


                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEvidenceModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleAddEvidence}>Save Evidence</Button>
                            </DialogFooter>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

