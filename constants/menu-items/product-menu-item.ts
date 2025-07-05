import { Layers, LucideIcon } from 'lucide-react';
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


export function ProductMenuItem(): Group[] {
    const pathname = usePathname();

    const menuList = [
        {
            groupLabel: "",
             menus: [
                {
                    href: "/products",
                    label: "Manage Product",
                    icon: Layers,
                    active: pathname == "/products",
                    submenus: [
                      
                    ]
                },
            ]
        },

    ]
    return menuList;
}

