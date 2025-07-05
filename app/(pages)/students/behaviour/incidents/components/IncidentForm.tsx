"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import {Star } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    date: z.date(),
    event: z.string(),
    time: z.string(),
    studentsInvolved: z.string(),
    behaviour: z.string(),
    assignedStaff: z.string(),
    summary: z.string(),
    staffInvolved: z.string(),
})

export default function IncidentForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            summary: "",
            time: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Log New Incident</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        Log New Behavioural Incident <Star className="h-4 w-4" />
                    </SheetTitle>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

                        <FormField
                            control={form.control}
                            name="event"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select event type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="classroom">Classroom Incident</SelectItem>
                                            <SelectItem value="playground">Playground Incident</SelectItem>
                                            <SelectItem value="hallway">Hallway Incident</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time of incident*</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="studentsInvolved"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Students involved*</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select students" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="student1">John Smith</SelectItem>
                                            <SelectItem value="student2">Jane Doe</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="behaviour"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Behaviour</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select behaviour type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="disruptive">Disruptive Behaviour</SelectItem>
                                            <SelectItem value="aggressive">Aggressive Behaviour</SelectItem>
                                            <SelectItem value="positive">Positive Behaviour</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="assignedStaff"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assign to staff member*</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select staff member" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="staff1">Jane Hunt (Head Teacher)</SelectItem>
                                            <SelectItem value="staff2">Mark Wilson (Teacher)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Incident summary</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describe the incident..." className="resize-none" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="staffInvolved"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Staff involved</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select staff involved" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="staff1">Jane Hunt (Head Teacher)</SelectItem>
                                            <SelectItem value="staff2">Mark Wilson (Teacher)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Create Incident Report
                        </Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

