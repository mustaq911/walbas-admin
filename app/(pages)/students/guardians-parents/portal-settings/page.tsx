"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ClipboardList, UserCheck, Dot } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ParentPortalSettings() {
    return (
        <div className="container mx-auto py-2 space-y-6">
            <h1 className="text-xl font-bold mb-6">Parent Portal Settings</h1>

            <Card>
                <CardHeader className="bg-muted/50">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <CardTitle>Activities</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-6">
                        When parents/guardians log on to the Parent Portal, these settings determine what can be seen in regards to
                        activities.
                    </p>
                    <div className="space-y-4">
                        {["Trips", "Clubs", "Sports"].map((item) => (
                            <div key={item} className="flex items-center gap-4 py-2">
                                {/* <Checkbox id={item.toLowerCase()} /> */}
                                <span><Dot /></span>
                                <div className="flex-1">
                                    <label
                                        htmlFor={item.toLowerCase()}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item}
                                    </label>
                                </div>
                                <Select defaultValue="show">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="show">Yes, show {item.toLowerCase()}</SelectItem>
                                        <SelectItem value="hide">No, hide {item.toLowerCase()}</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="bg-muted/50">
                    <div className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-muted-foreground" />
                        <CardTitle>Assessments</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-6">
                        Configure what assessment information is visible to parents in the portal.
                    </p>
                    <div className="space-y-4">
                        {["Progress Results", "Curriculum Tracking", "Reports"].map((item) => (
                            <div key={item} className="flex items-center gap-4 py-2">
                                <span><Dot /></span>
                                <div className="flex-1">
                                    <label
                                        htmlFor={item.toLowerCase().replace(" ", "-")}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item}
                                    </label>
                                </div>
                                <Select defaultValue="show">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="show">Yes, show {item.toLowerCase()}</SelectItem>
                                        <SelectItem value="hide">No, hide {item.toLowerCase()}</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="bg-muted/50">
                    <div className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-muted-foreground" />
                        <CardTitle>Attendance</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-6">
                        Manage attendance visibility and reporting options for parents.
                    </p>
                    <div className="space-y-4">
                        {["Attendance Results", "Absences"].map((item) => (
                            <div key={item} className="flex items-center gap-4 py-2">
                                <span><Dot /></span>
                                <div className="flex-1">
                                    <label
                                        htmlFor={item.toLowerCase().replace(" ", "-")}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item}
                                    </label>
                                </div>
                                <Select defaultValue="show">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="show">Yes, show {item.toLowerCase()}</SelectItem>
                                        <SelectItem value="hide">No, hide {item.toLowerCase()}</SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4 pt-6">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </div>
        </div>
    )
}

