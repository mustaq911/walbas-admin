import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import React from 'react'

const DatatablePlaceholder = () => {
    return (
        <div>
            <div className="flex mb-3" >
                <div className="border rounded-lg w-[150px] p-1 pl-2 h-"> Search ...</div>
                <div className="border rounded-lg ml-auto p-1 pl-2 pr-2 h-"> View</div>
            </div>
            <div className="border h-[150px] rounded-lg mb-3">

            </div>
            <div className="flex mb-3" >
                <div className="flex text-xs ">
                    <span className='mt-1 me-2'>Rows Per Page</span> 
                    <div className="border rounded-lg p-1"> 10</div>
                </div>
                <div className="flex text-xs ml-auto">
                    <div className="border rounded-lg ml-auto p-1">
                        <ChevronsLeft className='size-4'/>
                    </div>
                    <div className="border rounded-lg ml-auto p-1">
                        <ChevronLeft className='size-4'/>
                    </div>
                    <div className="border rounded-lg ml-auto p-1">
                        <ChevronRight className='size-4'/>
                    </div>
                    <div className="border rounded-lg ml-auto p-1">
                        <ChevronsRight className='size-4'/>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default DatatablePlaceholder