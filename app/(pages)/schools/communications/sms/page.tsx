"use client"

import AppContent from "@/components/admin/content/app-content"
import DatatablePlaceholder from "@/components/placeholder/datatable-placeholder"
import { Button } from "@/components/ui/button"
import { Inbox, Box, Notebook, Send, Archive } from "lucide-react"

export default function SmsPage(){
   return(
        <AppContent title="SMS">
          
            <div className="grid grid-cols-12 min-h-[70vh]  border rounded-lg">
                <div className="col-span-12 xl:col-span-2 border-r">
                    <div className="flex flex-col p-3">
                        <Button className="justify-start text-start">
                            <Inbox/> Inbox
                        </Button>
                        <Button variant="ghost" className="justify-start text-start">
                            <Box/> Outbox
                        </Button>
                        <Button variant="ghost" className="justify-start text-start">
                            <Notebook/> Drafts
                        </Button>
                        <Button variant="ghost" className="justify-start text-start">
                            <Send/> Sent
                        </Button>
                        <Button variant="ghost" className="justify-start text-start">
                            <Archive/> Archive
                        </Button>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-10">
                    <div className="p-3">
                        <span className="text-lg font-bold mt-3">Inbox</span>
                        <DatatablePlaceholder/>
                    </div>
                </div>
            </div>
        </AppContent>
   )
}