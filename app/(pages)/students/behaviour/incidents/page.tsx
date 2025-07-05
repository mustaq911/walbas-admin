"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { List, Users } from 'lucide-react'
import IncidentManagement from "./components/Dashboard"
import IncidentReporting from "./components/Reports"


export default function AppLayout() {
    const [activeTab, setActiveTab] = useState("dashboard-incident")

    return (
        <div className="min-h-screen bg-gray-50/40">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <span className="text-xl font-bold text-primary">Incidents</span>
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
                                value="dashboard-incident"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Dashboard
                            </TabsTrigger>
                            <TabsTrigger
                                value="reporting"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <List className="mr-2 h-5 w-5" />
                                Reporting
                            </TabsTrigger>

                        </TabsList>
                    </div>
                </div>
            </Tabs>

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {activeTab === "dashboard-incident" && <IncidentManagement />}
                    {activeTab === "reporting" && <IncidentReporting />}

                </div>
            </main>
        </div>
    )
}

