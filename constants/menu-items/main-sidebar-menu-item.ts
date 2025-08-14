import { useActiveSidebar } from '@/hooks/use-active-sidebar';
import { LayoutDashboard, LucideIcon } from 'lucide-react';
// import { usePathname } from 'next/navigation';

type Menu = {
    key: string,
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon 
};

export function MainSidebarMenuItem(): Menu[] {
    // const pathname = usePathname();
    const {activeSidebar} = useActiveSidebar();
    const menuItem =  [
        {   
            key: "dashboard",
            label: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            active: activeSidebar == "dashboard",
        },
        // {   
        //     key: "products",
        //     label: "product",
        //     href: "/products",
        //     icon: Package,
        //     active: activeSidebar == "products",
        // },
        //  {   
        //     key: "users",
        //     label: "user",
        //     href: "/users",
        //     icon: Users,
        //     active: activeSidebar == "users",
        // },
        // {   
        //     key: "school",
        //     label: "School",
        //     href: "/schools",
        //     icon: School,
        //     active: activeSidebar == "school",
        // },
        // {   
        //     key: "ai",
        //     label: "AI",
        //     href: "/ai",
        //     icon: Bot,
        //     active: activeSidebar == "ai",
        // },
    ];
 
    return menuItem;
}

