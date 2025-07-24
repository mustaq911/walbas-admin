import { Users, LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';


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


export function UserMenuItem(): Group[] {
    const pathname = usePathname();

    const menuList = [
        {
            groupLabel: "",
             menus: [
                {
                    href: "/users",
                    label: "Manage User",
                    icon: Users,
                    active: pathname == "/users",
                    submenus: [
                      
                    ]
                },
            ]
        },

    ]
    return menuList;
}

