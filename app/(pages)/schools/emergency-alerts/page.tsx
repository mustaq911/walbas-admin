import AppContent from "@/components/admin/content/app-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SettingsTab from "./(tabs)/settings";
import TypeTab from "./(tabs)/type";
import OnCallRotaTab from "./(tabs)/on-call-rota";
import TimetableTab from "./(tabs)/timetable";


export default function EmrgencyAlertSetup(){
    return(
        <AppContent title="Emergency Alert">
            <Tabs defaultValue="settings">
                <TabsList>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="type">Types</TabsTrigger>
                    <TabsTrigger value="on_call_rota">On-Call Rota</TabsTrigger>
                    <TabsTrigger value="timetable">Timetable</TabsTrigger>
                </TabsList>
                <TabsContent value="settings">
                    <SettingsTab/>
                </TabsContent>
                <TabsContent value="type">
                    <TypeTab/>
                </TabsContent>
                <TabsContent value="on_call_rota">
                    <OnCallRotaTab/>
                </TabsContent>
                <TabsContent value="timetable">
                    <TimetableTab/>
                </TabsContent>
            </Tabs>
        </AppContent>
    )
}