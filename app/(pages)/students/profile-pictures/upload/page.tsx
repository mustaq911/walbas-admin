"use client"

import { useState } from "react"
import { Upload, Users, Building2, FileText, ImageIcon, FolderIcon, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"


// const mockUploads: any[] = []
const mockUploads = [
    {
      id: "1",
      name: "1234.jpg",
      size: 2048576,
      progress: 100,
      status: "completed",
      type: "student",
      preview: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "JSmith.jpg",
      size: 1548576,
      progress: 100,
      status: "completed",
      type: "student",
      preview: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "H000000001234.jpg",
      size: 3048576,
      progress: 65,
      status: "uploading",
      type: "student",
      preview: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      name: "staff_profile.jpg",
      size: 2048576,
      progress: 30,
      status: "uploading",
      type: "staff",
      preview: "/placeholder.svg?height=100&width=100",
    },
  ]

export default function UploadPhotos() {
    const [activeTab, setActiveTab] = useState("students")
    const [isDragging, setIsDragging] = useState(false)

    const filteredUploads = mockUploads.filter((upload) => upload.type === activeTab)

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Upload Photos</h1>
                        <p className="text-muted-foreground mt-2">Upload and manage photos for students and staff</p>
                    </div>
                    <Button variant="outline" onClick={() => window.history.back()}>
                        Back
                    </Button>
                </div>

                <div className="grid lg:grid-cols-5 gap-6">
                    {/* Left side - Upload Area */}
                    <Card className="lg:col-span-3 p-6">
                        <Tabs defaultValue="students" onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="students">
                                    <Users className="h-4 w-4 mr-2" />
                                    Students
                                </TabsTrigger>
                                <TabsTrigger value="staff">
                                    <Building2 className="h-4 w-4 mr-2" />
                                    Staff
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="students" className="mt-0">
                                <div
                                    className={`
                    border-2 border-dashed rounded-lg p-8 transition-colors duration-200
                    ${isDragging ? "border-primary bg-primary/5" : "border-muted"}
                  `}
                                    onDragOver={(e) => {
                                        e.preventDefault()
                                        setIsDragging(true)
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault()
                                        setIsDragging(false)
                                        // Handle file drop
                                    }}
                                >
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="rounded-full bg-primary/10 p-4 mb-4">
                                            <Upload className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">Drop your files here</h3>
                                        <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>
                                        <input type="file" className="hidden" id="file-upload" multiple accept=".jpg,.jpeg" />
                                        <Button asChild>
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                Choose Files
                                            </label>
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="bg-muted/50 rounded-lg p-4">
                                        <h3 className="font-semibold mb-3">File Requirements</h3>
                                        <div className="grid gap-3 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <ImageIcon className="h-4 w-4" />
                                                <span>Only JPG or JPEG formats accepted</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <FolderIcon className="h-4 w-4" />
                                                <span>Maximum file size: 5MB</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-muted/50 rounded-lg p-4">
                                        <h3 className="font-semibold mb-3">Naming Convention</h3>
                                        <div className="grid gap-3 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <FileText className="h-4 w-4" />
                                                <span>Student ID (e.g. 1234.jpg)</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <FileText className="h-4 w-4" />
                                                <span>Student Number (e.g 1234567.jpg)</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <FileText className="h-4 w-4" />
                                                <span>Initial & Last Name (e.g. JSmith.jpg)</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <FileText className="h-4 w-4" />
                                                <span>Full Name (e.g. JamesSmith.jpg)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="staff" className="mt-0">
                                {/* Similar content for staff uploads */}
                                <div className="text-center text-muted-foreground p-8">
                                    Staff upload interface 
                                </div>
                            </TabsContent>
                        </Tabs>
                    </Card>

                    {/* Right side - Upload Progress */}
                    <Card className="lg:col-span-2">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Upload Progress</h3>
                                <Button variant="ghost" size="sm" disabled={filteredUploads.length === 0}>
                                    Clear All
                                </Button>
                            </div>

                            <ScrollArea className="h-[600px] pr-4">
                                {filteredUploads.length > 0 ? (
                                    <div className="space-y-4">
                                        {filteredUploads.map((file) => (
                                            <div key={file.id} className="flex gap-4 p-3 rounded-lg bg-muted/50">
                                                <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                                    <Image src={file.preview || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="font-medium truncate">{file.name}</p>
                                                        {file.status === "completed" ? (
                                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        ) : (
                                                            <span className="text-xs text-muted-foreground">{Math.round(file.progress)}%</span>
                                                        )}
                                                    </div>

                                                    <div className="text-xs text-muted-foreground mb-2">
                                                        {(file.size / 1024 / 1024).toFixed(1)} MB
                                                    </div>

                                                    <Progress value={file.progress} className="h-1" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                        <div className="rounded-full bg-muted p-6 mb-4">
                                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">No uploads yet</h3>
                                        <p className="text-sm text-muted-foreground max-w-[250px]">
                                            Drag and drop your photos or use the file browser to start uploading
                                        </p>
                                        <Button
                                            variant="link"
                                            className="mt-4"
                                            onClick={() => document.getElementById("file-upload")?.click()}
                                        >
                                            Select files to upload
                                        </Button>
                                    </div>
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

