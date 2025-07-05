
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import React from 'react'

interface TabListScrollProps {
    children: React.ReactNode;
}

const TabListScroll: React.FC<TabListScrollProps> = ({ children }) => {

    return (
        <div className="grid grid-cols-12 ">
            <div className="col-span-1 justify-start items-center xl:hidden">
                <ChevronsLeft className='mt-1'/>
            </div>
            <div className="xl:col-span-12 col-span-10 overflow-auto">
                {children}
            </div>
            <div className="col-span-1 justify-end items-center xl:hidden">
                <ChevronsRight className='mt-1 ml-auto'/>
            </div>
        </div>
    )
}

export default TabListScroll
