"use client"

import React from 'react'
import { Button } from '../ui/button'
import { Save } from 'lucide-react'

const FormPlaceholder = () => {
    return (
        <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
                <div className="border rounded-lg h-[37px]"></div>
            </div>
            <div className="col-span-12">
                <div className="border rounded-lg h-[37px]"></div>
            </div>
            <div className="col-span-12">
                <div className="border rounded-lg h-[37px]"></div>
            </div>
            <div className="col-span-12">
                <div className="border rounded-lg h-[37px]"></div>
            </div>
            <div className="col-span-12 flex">
                <Button className='xl:w-[150px] w-full mr-auto xl:blick hidden' variant="outline">Cancel</Button>
                <Button className='xl:w-[150px] w-full ml-auto'><Save/> Save</Button>
            </div>
        </div>
    )
}

export default FormPlaceholder
