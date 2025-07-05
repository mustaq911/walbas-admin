"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ChevronDown, Shield,  Clock, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Contact {
    id: string
    name: string
    relationship: string
    email: string
    phone: string
    status: {
        isPrimaryGuardian: boolean
        isEmergencyContact: boolean
        canCollect: boolean
    }
    isExpanded?: boolean
}

export default function FamilyContacts() {
    const [contacts, setContacts] = useState<Contact[]>([
        {
            id: "1",
            name: "Alex Adams",
            relationship: "Father",
            email: "alex.adams@email.com",
            phone: "+1 (555) 123-4567",
            status: {
                isPrimaryGuardian: true,
                isEmergencyContact: true,
                canCollect: true,

            },
            isExpanded: true,
        },
        {
            id: "2",
            name: "Julie Adams",
            relationship: "Mother",
            email: "julie.adams@email.com",
            phone: "+1 (555) 123-4568",
            status: {
                isPrimaryGuardian: true,
                isEmergencyContact: true,
                canCollect: true,

            },
        },
        {
            id: "3",
            name: "Oliver Adams",
            relationship: "Sibling",
            email: "oliver.adams@email.com",
            phone: "+1 (555) 123-4569",
            status: {
                isPrimaryGuardian: false,
                isEmergencyContact: false,
                canCollect: true,

            },
        },
    ])

    const toggleExpand = (id: string) => {
        setContacts(
            contacts.map((contact) => (contact.id === id ? { ...contact, isExpanded: !contact.isExpanded } : contact)),
        )
    }

    return (
        <Card className="w-full mx-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-semibold text-gray-700">Family, Guardians and Contacts</CardTitle>
                <Button variant="ghost">
                    <Plus className="h-4 w-4 mr-1" color="green" />

                </Button>
            </CardHeader>
            <CardContent className="space-y-3">
                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        className={cn(
                            "rounded-lg border transition-all duration-200",
                            contact.isExpanded ? "bg-gray-50" : "hover:bg-gray-50/50",
                        )}
                    >
                        <div className="p-4 cursor-pointer" onClick={() => toggleExpand(contact.id)}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium text-gray-900">{contact.name}</h3>
                                            <Badge variant="secondary" className="font-normal">
                                                {contact.relationship}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-500">{contact.email}</p>
                                    </div>
                                </div>
                                <ChevronDown
                                    className={cn(
                                        "h-5 w-5 text-gray-400 transition-transform duration-200",
                                        !contact.isExpanded && "-rotate-90",
                                    )}
                                />
                            </div>
                        </div>


                        <div className="px-4 pb-4 pt-0">
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-3">
                                    {contact.status.isPrimaryGuardian && (
                                        <Badge variant="outline" className="bg-blue-50">
                                            <Shield className="h-3 w-3 mr-1" />
                                            Primary Guardian
                                        </Badge>
                                    )}
                                    {contact.status.isEmergencyContact && (
                                        <Badge variant="outline" className="bg-red-50">
                                            <Clock className="h-3 w-3 mr-1" />
                                            Emergency Contact
                                        </Badge>
                                    )}
                                    {contact.status.canCollect && (
                                        <Badge variant="outline" className="bg-green-50">
                                            <Check className="h-3 w-3 mr-1" />
                                            Can Collect
                                        </Badge>
                                    )}

                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="font-medium text-gray-500 text-lg">Phone:</span>
                                        <span className="text-gray-900 text-lg">{contact.phone}</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

