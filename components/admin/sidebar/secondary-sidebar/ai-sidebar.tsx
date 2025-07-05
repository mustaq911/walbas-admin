"use client"

import React, { useState } from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader } from '@/components/ui/sidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


const AiSidebar = () => {
    const [keyword, setKeyword] = useState('')  
    const histories =  [
        {
          "id": "1",
          "title": "How to update academic year",
          "time": "2023-11-05T14:30:00Z"
        },
        {
          "id": "2",
          "title": "Register a student",
          "time": "2023-11-04T09:00:00Z"
        },
        {
          "id": "3",
          "title": "Bug Report",
          "time": "2023-11-03T16:45:00Z"
        }
    ]
    return (
        <Sidebar collapsible='none' className="flex-1 md:flex">
            <SidebarHeader className="pl-4">
                <div className="flex w-full flex-col">
                    <div className="font-medium text-foreground text-lg">🤖 How can I help you? </div>
                    <div className="text-xs">Put a branding and description of AI here</div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="px-0">
                    <SidebarGroupContent className='p-3'>
                        <Input 
                            type="text"
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value);
                            }}
                            placeholder='Search ...'
                            className='w-full xl:max-w-xs text-sm mb-2' 
                        />
                    
                        <div className="flex flex-col mt-3">
                            <div className="text-sm font-bold">History</div>
                            {histories.map((history, index) => (   
                                <Button key={index} variant="ghost" size="sm" className='text-start justify-start'>
                                    {history.title}
                                </Button>
                            ))}
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AiSidebar