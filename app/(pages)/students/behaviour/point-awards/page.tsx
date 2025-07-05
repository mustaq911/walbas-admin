"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CalendarDays, Download, Filter, Plus, Search, Settings2 } from "lucide-react"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    student: z.string().min(1, "Student is required"),
    points: z.number().min(1, "Points must be at least 1").max(100, "Points cannot exceed 100"),
    scale: z.string().min(1, "Point scale is required"),
    category: z.string().min(1, "Category is required"),
    narrative: z
        .string()
        .min(10, "Narrative must be at least 10 characters")
        .max(500, "Narrative cannot exceed 500 characters"),
})

export default function PointAwards() {
    const [date, setDate] = useState<Date>()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            student: "",
            points: 1,
            scale: "",
            category: "",
            narrative: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setIsDialogOpen(false)
        form.reset()
    }

    return (
        <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight">Permanent Exclusions</h1>
                    <p className="text-muted-foreground">Manage and monitor student exclusions</p>
                </div>

            </div>
            <Card className="w-full max-w-6xl mx-auto">
                <CardHeader className="flex flex-row items-center justify-start space-y-0 pb-7">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-green-600 hover:bg-green-700">
                                <Plus className="w-4 h-4 mr-2" />
                                Record Point Award
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                                <DialogTitle>Record New Point Award</DialogTitle>
                                <DialogDescription>Award points to a student for their achievements or behavior.</DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                                    <FormField
                                        control={form.control}
                                        name="student"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Student</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a student" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="john.doe">John Doe</SelectItem>
                                                        <SelectItem value="jane.smith">Jane Smith</SelectItem>
                                                        <SelectItem value="bob.wilson">Bob Wilson</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="points"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Points</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            max={100}
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="scale"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Point Scale</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select scale" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="academic">Academic</SelectItem>
                                                            <SelectItem value="behavior">Behavior</SelectItem>
                                                            <SelectItem value="attendance">Attendance</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="homework">Homework</SelectItem>
                                                        <SelectItem value="participation">Participation</SelectItem>
                                                        <SelectItem value="achievement">Achievement</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="narrative"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Narrative</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe the reason for awarding points..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>Provide context for why these points are being awarded.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                            Award Points
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                                        <CalendarDays className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                </PopoverContent>
                            </Popover>

                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All Point Scales" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Point Scales</SelectItem>
                                    <SelectItem value="academic">Academic</SelectItem>
                                    <SelectItem value="behavior">Behavior</SelectItem>
                                    <SelectItem value="attendance">Attendance</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="homework">Homework</SelectItem>
                                    <SelectItem value="participation">Participation</SelectItem>
                                    <SelectItem value="achievement">Achievement</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button variant="outline" className="ml-auto hidden sm:flex">
                                <Filter className="w-4 h-4 mr-2" />
                                Add Filter
                            </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                    Bulk Actions
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Settings2 className="w-4 h-4 mr-2" />
                                    Columns
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search awards..." className="pl-8 w-[250px]" />
                                </div>
                                <Button variant="outline" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Student</TableHead>
                                        <TableHead className="w-[150px]">Awarded</TableHead>
                                        <TableHead className="w-[200px]">Point Award Scale</TableHead>
                                        <TableHead className="w-[150px]">Category</TableHead>
                                        <TableHead className="w-[100px]">Points</TableHead>
                                        <TableHead>Narrative</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No point awards during the date range specified.
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">Showing 0 results</div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" disabled>
                                    Previous
                                </Button>
                                <Badge variant="secondary">1</Badge>
                                <Button variant="outline" size="sm" disabled>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>

    )
}

