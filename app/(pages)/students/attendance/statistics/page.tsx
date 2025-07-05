"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Users, UserCheck, UserX } from "lucide-react"


export default function AttendanceDashboard() {


    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">Attendance Statistics</h1>
                        <p className="text-muted-foreground mt-2">Academic Year 2024-2025</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Present Rate</CardTitle>
                            <UserCheck className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-emerald-500">92.05%</div>
                            <p className="text-xs text-muted-foreground mt-2">+0.5% from last month</p>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mb-16" />
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Authorized Absence</CardTitle>
                            <Users className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-amber-500">5.47%</div>
                            <p className="text-xs text-muted-foreground mt-2">-0.2% from last month</p>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mb-16" />
                        </CardContent>
                    </Card>
                    <Card className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Unauthorized Absence</CardTitle>
                            <UserX className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-red-500">2.47%</div>
                            <p className="text-xs text-muted-foreground mt-2">+0.1% from last month</p>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mb-16" />
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}

