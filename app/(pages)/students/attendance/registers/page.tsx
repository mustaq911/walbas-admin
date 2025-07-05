"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, List, Users, X } from 'lucide-react'
import DailyAttendance from "./daily-attendance/components/DailyAttendance"
import IncompleteRegisters from "./incomplete/components/IncompleteRegisters"
import RegistersByDate from "./register-by-date/components/RegisterByDate"
import BulkEditAttendance from "./bulk-edit/components/BulkEditAttendance"

export default function AppLayout() {
    const [activeTab, setActiveTab] = useState("attendance")

    return (
        <div className="min-h-screen bg-gray-50/40">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <span className="text-xl font-bold text-primary">Registers</span>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <TabsList className="h-16 w-full justify-start rounded-none bg-transparent">
                            <TabsTrigger
                                value="attendance"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Attendance
                            </TabsTrigger>
                            <TabsTrigger
                                value="follow-up"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <List className="mr-2 h-5 w-5" />
                                Quick Follow-up
                            </TabsTrigger>
                            <TabsTrigger
                                value="incomplete"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <X className="mr-2 h-5 w-5" />
                                Incomplete Registers
                            </TabsTrigger>
                            <TabsTrigger
                                value="register-by-date"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Registers by Date
                            </TabsTrigger>
                            <TabsTrigger
                                value="bulk-edit"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Bulk Edit Attendance
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>
            </Tabs>

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {activeTab === "attendance" && <DailyAttendance />}
                    {activeTab === "incomplete" && <IncompleteRegisters />}
                    {activeTab === "register-by-date" && <RegistersByDate />}
                    {activeTab === "bulk-edit" && <BulkEditAttendance />}
                </div>
            </main>
        </div>
    )
}

