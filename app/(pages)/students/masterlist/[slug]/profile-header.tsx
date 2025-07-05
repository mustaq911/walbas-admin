"use client"

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { navigation } from '@/constants/students/navigation'
import { ChevronDown, ChevronRight, Menu } from 'lucide-react'
import React, { useState } from 'react'
import useStudent from '@/hooks/students/use-student'

export default function ProfileHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const [expandedItems, setExpandedItems] = useState<string[]>([])
    
    const { activeItem, setActiveItem } = useStudent()

    const handleItemClick = (main: string, sub = "") => {
        setActiveItem(main, sub)
        setIsOpen(false)
    }

    const toggleExpand = (title: string) => {
        setExpandedItems((prev) => 
            prev.includes(title) 
                ? prev.filter((item) => item !== title) 
                : [...prev, title]
        )
    }

    return (
        <div className="">
            <div className="flex items-center justify-between px-4 py-4 md:px-6">
                <h1 className="text-xl font-semibold">Student Profile</h1>
                <div className="flex items-center gap-2">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                            <nav className="flex flex-col py-2">
                                {navigation.map((item) => (
                                    <div key={item.title} className="px-4">
                                        {item.submenu ? (
                                            <>
                                                <button
                                                    onClick={() => toggleExpand(item.title)}
                                                    className={`flex w-full items-center justify-between py-2 text-sm font-medium transition-colors ${
                                                        activeItem.main === item.title
                                                            ? "text-primary"
                                                            : "text-foreground hover:text-primary"
                                                    }`}
                                                >
                                                    {item.title}
                                                    {expandedItems.includes(item.title) ? (
                                                        <ChevronDown className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4" />
                                                    )}
                                                </button>
                                                {expandedItems.includes(item.title) && (
                                                    <div className="ml-4 border-l pl-4">
                                                        {item.submenu.map((subItem) => (
                                                            <button
                                                                key={subItem.title}
                                                                onClick={() => handleItemClick(item.title, subItem.title)}
                                                                className={`block w-full py-2 text-left text-sm transition-colors ${
                                                                    activeItem.main === item.title &&
                                                                    activeItem.sub === subItem.title
                                                                        ? "text-primary font-medium"
                                                                        : "text-muted-foreground hover:text-primary"
                                                                }`}
                                                            >
                                                                {subItem.title}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleItemClick(item.title)}
                                                className={`block w-full py-2 text-left text-sm font-medium transition-colors ${
                                                    activeItem.main === item.title
                                                        ? "text-primary"
                                                        : "text-foreground hover:text-primary"
                                                }`}
                                            >
                                                {item.title}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <nav className="hidden md:flex flex-wrap px-4">
                {navigation.map((item) => (
                    <div key={item.title} className="relative">
                        {item.submenu ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`px-4 py-3 text-sm transition-colors hover:text-primary ${
                                            activeItem.main === item.title
                                                ? "border-b-2 border-primary font-medium text-primary"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        {item.title}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-[200px]">
                                    {item.submenu.map((subItem) => (
                                        <DropdownMenuItem key={subItem.title} onClick={() => handleItemClick(item.title, subItem.title)}>
                                            <a href={subItem.href} className="w-full">
                                                {subItem.title}
                                            </a>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <button
                                onClick={() => handleItemClick(item.title)}
                                className={`px-4 py-3 text-sm transition-colors hover:text-primary ${
                                    activeItem.main === item.title
                                        ? "border-b-2 border-primary font-medium text-primary"
                                        : "text-muted-foreground"
                                }`}
                            >
                                {item.title}
                            </button>
                        )}
                    </div>
                ))}
            </nav>
            {activeItem.sub && (
                <div className="bg-muted px-4 py-2 text-sm text-muted-foreground md:px-6">
                    {activeItem.main} &gt; {activeItem.sub}
                </div>
            )}
        </div>
    )
}