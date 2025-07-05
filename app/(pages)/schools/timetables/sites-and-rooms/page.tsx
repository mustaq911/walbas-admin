import AppContent from "@/components/admin/content/app-content";
import TabListScroll from "@/components/other/tab-list-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RoomTimetableTab from "./(tabs)/room-timetable";
import RoomChangesTab from "./(tabs)/room-changes";
import RoomsTab from "./(tabs)/room";
import SitesTab from "./(tabs)/site";

export default function TimetableSitesAndRoomPage(){
    return(
        <AppContent title="Sites and Rooms">
            <Tabs defaultValue="room_timetable">
                <TabListScroll>
                    <TabsList className="mb-2">
                        <TabsTrigger value="room_timetable">Room Timetable</TabsTrigger>
                        <TabsTrigger value="room_changes">Room Changes</TabsTrigger>
                        <TabsTrigger value="rooms">Rooms</TabsTrigger>
                        <TabsTrigger value="sites">Sites</TabsTrigger>
                    </TabsList>
                </TabListScroll>
                <TabsContent value="room_timetable">
                    <RoomTimetableTab/>
                </TabsContent>
                <TabsContent value="room_changes">
                    <RoomChangesTab/>
                </TabsContent>
                <TabsContent value="rooms">
                    <RoomsTab/>
                </TabsContent>
                <TabsContent value="sites">
                    <SitesTab/>
                </TabsContent>
            </Tabs>
        </AppContent>
    )
}