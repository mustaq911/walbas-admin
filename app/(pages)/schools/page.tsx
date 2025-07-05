"use client"

import AppContent from "@/components/admin/content/app-content"
import DatatablePlaceholder from "@/components/placeholder/datatable-placeholder"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell,  TableRow } from "@/components/ui/table"
import ImageSrc from "@/constants/image"
import { Globe, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"


export default function SchoolPage(){
    return (
        <AppContent title="School">
            <div className="grid grid-cols-12 gap-3">
                <div className="xl:col-span-4 col-span-12">
                    <Card className="mb-3 border-primary">
                        <CardHeader>
                            <CardTitle>✨ Active Subscription</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex">
                                Active Users
                                <span className="ml-auto font-bold"> 10 / 70</span>
                            </div>
                            <div className="flex">
                                Valid till
                                <span className="ml-auto font-bold"> February 01, 2026</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>Contact Details</CardTitle>
                            <CardDescription>Mobile Number, Official Email, Website and Address</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-5 gap-3">
                                <div className="col-span-2 flex items-center justify-center">
                                    <Image alt="school_logo" width={75} height={75} src={ImageSrc.logo} />
                                </div>
                                <div className="col-span-3 flex flex-col">
                                    <span className="text-xl font-bold">Acme Inc.</span>
                                    <span>AID-EP0001</span>
                                    <div className="mt-2">
                                        <Separator/>
                                    </div>
                                    <div className="flex mt-2">
                                        <Phone className="size-4 me-2"/> 7000-0007
                                    </div>
                                    <div className="flex">
                                        <Mail className="size-4 me-2"/> school@acme.inc
                                    </div>
                                    <div className="flex">
                                        <Globe className="size-4 me-2"/> www.acme.inc
                                    </div>
                                    <div className="flex">
                                        <MapPin className="size-4 me-2"/> Zone 000, Doha, Qatar
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>Educational Institution Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                               <TableBody>
                                    <TableRow>
                                        <TableCell>Establishment No.</TableCell>
                                        <TableCell>85000655</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>School Type</TableCell>
                                        <TableCell>Academies</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>School Sex Type</TableCell>
                                        <TableCell>Co-Educational</TableCell>
                                    </TableRow>
                               </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="xl:col-span-8 col-span-12">
                    <Card className="mb-3">
                        <CardHeader>
                            <CardTitle>Head Teachers</CardTitle>
                            <CardDescription>List of school head teachers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DatatablePlaceholder/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppContent>
    )
}

