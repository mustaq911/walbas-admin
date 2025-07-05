"use client"

import AppContent from "@/components/admin/content/app-content"
import { Loader } from "lucide-react"


export default function SchoolPage(){
    return (
        <AppContent title="">
            <div className="h-[80vh] items-center justify-center flex">
                <Loader className="animate-spin opacity-50 h-10 w-10"/>
            </div> 
        </AppContent>
    )
}

