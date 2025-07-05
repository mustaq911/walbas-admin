import AppContent from "@/components/admin/content/app-content";
import TabListScroll from "@/components/other/tab-list-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CalendarTab from "./(tabs)/calendar";
import LessonTab from "./(tabs)/lesson";
import EventTab from "./(tabs)/event";
import ClashesTab from "./(tabs)/clashes";
import ClashingLessonTab from "./(tabs)/clashing-lesson";
import SlotExceptionTab from "./(tabs)/slot-exception";

export default function TimetablePage(){
    return(
        <AppContent title="School Timetable">
            <Tabs defaultValue="calendar">
                <TabListScroll>
                    <TabsList className="mb-2">
                        <TabsTrigger value="calendar">School Timetable</TabsTrigger>
                        <TabsTrigger value="lesson">Lesson</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                        <TabsTrigger value="clashes">Clashes</TabsTrigger>
                        <TabsTrigger value="clashing-lessons">Clashing Lessons</TabsTrigger>
                        <TabsTrigger value="slot-exception">Slot Exception</TabsTrigger>
                    </TabsList>
                </TabListScroll>
                <TabsContent value="calendar">
                    <CalendarTab/>
                </TabsContent>
                <TabsContent value="lesson">
                    <LessonTab/>
                </TabsContent>
                <TabsContent value="events">
                    <EventTab/>
                </TabsContent>
                <TabsContent value="clashes">
                    <ClashesTab/>
                </TabsContent>
                <TabsContent value="clashing-lessons">
                    <ClashingLessonTab/>
                </TabsContent>
                <TabsContent value="slot-exception">
                    <SlotExceptionTab/>
                </TabsContent>
            </Tabs>
        </AppContent>
    )
}