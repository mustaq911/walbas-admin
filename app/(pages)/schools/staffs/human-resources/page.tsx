import AppContent from '@/components/admin/content/app-content'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import AllowanceTab from './(tabs)/allowance'
import CheckTab from './(tabs)/checks'
import ContractTab from './(tabs)/contract'
import PayScaleTab from './(tabs)/pay-scale'
import PositionTab from './(tabs)/postition'

export default function StaffHumanResourcePage(){
	return (
		<AppContent title="Human Resource">
		    <Tabs defaultValue="allowance" className=''>
                <div className="grid grid-cols-12 ">
                    <div className="col-span-1 justify-start items-center xl:hidden">
                        <ChevronsLeft className='mt-1'/>
                    </div>
                    <div className="xl:col-span-12 col-span-10 overflow-auto">
                        <TabsList className='mb-2'>
                            <TabsTrigger value="allowance">Allowance</TabsTrigger>
                            <TabsTrigger value="check">Checks</TabsTrigger>
                            <TabsTrigger value="contract">Contracts</TabsTrigger>
                            <TabsTrigger value="pay_scale">Pay Scales</TabsTrigger>
                            <TabsTrigger value="position">Position</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="col-span-1 justify-end items-center xl:hidden">
                        <ChevronsRight className='mt-1 ml-auto'/>
                    </div>
                </div>
                
                <TabsContent value="allowance"><AllowanceTab/></TabsContent>
                <TabsContent value="check"><CheckTab/></TabsContent>
                <TabsContent value="contract"><ContractTab/></TabsContent>
                <TabsContent value="pay_scale"><PayScaleTab/></TabsContent>
                <TabsContent value="position"><PositionTab/></TabsContent>
            </Tabs>
		</AppContent>
	)
}

