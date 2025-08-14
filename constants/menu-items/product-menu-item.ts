import { Layers, 
    LucideIcon,
    PlusSquare, 
    List, 
    Edit, 
    Gavel, 
    Users } from 'lucide-react';
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
                    href: "/products/list",
                    label: "Manage Product",
                    icon: Layers,
                    active: pathname.includes("/products"),
                    submenus: [
                       {
                            href : "/products/list",
                            label : "All Products",
                            icon: List,
                            active: pathname == "/products/list",
                        },
                        {
                            href : "/products/create",
                            label : "Create Product",
                            icon: PlusSquare,
                            active: pathname == "/products/create",
                        },
                        {
                            href : "/products/update",
                            label : "Edit Product",
                            icon: Edit,
                            active: pathname == "/products/update",
                        },
                        {
                            href : "/products/view",
                            label : "View Product",
                            icon: Edit,
                            active: pathname == "/products/view",
                        },
                    ]
                },
                {
                    href: "/auction",
                    label: "Manage Auction",
                    icon: Gavel,
                    active: pathname == "/auction",
                    submenus: [
                      
                    ]
                },
                {
                    href: "/users",
                    label: "Manage User",
                    icon: Users,
                    active: pathname == "/users",
                    submenus: [
                      
                    ]
                }
            ]
        },

    ]
    return menuList;
}

