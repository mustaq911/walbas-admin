"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Catalogue from "./catalogue/components/Catalogue"
import GradeSets from "./grade-sets/components/GradeSets"
import { TargetSettings } from "./targets/components/TargetSettings"
import MarksheetSettings from "./marksheet-settings/components/MarksheetSettings"



export default function AssessmentTabs() {
    const [ ,setActiveTab] = useState("catalogue")

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-6">Assessment Framework</h1>
            <Tabs defaultValue="catalogue" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                    <TabsTrigger value="catalogue">Assessment Catalogue</TabsTrigger>
                    <TabsTrigger value="grade-set">Grade Sets</TabsTrigger>
                    <TabsTrigger value="targets">Targets</TabsTrigger>
                    <TabsTrigger value="marksheet">Marksheet Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="framework" className="mt-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold mb-4">Assessment Framework</h2>
                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start">
                                <ChevronRight className="h-4 w-4 mr-2" />
                                Grade Sets
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <ChevronRight className="h-4 w-4 mr-2" />
                                Targets
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <ChevronRight className="h-4 w-4 mr-2" />
                                Marksheet Settings
                            </Button>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="catalogue" className="mt-6">
                    <Catalogue />
                </TabsContent>
                <TabsContent value="grade-set" className="mt-6">
                    <div className="space-y-2">
                        <GradeSets />
                    </div>
                </TabsContent>
                <TabsContent value="targets" className="mt-6">
                    <div className="space-y-2">

                        <TargetSettings />
                    </div>
                </TabsContent>
                <TabsContent value="marksheet" className="mt-6">
                    <div className="space-y-2">
                        <MarksheetSettings />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

