"use client"

import * as React from "react"

import {
  Sidebar,
} from "@/components/ui/sidebar"
import AppMainSidebar from "./app-main-sidebar"
import AppSecondarySidebar from "./app-secondary-sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  

  return (
    <Sidebar
      collapsible="icon"
      // className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      
      className="overflow-hidden "
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
    
      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <div className="flex h-[100dvh]">
        <AppMainSidebar/>
        <AppSecondarySidebar/>
      </div>
    </Sidebar>
  )
}
