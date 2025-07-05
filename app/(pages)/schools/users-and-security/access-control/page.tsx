import AppContent from "@/components/admin/content/app-content";
import TabListScroll from "@/components/other/tab-list-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RolesTab from "./(tabs)/roles";
import PermissionTab from "./(tabs)/permissions";
import CheckPermissionTab from "./(tabs)/check-permission";

export default function AccessControlPage(){
    return(
        <AppContent title="Access Control">
            <Tabs defaultValue="roles">
                <TabListScroll>
                    <TabsList className="mb-2">
                        <TabsTrigger value="roles">Roles</TabsTrigger>
                        <TabsTrigger value="permissions">Permissions</TabsTrigger>
                        <TabsTrigger value="check_permissions">Check Permissions</TabsTrigger>
                    </TabsList>
                </TabListScroll>
                <TabsContent value="roles">
                    <RolesTab/>
                </TabsContent>
                <TabsContent value="permissions">
                    <PermissionTab/>
                </TabsContent>
                <TabsContent value="check_permissions">
                    <CheckPermissionTab/>
                </TabsContent>
            </Tabs>
        </AppContent>
    )
}