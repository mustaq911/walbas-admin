import AppContent from "@/components/admin/content/app-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UpcomingTrip from "./(tabs)/upcoming";
import MasterlistTrip from "./(tabs)/masterlist";

export default function ClubPage(){
    return(
        <AppContent title="Trips">
            <Tabs defaultValue="upcoming">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="masterlist">Masterlist</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <UpcomingTrip/>
                </TabsContent>
                <TabsContent value="masterlist">
                    <MasterlistTrip/>
                </TabsContent>
            </Tabs>
        </AppContent>
    )
}