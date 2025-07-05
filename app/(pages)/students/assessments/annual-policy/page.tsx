"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ManageAssessments from "./manage-assessments/components/ManageAssessments"
import AssessmentPeriods from "./assessment-periods/components/AssessmentPeriods"
import AssessableCourses from "./acessable-courses/components/AcessableCourses"
import SchoolExpectations from "./expectations/components/SchoolExpectations"
import Measures from "./measures/components/Measures"
import DataCollections from "./data-collections/DataCollections"

export default function AnnualPolicy() {
    const [, setActiveTab] = useState("catalogue")

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-6">Annual Policy</h1>
            <Tabs defaultValue="assessments" className="w-full" onValueChange={setActiveTab}>
                <ScrollArea className="w-full whitespace-nowrap rounded-md gap-4">
                    <TabsList className="inline-flex h-10 gap-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                        <TabsTrigger value="assessments">Manage Assessments</TabsTrigger>
                        <TabsTrigger value="periods">Assessment Periods</TabsTrigger>
                        <TabsTrigger value="courses">Assessable Courses</TabsTrigger>
                        <TabsTrigger value="expectations">School Expectations</TabsTrigger>
                        <TabsTrigger value="measures">School Measures</TabsTrigger>
                        <TabsTrigger value="collections">Data Collections</TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <TabsContent value="assessments" className="mt-6">
                    <ManageAssessments />
                </TabsContent>
                <TabsContent value="periods" className="mt-6">
                    <div className="space-y-2">
                        <AssessmentPeriods />
                    </div>
                </TabsContent>
                <TabsContent value="courses" className="mt-6">
                    <div className="space-y-2">
                        <AssessableCourses />
                    </div>
                </TabsContent>
                <TabsContent value="expectations" className="mt-6">
                    <div className="space-y-2">
                        <SchoolExpectations />
                    </div>
                </TabsContent>
                <TabsContent value="measures" className="mt-6">
                    <div className="space-y-2">
                        <Measures />
                    </div>
                </TabsContent>
                <TabsContent value="collections" className="mt-6">
                    <div className="space-y-2">
                        <DataCollections />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

