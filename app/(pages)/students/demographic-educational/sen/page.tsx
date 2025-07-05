
"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { List, Users } from 'lucide-react'
import SENStudentsList from "./student-sen/components/Sen"
import SENStatistic from "../statistics/components/SENStatistic"




export default function AppLayout() {
    const [activeTab, setActiveTab] = useState("student-sen")

    return (
        <div className="min-h-screen bg-gray-50/40">

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <TabsList className="h-16 w-full justify-start rounded-none bg-transparent">
                            <TabsTrigger
                                value="student-sen"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Student with SEN
                            </TabsTrigger>
                            <TabsTrigger
                                value="statistics"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <List className="mr-2 h-5 w-5" />
                                Statistics
                            </TabsTrigger>

                        </TabsList>
                    </div>
                </div>
            </Tabs>

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {activeTab === "student-sen" && <SENStudentsList />}
                    {activeTab === "statistics" && <SENStatistic />}
       


                </div>
            </main>
        </div>
    )
}

