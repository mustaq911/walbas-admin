import React from 'react'

import SecondarySidebar from './secondary-sidebar';
import { ProductMenuItem } from '@/constants/menu-items/product-menu-item';

const DashboardSidebar = () => {
   const menuItems = ProductMenuItem();
    return (
        <SecondarySidebar
            menuItems={menuItems}
            title='Walbase Admin'
            description="Search Menu Items..."
        ></SecondarySidebar>
    )
}

export default DashboardSidebar