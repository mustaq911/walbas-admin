"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface DatatablePaginateProps {
    paginate: number;
    setPaginate: (paginate: number) => void;
}

const DatatablePaginate: React.FC<DatatablePaginateProps> = ({ paginate, setPaginate }) => {

    const handleChange = (value: string) => {
        setPaginate(Number(value));
    };

    return (
        <div className='flex flex-col xl:flex-row xl:gap-2 justify-start justify-end'>
            <small className='mt-3'>Rows per Page</small>
            <div>
                <Select onValueChange={handleChange} defaultValue={paginate.toString()}>
                    <SelectTrigger className="w-[70px]" >
                        <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default DatatablePaginate
