import AppContent from '@/components/admin/content/app-content'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import AppraisalTab from './(tabs)/appraisal'
import ObjectiveTab from './(tabs)/objective'
import ObservationTab from './(tabs)/observation'
import TrainingCourseTab from './(tabs)/training-course'


export default function StaffDevelopmentPage(){
	return (
		<AppContent title="Developments">
		    <Tabs defaultValue="appraisal" className=''>
                <div className="grid grid-cols-12 ">
                    <div className="col-span-1 justify-start items-center xl:hidden">
                        <ChevronsLeft className='mt-1'/>
                    </div>
                    <div className="xl:col-span-12 col-span-10 overflow-auto">
                        <TabsList className='mb-2'>
                            <TabsTrigger value="appraisal">Appraisals</TabsTrigger>
                            <TabsTrigger value="objective">Objectives</TabsTrigger>
                            <TabsTrigger value="observation">Observations</TabsTrigger>
                            <TabsTrigger value="training_course">Training Courses</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="col-span-1 justify-end items-center xl:hidden">
                        <ChevronsRight className='mt-1 ml-auto'/>
                    </div>
                </div>
                <TabsContent value="appraisal"><AppraisalTab/></TabsContent>
                <TabsContent value="objective"><ObjectiveTab/></TabsContent>
                <TabsContent value="observation"><ObservationTab/></TabsContent>
                <TabsContent value="training_course"><TrainingCourseTab/></TabsContent>
            </Tabs>
		</AppContent>
	)
}

