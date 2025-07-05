import AppContent from "@/components/admin/content/app-content";
import AppModal from "@/components/modal/app-modal";
import FormPlaceholder from "@/components/placeholder/form-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pen, } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MemberTab from "./(tabs)/members";
import LinkCourseTab from "./(tabs)/courses";
import BehaviourTab from "./(tabs)/behaviour";
import AttendanceTab from "./(tabs)/attendance";
import TabListScroll from "@/components/other/tab-list-scroll";

export default function ViewDepartmentPage(){
    return(
        <AppContent title="View Department">
            <div className="grid-cols-12 grid gap-2">
                <div className="xl:col-span-3 col-span-12">
                    <Card>
                        <CardHeader>
                            <div className="flex">
                                <div>
                                    <CardTitle className="text-lg">Science Department</CardTitle>
                                    <CardDescription>4 linked courses</CardDescription>
                                </div>
                                <div className='ml-auto'>
                                    <AppModal
                                        title='Edit Department'
                                        button={
                                            <Button size="icon" variant="outline"><Pen/></Button>
                                        }
                                    >
                                        <FormPlaceholder/>
                                    </AppModal>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
                <div className="col-span-12">
                    <Tabs defaultValue="courses">
                        <TabListScroll>
                            <TabsList className="mb-2">
                                <TabsTrigger value="courses">Courses</TabsTrigger>
                                <TabsTrigger value="members">Members</TabsTrigger>
                                <TabsTrigger value="attendance">Attendances</TabsTrigger>
                                <TabsTrigger value="behaviour">Behaviours</TabsTrigger>
                            </TabsList>
                        </TabListScroll>
                        <TabsContent value="courses">
                            <LinkCourseTab/>
                        </TabsContent>
                        <TabsContent value="members">
                            <MemberTab/>
                        </TabsContent>
                        <TabsContent value="attendance">
                            <AttendanceTab/>
                        </TabsContent>
                        <TabsContent value="behaviour">
                            <BehaviourTab/>
                        </TabsContent>
                    </Tabs>               
                </div>
            </div>
        </AppContent>
    )
}