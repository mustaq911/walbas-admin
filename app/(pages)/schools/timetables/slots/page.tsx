import AppContent from "@/components/admin/content/app-content";
import TabListScroll from "@/components/other/tab-list-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScheduledTab from "./(tabs)/scheduled";
import ProvisionalTab from "./(tabs)/provisional";
import SchedulingTab from "./(tabs)/scheduling";

export default function TimetableSlotPage(){
    return(
        <AppContent title="Timetable Slots">
            <Tabs defaultValue="scheduled">
                <TabListScroll>
                    <TabsList className="mb-2">
                        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                        <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                        <TabsTrigger value="provisional">Provisional</TabsTrigger>
                    </TabsList>
                </TabListScroll>
                <TabsContent value="scheduled">
                    <ScheduledTab/>
                </TabsContent>
                <TabsContent value="scheduling">
                    <SchedulingTab/>
                </TabsContent>
                <TabsContent value="provisional">
                    <ProvisionalTab/>
                </TabsContent>
            </Tabs>
        </AppContent>
    )
}