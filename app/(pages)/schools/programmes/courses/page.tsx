import AppContent from "@/components/admin/content/app-content";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react";

export default function ProgrammesPage(){
    return(
        <AppContent title="Courses">
            <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Course Module</AlertTitle>
            <AlertDescription>
                This is a redirect page student/enrollment/courses
            </AlertDescription>
            </Alert>
        </AppContent>
    )
}