import AppContent from "@/components/admin/content/app-content";
import TabListScroll from "@/components/other/tab-list-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StaffTab from "./(tabs)/staff";
import TeacherHourTab from "./(tabs)/teacher-hour";

export default function TimetablePage(){
    return(
        <AppContent title="Staff Timetable">
            <Tabs defaultValue="staff">
                <TabListScroll>
                    <TabsList className="mb-2">
                        <TabsTrigger value="staff">Staff Timetable</TabsTrigger>
                        <TabsTrigger value="teacher_hours">Teacher Hours</TabsTrigger>
                    </TabsList>
                </TabListScroll>
                <TabsContent value="staff">
                    <StaffTab/>
                </TabsContent>
                <TabsContent value="teacher_hours">
                    <TeacherHourTab/>
                </TabsContent>
            </Tabs>
        </AppContent>
    )
}