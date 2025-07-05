import AppContent from "@/components/admin/content/app-content";
import AppModal from "@/components/modal/app-modal";
import FormPlaceholder from "@/components/placeholder/form-placeholder";
import { Button } from "@/components/ui/button";
import { Card,CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pen, } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LinkDepartmentTab from "./(tabs)/department";
import MemberTab from "./(tabs)/members";

export default function FacultyPage(){
    return(
        <AppContent title="View Faculty">
            <div className="grid-cols-12 grid gap-2">
                <div className="xl:col-span-3 col-span-12">
                    <Card>
                        <CardHeader>
                            <div className="flex">
                                <div>
                                    <CardTitle>Art Performance Faculty</CardTitle>
                                    <CardDescription>4 Departments Linked</CardDescription>
                                </div>
                                <div className='ml-auto'>
                                    <AppModal
                                        title='Edit Academic Year'
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
                    <Tabs defaultValue="departments">
                        <TabsList>
                            <TabsTrigger value="departments">Departments</TabsTrigger>
                            <TabsTrigger value="members">Members</TabsTrigger>
                        </TabsList>
                        <TabsContent value="members">
                            <MemberTab/>
                        </TabsContent>
                        <TabsContent value="departments">
                            <LinkDepartmentTab/>
                        </TabsContent>
                    </Tabs>               
                </div>
            </div>
        </AppContent>
    )
}