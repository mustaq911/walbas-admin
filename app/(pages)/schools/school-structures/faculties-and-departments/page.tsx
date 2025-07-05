import AppContent from "@/components/admin/content/app-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FacultyTab from "./(tabs)/faculty";
import DepartmentTab from "./(tabs)/department";

export default function FacultyAndDepartmentPage(){
    return(
        <AppContent title="Faculty and Departments">
            <Tabs defaultValue="faculties">
                <TabsList>
                    <TabsTrigger value="faculties">Faculties</TabsTrigger>
                    <TabsTrigger value="departments">Departments</TabsTrigger>
                </TabsList>
                <TabsContent value="faculties">
                    <FacultyTab/>
                </TabsContent>
                <TabsContent value="departments">
                    <DepartmentTab/>
                </TabsContent>
            </Tabs>
        </AppContent>
    )
}