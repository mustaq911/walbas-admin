"use client"

import { useState } from "react"
import { Upload, Download, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function PhotoManagement() {
    const [includeRole, setIncludeRole] = useState(false)
    const [includeDepartment, setIncludeDepartment] = useState(false)

    return (
        <div className="w-full mx-auto p-6">
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Profile Pictures</h1>
                    <p className="text-muted-foreground mt-2">Manage and organize photos for students and staff</p>
                </div>

                <div className="grid gap-6">
                    <Card className="p-6">
                        <Tabs defaultValue="students" className="w-full">
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

                            <TabsContent value="students" className="space-y-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Academic Year</label>
                                        <Select defaultValue="2023/2024">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="2023/2024">2023/2024</SelectItem>
                                                <SelectItem value="2022/2023">2022/2023</SelectItem>
                                                <SelectItem value="2021/2022">2021/2022</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="department"
                                                checked={includeDepartment}
                                                onCheckedChange={(checked) => setIncludeDepartment(checked as boolean)}
                                            />
                                            <label
                                                htmlFor="department"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Include Year
                                            </label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="role"
                                                checked={includeRole}
                                                onCheckedChange={(checked) => setIncludeRole(checked as boolean)}
                                            />
                                            <label
                                                htmlFor="role"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Include Registration Form
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="staff" className="space-y-4">
                                <div className="space-y-4">
                                    {/* Similar content for staff tab */}
                                    <p className="text-muted-foreground">Staff photo</p>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-500">
                                <Link href="/students/profile-pictures/upload">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Photos
                                </Link>
                            </Button>
                            <Button asChild className="flex-1 bg-green-600 hover:bg-green-500">
                                <Link href="/students/profile-pictures/download">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Photos
                                </Link>
                            </Button>
                        </div>
                    </Card>

                    <div className="flex justify-end">
                        <Button variant="default" size="lg">
                            Print Photo Sheet
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

