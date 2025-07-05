
"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { List, Users } from 'lucide-react'
import ReportingSuspension from "./components/Reporting"
import StatisticSuspension from "./components/StatisticSuspension"



export default function AppLayout() {
    const [activeTab, setActiveTab] = useState("reporting")

    return (
        <div className="min-h-screen bg-gray-50/40">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <span className="text-xl font-bold text-primary">Suspensions</span>
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
                                value="reporting"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Reporting
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
                    {activeTab === "reporting" && <ReportingSuspension />}
                    {activeTab === "statistics" && <StatisticSuspension />}


                </div>
            </main>
        </div>
    )
}

