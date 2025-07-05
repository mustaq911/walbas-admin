
"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { List, Users } from 'lucide-react'
import CoursesPage from "./courses/components/CourseClassess"
import EnrollmentCourse from "./enrollment/components/EnrollmentCourse"
import BulkEnrollment from "./enrollment/components/BulkEnrollmentCourse"
import TeacherAssignment from "./teaching-groups/components/TeacherAssignment"






export default function AppLayout() {
    const [activeTab, setActiveTab] = useState("courses")

    return (
        <div className="min-h-screen bg-gray-50/40">

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <TabsList className="h-16 w-full justify-start rounded-none bg-transparent">
                            <TabsTrigger
                                value="courses"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Courses
                            </TabsTrigger>
                            <TabsTrigger
                                value="enrollment"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Enrollment
                            </TabsTrigger>
                            <TabsTrigger
                                value="bulk-enrollment"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <Users className="mr-2 h-5 w-5" />
                                Bulk Enrollment
                            </TabsTrigger>
                            <TabsTrigger
                                value="teaching-groups"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                            >
                                <List className="mr-2 h-5 w-5" />
                                Teaching Groups
                            </TabsTrigger>
                  

                        </TabsList>
                    </div>
                </div>
            </Tabs>

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {activeTab === "courses" && <CoursesPage />}
                    {activeTab === "enrollment" && <EnrollmentCourse />}
                    {activeTab === "bulk-enrollment" && <BulkEnrollment />}
                    {activeTab === "teaching-groups" && <TeacherAssignment />}
                



                </div>
            </main>
        </div>
    )
}

