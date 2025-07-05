import React from 'react'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Archive, Box, EyeOff, Folder, Forward, Inbox, Notebook, Plus, Reply, ReplyAll, Search, Send, Star, Trash,  } from "lucide-react";
import AppEditor from '../editor/app-editor';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Separator } from '../ui/separator';

const MailPlaceholder = () => {
  return (
    <div className="grid grid-cols-12 min-h-[70vh]  border rounded-lg">
        <div className="col-span-12 xl:col-span-2 border-r">
            <div className="flex flex-col p-3">
                <Button className="justify-start text-start">
                    <Inbox/> Inbox
                </Button>
                <Button variant="ghost" className="justify-start text-start">
                    <Box/> Outbox
                </Button>
                <Button variant="ghost" className="justify-start text-start">
                    <Notebook/> Drafts
                </Button>
                <Button variant="ghost" className="justify-start text-start">
                    <Send/> Sent
                </Button>
                <Button variant="ghost" className="justify-start text-start">
                    <Archive/> Archive
                </Button>
                <Separator/>
                <Button variant="ghost" className="justify-start text-start mt-1">
                    <Plus/> Add Label
                </Button>
                <Button variant="ghost" className="justify-start text-start mt-1">
                    <Folder/> Work
                </Button>
                <Button variant="ghost" className="justify-start text-start mt-1">
                    <Folder/> Announcement
                </Button>
            </div>
        </div>
        <div className="col-span-12 xl:col-span-3 border-r">
            <div className="flex flex-col p-3 gap-2">
                <div className="font-bold text-lg mb-2">Inbox</div>
                <div className="border flex rounded-lg p-2">
                    <Search className="opacity-50 size-4 me-2"/> Search
                </div>
                <div className="border rounded-lg bg-card p-2 flex flex-col">
                    <div className="flex">
                        <span className="font-bold">Renz Litan</span>
                        <span className="ml-auto text-xs text-foreground">Feb 03, 2025, 10:00 am</span>
                    </div>
                    <span className="text-xs">UI Updates</span>
                    <span className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisici ....</span>
                    <div className="mt-2">
                        <Badge>Work </Badge>
                    </div>
                </div>
                <div className="border rounded-lg bg-card p-2 flex flex-col">
                    <div className="flex">
                        <span className="font-bold">HR Admin</span>
                        <span className="ml-auto text-xs text-foreground">Feb 01, 2025, 9:30 am</span>
                    </div>
                    <span className="text-xs">Holiday</span>
                    <span className="text-xs">Lorem ipsum dolor sit amet, adipisici ....</span>
                    <div className="mt-2">
                        <Badge>Announcement </Badge>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-span-12 xl:col-span-7">
            <div className="flex border-b">
                <div className="flex p-3">
                    <Button size="icon" variant="ghost">
                        <Star className="size-4"/>
                    </Button>
                    <Button size="icon" variant="ghost">
                        <Trash className="size-4"/>
                    </Button>
                    <Button size="icon" variant="ghost">
                        <Archive className="size-4"/>
                    </Button>
                    <Button size="icon" variant="ghost">
                        <EyeOff className="size-4"/>
                    </Button>
                </div>
                <div className="flex p-3 ml-auto">
                    <Button size="icon" variant="ghost">
                        <Reply className="size-4"/>
                    </Button>
                    <Button size="icon" variant="ghost">
                        <ReplyAll className="size-4"/>
                    </Button>
                    <Button size="icon" variant="ghost">
                        <Forward className="size-4"/>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col h-[30vh] border-b p-3">
                <span>Sample Content</span> <br />
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Tenetur voluptas nostrum nihil modi cumque sapiente temporibus,
                    illo ratione ipsam pariatur numquam minus aliquid sunt! 
                    Debitis possimus corporis mollitia maiores error?
                </span>
            </div>
            <div className="flex flex-col p-3 mb-auto">
                <div className=" h-[30vh] w-full">
                    <Select>
                        <SelectTrigger className="w-[180px] mb-2">
                            <SelectValue placeholder="Load Template..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Poor Attendance</SelectItem>
                            <SelectItem value="2">Welcome Message</SelectItem>
                            <SelectItem value="3">Special Announcement</SelectItem>
                        </SelectContent>
                    </Select>
                    <AppEditor/>
                </div>
                <Button className="w-[100px] mt-3 ml-auto">
                    <Send className="size-4 me-2"/> Send
                </Button>
            </div>
        </div>
    </div>
  )
}

export default MailPlaceholder
