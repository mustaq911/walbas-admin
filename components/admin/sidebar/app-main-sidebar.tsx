import { 
    Sidebar, 
    SidebarContent, 
    SidebarFooter, 
    SidebarGroup, 
    SidebarGroupContent, 
    SidebarHeader, 
    SidebarMenu, 
    SidebarMenuButton, 
    SidebarMenuItem, 
    useSidebar
} from '@/components/ui/sidebar'
import ImageSrc from '@/constants/image';
import { MainSidebarMenuItem } from '@/constants/menu-items/main-sidebar-menu-item';
import { useActiveSidebar } from '@/hooks/use-active-sidebar';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { AppUser } from '../footer/app-footer-user';

const AppMainSidebar = () => {
    
    const menuList = MainSidebarMenuItem();
    const { setActiveSidebar} = useActiveSidebar();
    const {state} = useSidebar();
    return (
        <Sidebar
            collapsible="none"
            className="!w-[65px] bg-gray-100"
        >
            <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild className=" flex items-center justify-center">
                    <a href="#">
                        <Image src={ImageSrc.logo} alt='logo' className='size-8' width={50} height={50}/>
                        {/* <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Walbase Admin</span>
                            <span className="truncate text-xs">Auction Services</span>
                        </div> */}
                    </a>
                </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className='p-0'>
                <SidebarGroup>
                    <SidebarGroupContent className="px-0">
                        <SidebarMenu>
                            {menuList?.map((item) => (
                                <SidebarMenuItem key={item.key}>
                                    <Link href={item.href}>
                                        <SidebarMenuButton
                                            tooltip={{
                                                children: item.label,
                                                hidden: false,
                                            }}
                                            className={`text-xl hover:text-primary h-[45px]
                                                justify-center items-center 
                                                ${item.active ? '-ms-2 border-l-4 border-l-primary bg-sidebar hover:bg-sidebar !w-[65px]' : ''}
                                                ${state == "collapsed" ? '' : ''}
                                            `}
                                            onClick={()=>{setActiveSidebar(item.key)}}
                                            style={{borderRadius:0}}
                                        >
                                        <item.icon 
                                        className={`${item.active? 'text-primary': ''}`}
                                        style={{
                                            height : "25px !important",
                                            width : "25px !important",
                                            borderLeft : "10px !important"
                                        }}/>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className='flex items-center justify-center'>
               <AppUser/>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppMainSidebar