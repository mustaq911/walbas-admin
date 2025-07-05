"use client"

import AppContent from "@/components/admin/content/app-content"
import { Plus, Search, } from "lucide-react";
import { Input } from "@/components/ui/input";
import StudentFilterSheet from "./StudentFilterSheet";
import AppModal from "@/components/modal/app-modal";
import { Button } from "@/components/ui/button";
import StudenList from "./StudenList";
import { students } from "@/constants/students/students";
import CreateStudentForm from "./CreateStudentForm";
import useStudent from "@/hooks/students/use-student";

export default function StudentMasterlistPage() {
    const { searchStudent, setSearchStudent, openModal, setOpenModal } = useStudent()

    // const query = { ...useDatatableSet("dt_users") };
    // const { data: users, isFetching } =  useQuery({
    //     queryKey: ['users',  { query }],
    //     queryFn: async () => {
    //         const response = await userApi.get(query);
    //         return response.data.data;
    //     }  
    // });
    return (
        <AppContent title="Masterlist">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search students..."
                            className="pl-8 w-full"
                            value={searchStudent || ""}
                            onChange={(e) => setSearchStudent(e.target.value)}
                        />
                    </div>
                    <StudentFilterSheet />
                </div>
                <AppModal
                    title="Add Student"
                    description="Student Details"
                    open={openModal}
                    setOpen={setOpenModal}
                >
                    <CreateStudentForm />
                </AppModal>

                <Button className="w-full sm:w-auto" onClick={() => setOpenModal(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Student
                </Button>
            </div>
            <StudenList searchStudent={searchStudent} students={students} />
        </AppContent>
    )
}

