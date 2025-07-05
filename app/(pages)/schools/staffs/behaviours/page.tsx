import AppContent from '@/components/admin/content/app-content'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import NegativeIncidentTab from './(tabs)/negative-incident'
import BehaviourPointTab from './(tabs)/behaviour-point'
import PositiveIncidentTab from './(tabs)/positive-incident'

export default function StaffBehaviourPage(){
	return (
		<AppContent title="Behaviours">
		    <Tabs defaultValue="behaviour_point" className=''>
                <div className="grid grid-cols-12 ">
                    <div className="col-span-1 justify-start items-center xl:hidden">
                        <ChevronsLeft className='mt-1'/>
                    </div>
                    <div className="xl:col-span-12 col-span-10 overflow-auto">
                        <TabsList className='mb-2'>
                            <TabsTrigger value="behaviour_point">Behaviour Points</TabsTrigger>
                            <TabsTrigger value="negative_incident">Negative Incident</TabsTrigger>
                            <TabsTrigger value="positive_incident">Positive Incident</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="col-span-1 justify-end items-center xl:hidden">
                        <ChevronsRight className='mt-1 ml-auto'/>
                    </div>
                </div>
                <TabsContent value="behaviour_point"><BehaviourPointTab/></TabsContent>
                <TabsContent value="negative_incident"><NegativeIncidentTab/></TabsContent>
                <TabsContent value="positive_incident"><PositiveIncidentTab/></TabsContent>
            </Tabs>
		</AppContent>
	)
}

