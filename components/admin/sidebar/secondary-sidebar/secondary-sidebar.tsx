import React, { useState } from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { motion } from "framer-motion";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import Link from 'next/link'
import { ChevronRight, Folder, FolderOpen, LucideIcon } from 'lucide-react'
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';


type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

interface SecondarySidebarProps {
    title: string;
    description?: string | null;
    menuItems: Group[]
}
  

const SecondarySidebar = ({title, description, menuItems}: SecondarySidebarProps) => {
    const [search, setSearch] = useState<string>("");

    const debouncedSearch = useDebounce(search, 300);
  
    const filterMenus = (menus: Menu[], query: string) => {
        return menus
        .map((menu) => {
            // Filter submenus that match the search
            const filteredSubmenus = menu.submenus.filter((submenu) =>
                submenu.label.toLowerCase().includes(query.toLowerCase())
            );
            // If menu or any submenu matches, return a new object with filtered submenus
            if (
                menu.label.toLowerCase().includes(query.toLowerCase()) ||
                filteredSubmenus.length > 0
            ) {
                return { ...menu, submenus: filteredSubmenus };
            }
            return null;
            })
        .filter(Boolean) as Menu[];
    };
  
    
    const filteredMenuItems = menuItems
      .map(({ groupLabel, menus }) => {
        const filteredMenus = filterMenus(menus, debouncedSearch);
  
        // Keep group if it or its menus match
        if (
          groupLabel.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          filteredMenus.length > 0
        ) {
          return { groupLabel, menus: filteredMenus };
        }
  
        return null;
    })
    .filter(Boolean) as Group[];
    return (
        <Sidebar collapsible='none' className="flex-1 md:flex">
            <SidebarHeader className="pl-4">
                <div className="flex w-full flex-col">
                    <div className="font-medium text-foreground text-lg">{title}</div>
                    <div className="text-xs">{description}</div>
                </div>
                <Input
                    type="text"
                    placeholder="🔍 Search..."
                    className='rounded-xl bg-card'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </SidebarHeader>
            <SidebarContent>
                {filteredMenuItems.map(({ groupLabel, menus }, groupIndex) => (
                    <SidebarGroup key={groupIndex}>
                    {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}

                    {menus.map(({ href, label, icon: Icon, active, submenus }, menuIndex) =>
                        submenus.length === 0 ? (
                        <SidebarMenuItem key={menuIndex}>
                            <SidebarMenuButton
                            asChild
                            tooltip={label}
                            className={`rounded-xl ${active ? "bg-primary text-white hover:text-primary" : "" }`}
                            >
                            <Link href={href}>
                                {Icon && <Icon />}
                                <span>{label}</span>
                            </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        ) : (
                        <Collapsible
                            key={label}
                            asChild
                            defaultOpen={active}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                tooltip={label}
                                className={`rounded-xl ${active ? "bg-primary text-white hover:text-primary" : ""}`}
                                >
                                {Icon && <Icon />}
                                <span>{label}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                                <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                                >
                                <SidebarMenuSub>
                                    {submenus.map((submenu) => (
                                    <SidebarMenuSubItem key={submenu.label}>
                                        <SidebarMenuSubButton asChild 
                                         className="rounded-xl"
                                        >
                                        <Link href={submenu.href}>
                                            {submenu.active ? (
                                                <FolderOpen/>
                                            ) : (
                                                <Folder/>
                                            )}
                                            <span className={` ${submenu.active ? "font-bold text-primary hover:text-primary" : ""}`}>
                                                {submenu.label}</span>
                                        </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                                </motion.div>
                            </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                        )
                    )}
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}

export default SecondarySidebar