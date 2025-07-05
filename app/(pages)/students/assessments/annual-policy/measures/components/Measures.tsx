"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight, Plus } from "lucide-react"

export default function Measures() {
    const [open, setOpen] = useState(false)

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-end items-center mb-6">
        
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Academic Year</span>
                        <Select defaultValue="2024/2025">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2024/2025">2024/2025</SelectItem>
                                <SelectItem value="2023/2024">2023/2024</SelectItem>
                                <SelectItem value="2022/2023">2022/2023</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                New Measure
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Create New Measure</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="measure-name">Measure name</Label>
                                        <Input id="measure-name" placeholder="Enter measure name" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Key measure?</Label>
                                        <RadioGroup defaultValue="no" className="flex gap-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="yes" id="yes" />
                                                <Label htmlFor="yes">Yes</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="no" id="no" />
                                                <Label htmlFor="no">No</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Measure Rules</h4>

                                    <div className="space-y-2">
                                        <Label>This measure considers a student</Label>
                                        <RadioGroup defaultValue="grade" className="flex gap-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="grade" id="grade" />
                                                <Label htmlFor="grade">Grade</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="target" id="target" />
                                                <Label htmlFor="target">Target</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>in all the assessments</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select assessments" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ks3">KS3 Assessments</SelectItem>
                                                <SelectItem value="ks4">KS4 Assessments</SelectItem>
                                                <SelectItem value="all">All Assessments</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>and in one of these assessments</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select assessments" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="english">English</SelectItem>
                                                <SelectItem value="maths">Mathematics</SelectItem>
                                                <SelectItem value="science">Science</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>and an upward trend is</Label>
                                        <RadioGroup defaultValue="positive" className="flex gap-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="positive" id="positive" />
                                                <Label htmlFor="positive">Positive</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="negative" id="negative" />
                                                <Label htmlFor="negative">Negative</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button variant="outline" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => setOpen(false)}>Create measure</Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80%]">Measure</TableHead>
                            <TableHead className="text-right">Rules</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {measures.map((measure, index) => (
                            <TableRow key={index} className="group cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">{measure.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="secondary" className="bg-muted">
                                        {measure.rules} rule{measure.rules !== 1 && "s"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

const measures = [
    { name: "KS4 Maths 4 or above", rules: 1 },
    { name: "KS4 Maths 5 or above", rules: 1 },
    { name: "KS4 Maths > 4", rules: 1 },
    { name: "English Lit and Lang 4 and above", rules: 1 },
    { name: "KS3 RE (On Track)", rules: 1 },
    { name: "KS3 RE (Below Track)", rules: 1 },
    { name: "KS3 RE (Above Track)", rules: 1 },
    { name: "English 9-4 JF", rules: 1 },
    { name: "English 9-4 ST", rules: 1 },
    { name: "English WAG 9-4 JH", rules: 1 },
    { name: "English 9-4 MZ", rules: 1 },
    { name: "English 9-4 FH", rules: 1 },
    { name: "ABA English Working at", rules: 1 },
    { name: "HS English", rules: 1 },
    { name: "LRW English 9-4 Mock", rules: 0 },
    { name: "English WAG 9-5 JH", rules: 1 },
]

