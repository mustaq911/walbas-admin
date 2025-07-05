import React from 'react'

import SecondarySidebar from './secondary-sidebar';
import { ProductMenuItem } from '@/constants/menu-items/product-menu-item';

const ProductSidebar = () => {
    const menuItems = ProductMenuItem();
    return (
        <SecondarySidebar
            menuItems={menuItems}
            title='Products'
            description="Manage products related modules here"
        ></SecondarySidebar>
    )
}

export default ProductSidebar