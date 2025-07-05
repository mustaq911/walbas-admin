
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";

export const TripColumns = [
    {
        header: "Trip",
        accessor: "trip_name",
        render: (value: string) => (
            <Button variant="link" size="sm" className="text-sm font-bold">
               <Folder/>  {value}
            </Button>
        ),
    },
    {
        header: "Date",
        accessor: "trip_date",
    },
    {
        header: "Year Group",
        accessor: "year_group",
    },
    {
        header: "Sign Up Deadline",
        accessor: "sign_up_deadline",
    },
]