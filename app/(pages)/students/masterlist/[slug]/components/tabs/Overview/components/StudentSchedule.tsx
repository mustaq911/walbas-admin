"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, GraduationCap } from "lucide-react"

const classes = [
    {
        name: "Mathematics",
        day: "Monday",
        time: "9:00 AM",
        location: "Room 101",
        color: "bg-blue-100 border-blue-500 hover:bg-blue-50",
    },
    {
        name: "History",
        day: "Monday",
        time: "11:00 AM",
        location: "Room 202",
        color: "bg-emerald-100 border-emerald-500 hover:bg-emerald-50",
    },
    {
        name: "Physics",
        day: "Tuesday",
        time: "10:00 AM",
        location: "Lab 3",
        color: "bg-amber-100 border-amber-500 hover:bg-amber-50",

    },
    {
        name: "Literature",
        day: "Tuesday",
        time: "2:00 PM",
        location: "Room 305",
        color: "bg-purple-100 border-purple-500 hover:bg-purple-50",
    },
]

const daysOfWeek = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

export default function StudentScheduleCompact() {
    const [selectedDay, setSelectedDay] = useState("All")

    const filteredClasses = selectedDay === "All" ? classes : classes.filter((cls) => cls.day === selectedDay)

    return (
        <Card className="w-full shadow-md">
            <CardHeader className="pb-2 border-b">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg font-semibold">Subjects</CardTitle>
                    </div>
                    <Select onValueChange={setSelectedDay} defaultValue={selectedDay}>
                        <SelectTrigger className="w-[120px] h-8 text-sm">
                            <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                            {daysOfWeek.map((day) => (
                                <SelectItem key={day} value={day}>
                                    {day}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="space-y-3">
                    {filteredClasses.map((cls, index) => (
                        <div key={index} className={`rounded-lg border-l-4 shadow-sm ${cls.color} transition-all duration-200`}>
                            <div className="p-3">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
            
                                            <h3 className="font-semibold text-sm">{cls.name}</h3>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center text-xs text-gray-600">
                                                <Clock className="w-3.5 h-3.5 mr-1" />
                                                {cls.time}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-600">
                                                <MapPin className="w-3.5 h-3.5 mr-1" />
                                                {cls.location}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="text-xs font-medium">
                                        {cls.day}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

