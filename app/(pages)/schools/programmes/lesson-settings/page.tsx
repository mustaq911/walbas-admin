import AppContent from "@/components/admin/content/app-content";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react";

export default function LessonSettingsPage(){
    return(
        <AppContent title="Lesson Settings">
            <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Lesson Settings Module</AlertTitle>
            <AlertDescription>
                This is a redirect page student/enrollment/lesson-settings
            </AlertDescription>
            </Alert>
        </AppContent>
    )
}