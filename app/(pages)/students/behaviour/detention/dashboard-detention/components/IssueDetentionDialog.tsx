"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Info, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"

export function IssueDetentionDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">Issue Detention</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Issue detentions ★</DialogTitle>
                </DialogHeader>

                <Alert className="bg-blue-50 border-blue-100 text-blue-800">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                        Can&apos;t select a session? This means there aren&apos;t any upcoming sessions scheduled. Please ask your
                        school office team to follow{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            these instructions
                        </a>
                        .
                    </AlertDescription>
                </Alert>

                <ScrollArea className="h-[400px]">
                    <div className="grid gap-4 py-4 px-4">

                        <div className="grid gap-2">
                            <Label htmlFor="students">Students*</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select students" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student1">John Doe</SelectItem>
                                    <SelectItem value="student2">Jane Smith</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="reason">Reason for detention</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select reason" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="late">Late to class</SelectItem>
                                    <SelectItem value="behavior">Behavioral issue</SelectItem>
                                    <SelectItem value="homework">Missing homework</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="staff">Issued by staff</Label>
                            <Select defaultValue="jane-hunt">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="jane-hunt">Jane Hunt</SelectItem>
                                    <SelectItem value="other-staff">Other Staff</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="type">Detention type*</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ilu">ILU</SelectItem>
                                    <SelectItem value="reflection">Reflection</SelectItem>
                                    <SelectItem value="twilight">Twilight</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="session">Detention session</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select session" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="session1">Tue, 25 Feb 2025, 09:00 - Site 1: 219</SelectItem>
                                    <SelectItem value="session2">Tue, 25 Feb 2025, 14:30 - Site 1: 220</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input type="text" id="duration" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea id="notes" rows={4} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Attachments</Label>
                            <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <Upload className="h-8 w-8 text-gray-400" />
                                    <p className="text-sm text-gray-600">
                                        Drag or <span className="text-green-600">click to upload</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>


                <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-green-600 hover:bg-green-700">Issue detentions</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

