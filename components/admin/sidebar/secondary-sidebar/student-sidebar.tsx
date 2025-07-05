import React from 'react'

import SecondarySidebar from './secondary-sidebar';
import { StudentMenuItem } from '@/constants/menu-items/student-menu-item';

const StudentSidebar = () => {
    const menuItems = StudentMenuItem();
    return (
        <SecondarySidebar
            menuItems={menuItems}
            title='Students'
            description="Manage students related modules here"
        ></SecondarySidebar>
    )
}

export default StudentSidebar