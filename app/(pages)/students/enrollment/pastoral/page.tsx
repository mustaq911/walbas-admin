
"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { List, Users } from 'lucide-react'
import YearGroup from "./year-groups/components/YearGroup"
import RegistrationForms from "./year-groups/components/RegistrationForms"
import Houses from "./year-groups/components/Houses"





export default function AppLayout() {
    const [activeTab, setActiveTab] = useState("year-group")

    return (
        <div className="min-h-screen bg-gray-50/40">

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <TabsList className="h-16 w-full justify-start rounded-none bg-transparent">
                            <TabsTrigger
                                value="year-group"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Year Group
                            </TabsTrigger>
                            <TabsTrigger
                                value="registration-forms"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <List className="mr-2 h-5 w-5" />
                                Registration Forms
                            </TabsTrigger>
                            <TabsTrigger
                                value="houses"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <List className="mr-2 h-5 w-5" />
                                Houses
                            </TabsTrigger>

                        </TabsList>
                    </div>
                </div>
            </Tabs>

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {activeTab === "year-group" && <YearGroup />}
                    {activeTab === "registration-forms" && <RegistrationForms />}
                    {activeTab === "houses" && <Houses />}



                </div>
            </main>
        </div>
    )
}

