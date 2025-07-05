"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Filter, Clock, Users, Calendar, School } from "lucide-react"

export default function StatisticsDashboard() {
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-4">
    

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg border flex items-center gap-2">
                            <Filter className="h-5 w-5 text-green-600" />
                            <span className="text-green-600 font-medium text-sm">Wed, 01 Jan 2025 - Wed, 30 Apr 2025</span>
                        </div>
                    </div>
                    <div className="w-full sm:w-72">
                        <Input type="search" placeholder="Search by student name" />
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Exclusions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Hours</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">6.33</div>
                        <p className="text-xs text-muted-foreground">Per exclusion</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Days</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.43</div>
                        <p className="text-xs text-muted-foreground">Per exclusion</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Year Groups</CardTitle>
                        <School className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">Affected</p>
                    </CardContent>
                </Card>
            </div>

        

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Student Details</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            name: "Adams Harvey",
                            form: "C&R PHASE 1",
                            exclusions: 1,
                            hours: 6.33,
                            days: 1.17,
                        },
                        {
                            name: "Clarke Ben",
                            form: "8JVI",
                            exclusions: 1,
                            hours: 7.75,
                            days: 1.43,
                        },
                        {
                            name: "Clark Aaron",
                            form: "Form 12LC",
                            exclusions: 2,
                            hours: 2.5,
                            days: 0.46,
                        },
                        // Add more students as needed
                    ].map((student) => (
                        <Card key={student.name}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-medium">{student.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{student.form}</p>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground">Exclusions</p>
                                        <p className="font-medium">{student.exclusions}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground">Hours</p>
                                        <p className="font-medium">{student.hours}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground">Days</p>
                                        <p className="font-medium">{student.days}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

