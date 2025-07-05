
"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users } from 'lucide-react'
import ScheduleRegistration from "./components/ScheduleRegistration"
import ExaminationReports from "./components/ExaminationReports"





export default function AppLayout() {
    const [activeTab, setActiveTab] = useState("schedule-registration")

    return (
        <div className="min-h-screen bg-gray-50/40">

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <TabsList className="h-16 w-full justify-start rounded-none bg-transparent">
                            <TabsTrigger
                                value="schedule-registration"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Schedule
                            </TabsTrigger>
                            <TabsTrigger
                                value="reports"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Reports Analysis
                            </TabsTrigger>
 
                  

                        </TabsList>
                    </div>
                </div>
            </Tabs>

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {activeTab === "schedule-registration" && <ScheduleRegistration />}
                    {activeTab === "reports" && <ExaminationReports />}
        
                



                </div>
            </main>
        </div>
    )
}

