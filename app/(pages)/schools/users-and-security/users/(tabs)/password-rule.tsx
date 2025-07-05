import AppModal from '@/components/modal/app-modal'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import {  CircleCheck, CircleX, Pen } from 'lucide-react'
import React from 'react'

const PasswordRuleTab = () => {
    return (
        <div className='grid grid-cols-12 gap-2'>
            {/* Student */}
            <div className="col-span-12 xl:col-span-4">
                <Card>
                    <CardHeader>
                        <div className="flex">
                            <div className="flex-col">
                                <CardTitle>Student</CardTitle>
                                <CardDescription>Set password rules for students.</CardDescription>
                            </div>
                            <AppModal
                                title='Edit Student Password Rules'
                                button={
                                    <Button size="icon" className='ml-auto'><Pen/></Button>
                                }
                            >
                                <FormPlaceholder/>
                            </AppModal>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Requires Numbers</TableCell>
                                    <TableCell className='flex text-end'>
                                        <CircleCheck className='text-green-500 ml-auto'/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Requires Letters</TableCell>
                                    <TableCell className='flex text-end'>
                                        <CircleCheck className='text-green-500 ml-auto'/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Requires Mixed Case</TableCell>
                                    <TableCell className='flex text-end'>
                                        <CircleCheck className='text-green-500 ml-auto'/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Minimum Length</TableCell>
                                    <TableCell className='flex text-end'>
                                        <span className='ml-auto font-bold'>10</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Days Valid</TableCell>
                                    <TableCell className='flex text-end'>
                                        <span className='ml-auto font-bold'>180</span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            {/* Staff */}
            <div className="col-span-12 xl:col-span-4">
                <Card>
                    <CardHeader>
                        <div className="flex">
                            <div className="flex-col">
                                <CardTitle>Staff</CardTitle>
                                <CardDescription>Set password rules for staffs.</CardDescription>
                            </div>
                            <AppModal
                                title='Edit Staff Password Rules'
                                button={
                                    <Button size="icon" className='ml-auto'><Pen/></Button>
                                }
                            >
                                <FormPlaceholder/>
                            </AppModal>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Requires Numbers</TableCell>
                                    <TableCell className='flex text-end'>
                                        <CircleCheck className='text-green-500 ml-auto'/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Requires Letters</TableCell>
                                    <TableCell className='flex text-end'>
                                        <CircleCheck className='text-green-500 ml-auto'/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Requires Mixed Case</TableCell>
                                    <TableCell className='flex text-end'>
                                        <CircleCheck className='text-green-500 ml-auto'/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Minimum Length</TableCell>
                                    <TableCell className='flex text-end'>
                                        <span className='ml-auto font-bold'>10</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Days Valid</TableCell>
                                    <TableCell className='flex text-end'>
                                        <span className='ml-auto font-bold'>180</span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            {/* Parents and Guardians */}
            <div className="col-span-12 xl:col-span-4">
                <Card>
                    <CardHeader>
                        <div className="flex">
                            <div className="flex-col">
                                <CardTitle>Parents and Guardians</CardTitle>
                                <CardDescription>Set password rules for parents and guardians.</CardDescription>
                            </div>
                            <AppModal
                                title='Edit Parents and Guardians Password Rules'
                                button={
                                    <Button size="icon" className='ml-auto'><Pen/></Button>
                                }
                            >
                                <FormPlaceholder/>
                            </AppModal>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Requires Numbers</TableCell>
                                    <TableCell className='flex text-end'>
                                        <CircleCheck className='text-green-500 ml-auto'/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Requires Letters</TableCell>
                                    <TableCell className='flex text-end'>
                                        <CircleCheck className='text-green-500 ml-auto'/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Requires Mixed Case</TableCell>
                                    <TableCell className='flex text-end'>
                                        <CircleX className='text-red-500 ml-auto'/>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Minimum Length</TableCell>
                                    <TableCell className='flex text-end'>
                                        <span className='ml-auto font-bold'>10</span>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Days Valid</TableCell>
                                    <TableCell className='flex text-end'>
                                        <span className='ml-auto font-bold'>180</span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default PasswordRuleTab
