"use client"

import { useState } from "react"
import {
    Search,
    Settings2,
    Plus,
    Info,
    ArrowUpDown,
    MoreHorizontal,
    FileDown,
    Trash2,
    Users,
    Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for year groups
const yearGroups = [
    { id: "test", label: "Test" },
    { id: "year7", label: "Year 7" },
    { id: "year7overall", label: "Year 7 overall" },
    { id: "year7site1", label: "Year 7 site1" },
    { id: "year8", label: "Year 8" },
    { id: "year9", label: "Year 9" },
    { id: "year10", label: "Year 10" },
    { id: "year11", label: "Year 11" },
    { id: "year12", label: "Year 12" },
    { id: "year13", label: "Year 13" },
]

// Mock data for downloads
const mockDownloads = [
    {
        id: 1,
        date: "2024-01-23T14:16:00",
        createdBy: "Fred Green",
        status: "ready",
        fileCount: 156,
        type: "student",
    },
    {
        id: 2,
        date: "2024-01-21T13:15:00",
        createdBy: "Nathan Brown",
        status: "ready",
        fileCount: 89,
        type: "staff",
    },
    {
        id: 3,
        date: "2024-01-17T15:35:00",
        createdBy: "Fred Green",
        status: "ready",
        fileCount: 234,
        type: "student",
    },
    {
        id: 4,
        date: "2024-01-10T09:56:00",
        createdBy: "Fred Green",
        status: "processing",
        fileCount: 45,
        type: "student",
    },
    {
        id: 5,
        date: "2024-01-10T09:54:00",
        createdBy: "Fred Green",
        status: "failed",
        fileCount: 0,
        type: "staff",
    },
]

export default function DownloadPhotos() {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("students")
    const [selectedYears, setSelectedYears] = useState<string[]>([])
    const [isCreateOpen, setIsCreateOpen] = useState(false)

    const filteredDownloads = mockDownloads.filter(
        (download) =>
            download.type === activeTab &&
            (download.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                new Date(download.date).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())),
    )

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Bulk Download Photos</h1>
                        <p className="text-muted-foreground mt-2">Download multiple photos in a single ZIP file</p>
                    </div>
                    <Button onClick={() => window.history.back()}>Back</Button>
                </div>

                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                        This page allows you to create a bulk download containing profile pictures. The photos will be in JPG format
                        and the file name for each photo will be in the format UPN.jpg
                    </AlertDescription>
                </Alert>

                <Card>
                    <Tabs defaultValue="students" onValueChange={setActiveTab}>
                        <CardHeader className="space-y-0">
                            <div className="flex items-center justify-between">
                                <TabsList>
                                    <TabsTrigger value="students">
                                        <Users className="h-4 w-4 mr-2" />
                                        Students
                                    </TabsTrigger>
                                    <TabsTrigger value="staff">
                                        <Building2 className="h-4 w-4 mr-2" />
                                        Staff
                                    </TabsTrigger>
                                </TabsList>
                                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" /> Create New
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                        <DialogHeader>
                                            <DialogTitle>Create Bulk Download</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-6 py-4">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Academic Year</label>
                                                    <Select defaultValue="2024/2025">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select year" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="2024/2025">2024/2025</SelectItem>
                                                            <SelectItem value="2023/2024">2023/2024</SelectItem>
                                                            <SelectItem value="2022/2023">2022/2023</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Year Groups</label>
                                                    <Card>
                                                        <CardContent className="p-4 max-h-[300px] overflow-y-auto">
                                                            <div className="space-y-4">
                                                                {yearGroups.map((year) => (
                                                                    <div key={year.id} className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            id={year.id}
                                                                            checked={selectedYears.includes(year.id)}
                                                                            onCheckedChange={(checked) => {
                                                                                if (checked) {
                                                                                    setSelectedYears([...selectedYears, year.id])
                                                                                } else {
                                                                                    setSelectedYears(selectedYears.filter((id) => id !== year.id))
                                                                                }
                                                                            }}
                                                                        />
                                                                        <label
                                                                            htmlFor={year.id}
                                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                        >
                                                                            {year.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-4">
                                                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        // Handle create download
                                                        setIsCreateOpen(false)
                                                    }}
                                                >
                                                    Create Download
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <TabsContent value="students" className="mt-0">
                                <DownloadTable
                                    downloads={filteredDownloads}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    formatDate={formatDate}
                                />
                            </TabsContent>

                            <TabsContent value="staff" className="mt-0">
                                <DownloadTable
                                    downloads={filteredDownloads}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    formatDate={formatDate}
                                />
                            </TabsContent>
                        </CardContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    )
}

function DownloadTable({
    downloads,
    searchQuery,
    setSearchQuery,
    formatDate,
}: {
    downloads: Record<string, unknown>[]
    searchQuery: string
    setSearchQuery: (query: string) => void
    formatDate: (date: string) => string
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search downloads..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Settings2 className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Show all columns</DropdownMenuItem>
                        <DropdownMenuItem>Hide date</DropdownMenuItem>
                        <DropdownMenuItem>Hide creator</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">
                                <Button variant="ghost" className="p-0 h-8 font-medium">
                                    Date
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead>Files</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {downloads.map((download) => (
                            <TableRow key={download.id}>
                                <TableCell className="font-medium">{formatDate(download.date)}</TableCell>
                                <TableCell>{download.createdBy}</TableCell>
                                <TableCell>{download.fileCount} photos</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            download.status === "ready"
                                                ? "success"
                                                : download.status === "processing"
                                                    ? "default"
                                                    : "destructive"
                                        }
                                    >
                                        {download.status === "ready"
                                            ? "Ready to download"
                                            : download.status === "processing"
                                                ? "Processing"
                                                : "Failed"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem disabled={download.status !== "ready"}>
                                                <FileDown className="mr-2 h-4 w-4" />
                                                Download ZIP
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

