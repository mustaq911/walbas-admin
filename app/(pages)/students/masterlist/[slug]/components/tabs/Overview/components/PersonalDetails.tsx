import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, MessageSquare, PenSquare, Phone } from "lucide-react"
import { Student } from "@/types/student"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface PersonalDetailsProps {
    student: Student
}

export default function PersonalDetails({ student }: PersonalDetailsProps) {
    const getInitials = (name: string) => {
        const names = name.split(" ")
        if (names.length >= 2) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        }
        return name[0].toUpperCase()
    }

    const badges = [
        { label: "Education, Health and Care Plan", color: "bg-red-100 text-red-700" },
        { label: "EAL", color: "bg-orange-100 text-orange-700" },
        { label: "Gifted", color: "bg-yellow-100 text-yellow-700" },
        { label: "Disadvantaged", color: "bg-green-100 text-green-700" },
    ]
    return (
        <>
            <Card className="w-full rounded-md shadow-sm p-4">
                <div className="flex justify-end mb-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="h-3 w-3" />
                    </Button>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 my-4">
                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto ml-auto">
                        {/* Avatar Container */}
                        <div className="flex items-center justify-center w-full sm:w-auto">
                            <Avatar className="w-24 h-24 rounded-full shadow-sm">
                                <AvatarFallback className="bg-blue-500 text-white text-lg flex items-center justify-center">
                                    {getInitials(student.name)}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Student Info Container */}
                        <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                            <h1 className="text-base font-semibold text-gray-800">{student.name}</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-[#A990FF] text-md">{student.section}</span>
                                <Button variant="ghost" size="icon" className="h-4 w-4 text-[#A990FF]">
                                    <PenSquare className="h-3 w-3" />
                                </Button>
                            </div>
                            <div className="text-gray-600 text-md mt-1 text-center sm:text-left">{student.address}</div>
                            <div className="text-gray-600 text-md mt-1">Student No: {student.studentNumber}</div>
                            <div className="flex gap-2 mt-2">
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-[#E0DFF7] hover:bg-[#D1D0F0]">
                                    <MessageSquare className="h-3 w-3 text-gray-700" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-[#E0DFF7] hover:bg-[#D1D0F0]">
                                    <Phone className="h-3 w-3 text-gray-700" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-[180px_1fr] gap-y-2 text-sm mt-4 sm:mt-0 w-full sm:w-auto mr-auto">
                        <div className="text-right font-medium text-gray-500 pr-4">Date of Birth</div>
                        <div>{student.birthdate}</div>

                        <div className="text-right font-medium text-gray-500 pr-4">Gender</div>
                        <div>{student.gender}</div>

                        <div className="text-right font-medium text-gray-500 pr-4">Ethnicity</div>
                        <div>{student.ethnicity}</div>

                        <div className="text-right font-medium text-gray-500 pr-4">Nationality</div>
                        <div>{student.nationality}</div>

                        <div className="text-right font-medium text-gray-500 pr-4">Religion</div>
                        <div>{student.religion}</div>
                    </div>
                </div>

                {/* Status Badges with ScrollArea */}
                <div className="mt-3 border-t pt-2">
                    <ScrollArea className="w-full whitespace-nowrap rounded-md">
                        <div className="flex w-max space-x-2 py-1">
                            {badges.map((badge, index) => (
                                <div
                                    key={index}
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${badge.color}`}
                                >
                                    {badge.label}
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </Card>
        </>
    )
}