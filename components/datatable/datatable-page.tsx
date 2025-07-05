
import { Button } from '@/components/ui/button';
import useDatatableSet from '@/hooks/use-datatable-set';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

interface DatatablePageProps {
    tableId: string;
    currentPage: number;
    lastPage: number;
}

const DatatablePage = ({ currentPage, lastPage, tableId }: DatatablePageProps) => {
    
    const { page, setPage } = useDatatableSet(tableId);


    return (
        <div className='flex xl:flex-row flex-col xl:gap-2 justify-end text-end xl:ml-0 ml-auto'>
            <small className='mt-3'>Page {currentPage} of {lastPage} </small>
            <div>
                <Button variant="outline" size="icon" className='me-1' 
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                >
                    <ChevronFirst className='h-4 w-4'/>
                </Button>
                <Button variant="outline" size="icon" className='me-1' 
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    <ChevronLeft className='h-4 w-4'/>
                </Button>
                <Button variant="outline" size="icon" className='me-1' 
                    onClick={() => setPage(page + 1)}
                    disabled={page === lastPage}
                >
                    <ChevronRight className='h-4 w-4'/>
                </Button>
                <Button variant="outline" size="icon" 
                    onClick={() => setPage(lastPage)}
                    disabled={page === lastPage}
                >
                    <ChevronLast className='h-4 w-4'/>
                </Button>
            </div>
        </div>
    )
}

export default DatatablePage
