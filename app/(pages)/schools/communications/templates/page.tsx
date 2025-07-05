import AppContent from "@/components/admin/content/app-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmailTemplateTab from "./(tabs)/email";


export default function TemplatePAge(){
    return(
        <AppContent title="Templates">
            <Tabs defaultValue="mailbox">
                <TabsList>
                    <TabsTrigger value="mailbox">Mailbox</TabsTrigger>
                    <TabsTrigger value="app-message">App Messages</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="sms">SMS</TabsTrigger>
                </TabsList>
                <TabsContent value="mailbox">
                    <EmailTemplateTab/>
                </TabsContent>
                <TabsContent value="email">
                    <EmailTemplateTab/>
                </TabsContent>
                <TabsContent value="sms">
                    <EmailTemplateTab/>
                </TabsContent>
                <TabsContent value="app-message">
                    <EmailTemplateTab/>
                </TabsContent>
            </Tabs>
        </AppContent>
    )
}