"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, List, Users, X } from 'lucide-react'
import AbsenteesTable from "./by-date/components/AbsenteesByDate"
import BrokenWeeks from "./broken-weeks/components/BrokenWeeks"
import ContinuousAbsence from "./continous-absence/components/ContinousAbsence"
import PersistentAbsentees from "./persistent-absentees/components/PersistenAbsentees"
import PlannedAbsences from "./planned-absence/components/PlannedAbsence"


export default function AppLayout() {
    const [activeTab, setActiveTab] = useState("by-date")

    return (
        <div className="min-h-screen bg-gray-50/40">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <span className="text-xl font-bold text-primary">Absentees</span>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            <Tabs defaultValue="by-date" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <TabsList className="h-16 w-full justify-start rounded-none bg-transparent">
                            <TabsTrigger
                                value="by-date"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                By Date
                            </TabsTrigger>
                            <TabsTrigger
                                value="broken-weeks"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <List className="mr-2 h-5 w-5" />
                                Broken Weeks
                            </TabsTrigger>
                            <TabsTrigger
                                value="continous-absence"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <X className="mr-2 h-5 w-5" />
                                Continous Absence
                            </TabsTrigger>
        
                            <TabsTrigger
                                value="persistent-absentees"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Persistent Absentees
                            </TabsTrigger>
                            <TabsTrigger
                                value="planned-absence"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Planned Absences
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>
            </Tabs>

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {activeTab === "by-date" && <AbsenteesTable />}
                    {activeTab === "broken-weeks" && <BrokenWeeks />}
                    {activeTab === "continous-absence" && <ContinuousAbsence />}
                    {activeTab === "persistent-absentees" && <PersistentAbsentees />}
                    {activeTab === "planned-absence" && <PlannedAbsences />}
                  
                </div>
            </main>
        </div>
    )
}

