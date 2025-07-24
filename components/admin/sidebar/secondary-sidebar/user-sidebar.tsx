import React from 'react'

import SecondarySidebar from './secondary-sidebar';
import { UserMenuItem } from '@/constants/menu-items/user-menu-item';

const UserSidebar = () => {
    const menuItems = UserMenuItem();
    return (
        <SecondarySidebar
            menuItems={menuItems}
            title='Users'
            description="Manage User related modules here"
        ></SecondarySidebar>
    )
}

export default UserSidebar;