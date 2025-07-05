"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function MarksheetSettings() {
    const [isOpen, setIsOpen] = useState(true)
    const [contextualInfo, setContextualInfo] = useState([
        "Course",
        "Attendance",
        "Pupil Premium Eligible",
        "SEN Status",
        "Disadvantaged",
    ])
    const [newItemName, setNewItemName] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleAddItem = () => {
        if (newItemName.trim() !== "") {
            setContextualInfo([...contextualInfo, newItemName.trim()])
            setNewItemName("")
            setIsDialogOpen(false)
        }
    }

    return (
        <div className="w-full min-h-screen bg-background">
            <div className="container mx-auto p-6">


                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Information Display Settings</CardTitle>
                            <CardDescription>Manage contextual information and assessment columns</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                                <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                                    <h3 className="text-base font-medium">Contextual Information to Show</h3>
                                    <Plus className="h-4 w-4" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <Separator className="my-4" />
                                    <div className="space-y-4">
                                        {contextualInfo.map((item) => (
                                            <div key={item} className="flex items-center justify-between">
                                                <Label htmlFor={item} className="font-medium">
                                                    {item}
                                                </Label>
                                                <Switch id={item} />
                                            </div>
                                        ))}
                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" className="mt-2">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add another
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Add New Contextual Information</DialogTitle>
                                                    <DialogDescription>
                                                        Enter the name of the new contextual information you like to add.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Name
                                                        </Label>
                                                        <Input
                                                            id="name"
                                                            value={newItemName}
                                                            onChange={(e) => setNewItemName(e.target.value)}
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" onClick={handleAddItem}>
                                                        Add Item
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>

                            <Separator />

                            <Collapsible>
                                <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                                    <h3 className="text-base font-medium">Assessment Columns to Show</h3>
                                    <Plus className="h-4 w-4" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <Separator className="my-4" />
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="adhoc" className="font-medium">
                                                Ad-hoc assessment mark
                                            </Label>
                                            <Switch id="adhoc" />
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add another
                                        </Button>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Column Management</CardTitle>
                            <CardDescription>Configure columns to hide or lock</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-base font-medium mb-4">Columns to Hide</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 xl:grid-cols-[1fr,auto] gap-4">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select columns" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="column1">Column 1</SelectItem>
                                                <SelectItem value="column2">Column 2</SelectItem>
                                                <SelectItem value="column3">Column 3</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button className="bg-primary whitespace-nowrap">Add column(s)</Button>
                                    </div>
                                    <Card className="bg-muted/50">
                                        <CardContent className="p-3 min-h-[100px] flex items-center justify-center">
                                            <p className="text-sm text-muted-foreground text-center">No columns selected to hide</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-base font-medium mb-4">Columns to Lock</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 xl:grid-cols-[1fr,auto] gap-4">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select columns" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="column1">Column 1</SelectItem>
                                                <SelectItem value="column2">Column 2</SelectItem>
                                                <SelectItem value="column3">Column 3</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button className="bg-primary whitespace-nowrap">Add column(s)</Button>
                                    </div>
                                    <Card className="bg-muted/50">
                                        <CardContent className="p-3 min-h-[100px] flex items-center justify-center">
                                            <p className="text-sm text-muted-foreground text-center">No columns selected to lock</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex items-center justify-end my-6">
                    <div className="flex gap-4">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save changes</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

