'use Client'
import React, { ReactNode, useEffect, useState } from 'react'
import { CreateDataTable } from './datatable-create'
import { Input } from '../ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import useDatatableSet from '@/hooks/use-datatable-set'
import DatatablePaginate from './datatable-paginate'
import DatatablePage from './datatable-page'
import { ColumnDef } from '@tanstack/react-table'

interface DatatableData<T> {
    data: T[];
    total: number;
    current_page: number;
    last_page: number;
}

interface DatatableProps<T> {
    data: DatatableData<T>;
    columns: ColumnDef<T>[];
    children?: ReactNode; 
    tableId: string;
    isLoading: boolean;
}
  
const Datatable = <T,>({ data, columns, isLoading, tableId }: DatatableProps<T>) => {    

    

    const { keyword, paginate, setKeyword, setPaginate, setPage } =  useDatatableSet(tableId);
    const [search, setSearch] = useState(keyword);
    const debouncedSearch = useDebounce(search);

    useEffect(() => {
        if (debouncedSearch !== keyword) {
            setKeyword(debouncedSearch);
        }
    }, [debouncedSearch, keyword]);
     
    return (
        <>
            <CreateDataTable columns={columns} data={data?.data} isLoading={isLoading}>
                <Input 
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);  // Ensure that this sets the page to 1
                    }}
                    placeholder='Search ...'
                    className='w-full xl:max-w-xs' 
                />
            </CreateDataTable>
            <div className="grid grid-cols-12 mt-2">
                <div className="xl:col-span-6 col-span-12 text-sm">
                    {data?.total} record(s) found
                </div>
                <div className="xl:col-span-6 col-span-12 flex gap-3 xl:justify-end">
                    <DatatablePaginate paginate={paginate} setPaginate={setPaginate} />
                    <DatatablePage currentPage={data?.current_page} lastPage={data?.last_page} tableId={tableId}/>
                </div>
            </div>
       </>
    )
}

export default Datatable
