"use client"

import AppContent from "@/components/admin/content/app-content";
import AppModal from "@/components/modal/app-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus } from "lucide-react";
import IntakeForm from "./components/IntakeForm";
import { useState } from "react";

interface IntakeSeason {
    name: string
    dateRange: string
    academicYear: string
    status: "active" | "upcoming" | "ongoing"
}

const currentSeasons: IntakeSeason[] = [
    {
        name: "Autumn '25",
        dateRange: "01 Sep 2025 - 31 Aug 2026",
        academicYear: "2025/2026",
        status: "upcoming",
    },
    {
        name: "Autumn 2025/2026",
        dateRange: "01 Sep 2025 - 31 Aug 2026",
        academicYear: "2025/2026",
        status: "upcoming",
    },
    {
        name: "Autumn 2023",
        dateRange: "01 Sep 2023 - ongoing",
        academicYear: "2023/2024",
        status: "active",
    },
    {
        name: "Autumn 22",
        dateRange: "01 Sep 2024 - ongoing",
        academicYear: "2022/2023",
        status: "ongoing",
    },
]

export default function StudentApplicant() {

    const [open, setOpen] = useState(false)

    return (
        <AppContent title="">
            <AppModal title="Add Intake Season" description="Add New Intake Season" open={open}
                setOpen={setOpen}>
                <IntakeForm />
            </AppModal>
            <div className="w-full max-w-5xl mx-auto p-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold mb-1">Intake Seasons</h1>
                        <p className="text-muted-foreground">Manage your academic intake periods</p>
                    </div>
                    <Button onClick={() => setOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Season
                    </Button>
                </div>

                <Tabs defaultValue="current" className="w-full">
                    <TabsList className="w-full max-w-[300px] mb-6 grid grid-cols-2 bg-muted/30">
                        <TabsTrigger value="current">Active & Upcoming</TabsTrigger>
                        <TabsTrigger value="historic">Past Seasons</TabsTrigger>
                    </TabsList>

                    <TabsContent value="current" className="space-y-6">
                        {currentSeasons.map((season, index) => (
                            <div key={index} className="group relative bg-card hover:bg-accent/5 rounded-lg p-6 transition-all border">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-medium">{season.name}</h3>
                                            <Badge
                                                variant={
                                                    season.status === "active" ? "default" : season.status === "upcoming" ? "secondary" : "outline"
                                                }
                                                className="capitalize"
                                            >
                                                {season.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            <span className="text-sm">{season.dateRange}</span>
                                        </div>
                                    </div>
                                    <div className="sm:text-right">
                                        <div className="text-sm text-muted-foreground mb-1">Academic Year</div>
                                        <div className="font-medium">{season.academicYear}</div>
                                    </div>
                                </div>
                                <div className="absolute left-0 top-0 w-1 h-full bg-primary/0 group-hover:bg-primary/100 rounded-l-lg transition-all" />
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="historic">
                        <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/10 rounded-lg border border-dashed">
                            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-1">No Past Seasons</h3>
                            <p className="text-sm text-muted-foreground">Past academic intake seasons will appear here</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppContent>
    )
}