import React from 'react'

import { SchoolMenuItem } from '@/constants/menu-items/school-menu-item'
import SecondarySidebar from './secondary-sidebar';

const SchoolSidebar = () => {

    const menuItems = SchoolMenuItem();
    return (
        <SecondarySidebar
            menuItems={menuItems}
            title='School'
            description="Manage school related modules here"
        ></SecondarySidebar>
    )
}

export default SchoolSidebar