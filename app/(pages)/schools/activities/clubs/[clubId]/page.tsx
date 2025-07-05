import React from 'react'

import AppContent from '@/components/admin/content/app-content'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClubParticipant from './(tabs)/participant'
import ClubSession from './(tabs)/session'
import ClubLeader from './(tabs)/leader'


export default function ViewClubPage() {
    return (
        <AppContent title="View Club">
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 xl:col-span-4">
                    <Card className='mb-3'>
                        <CardHeader>
                            <CardTitle>Club Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                                <span className='text-lg font-bold'>Art Club</span>
                                <span>Weekly Art Catch up for young artist</span>
                            </div>
                            <Table className='mt-3'>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Pupils Eligible</TableCell>
                                        <TableCell>Year 8, Year 9, Year 10, Year 11</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Max Participants</TableCell>
                                        <TableCell>None</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Consent Required</TableCell>
                                        <TableCell>No</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Free Club</TableCell>
                                        <TableCell>Yes</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className='mb-3'>
                        <CardHeader>
                            <CardTitle>Accounting Details</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table className=''>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Customer Account Type</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Accounting Code</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-12 xl:col-span-8">
                    <Tabs defaultValue="leader">
                        <TabsList>
                            <TabsTrigger value="leader">Leaders</TabsTrigger>
                            <TabsTrigger value="participant">Participants</TabsTrigger>
                            <TabsTrigger value="session">Sessions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="leader">
                            <ClubLeader/>
                        </TabsContent>
                        <TabsContent value="participant">
                            <ClubParticipant/>
                        </TabsContent>
                        <TabsContent value="session">
                            <ClubSession/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppContent>
    )
}
