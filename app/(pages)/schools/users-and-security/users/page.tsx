import AppContent from "@/components/admin/content/app-content";
import TabListScroll from "@/components/other/tab-list-scroll";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserTab from "./(tabs)/user";
import LoginHistoryTab from "./(tabs)/login-history";
import PasswordRuleTab from "./(tabs)/password-rule";

export default function UserPage(){
    return(
        <AppContent title="Users">
            <Tabs defaultValue="users">
                <TabListScroll>
                    <TabsList className="mb-2">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="permissions">Login History</TabsTrigger>
                        <TabsTrigger value="password_rules">Password Rules</TabsTrigger>
                    </TabsList>
                </TabListScroll>
                <TabsContent value="users">
                    <UserTab/>
                </TabsContent>
                <TabsContent value="permissions">
                    <LoginHistoryTab/>
                </TabsContent>
                <TabsContent value="password_rules">
                    <PasswordRuleTab/>
                </TabsContent>
            </Tabs>
        </AppContent>
    )
}