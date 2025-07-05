

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import AppHeader from "./header/app-header"
import { AppSidebar } from "./sidebar/app-sidebar"
import { AppFooter } from "./footer/app-footer"


export default function AppLayout({ children }: {children: React.ReactNode; }) {
    return (
        <SidebarProvider
            style={
                {
                "--sidebar-width": "350px",
                } as React.CSSProperties
            }
        >
            <AppSidebar/>
            <SidebarInset>
                <AppHeader/>
                    <div className="flex flex-1 flex-col gap-5 p-5">
                        {children}
                    </div>
                <AppFooter/>
            </SidebarInset>
        </SidebarProvider>
    )
}
