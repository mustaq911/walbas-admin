import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppCrumb from './app-crumb'
import AppCustomizer from './app-customizer'

const AppHeader = () => {
    return (
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background pl-5 pr-5 pt-2 pb-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppCrumb />
            <AppCustomizer/>
        </header>
    )
}

export default AppHeader