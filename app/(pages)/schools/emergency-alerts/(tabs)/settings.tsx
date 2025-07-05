import AppModal from '@/components/modal/app-modal'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Pen } from 'lucide-react'
import React from 'react'

const SettingsTab = () => {
    return (
        <div className="grid grid-cols-12  gap-2">
            <div className="xl:col-span-3 col-span-12">
                <Card>
                    <CardHeader>
                        <div className="flex">
                            <div>
                                <CardTitle>Method of Alerting</CardTitle>
                                <CardDescription>Email and Notification</CardDescription>
                            </div>
                            <div className='ml-auto'>
                                <AppModal
                                    title='Edit Method of Alerting'
                                    button={
                                        <Button size="icon" variant="outline"><Pen/></Button>
                                    }
                                >
                                    <FormPlaceholder/>
                                </AppModal>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <div className="xl:col-span-3 col-span-12">
                <Card>
                    <CardHeader>
                        <div className="flex">
                            <div>
                                <CardTitle>Fallback Staff</CardTitle>
                                <CardDescription>Juan Dela Cruz</CardDescription>
                            </div>
                            <div className='ml-auto'>
                                <AppModal
                                    title='Edit Fallback Staff'
                                    button={
                                        <Button size="icon" variant="outline"><Pen/></Button>
                                    }
                                >
                                    <FormPlaceholder/>
                                </AppModal>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <div className="xl:col-span-3 col-span-12">
                <Card>
                    <CardHeader>
                        <div className="flex">
                            <div>
                                <CardTitle>Fallback Email</CardTitle>
                                <CardDescription>fallback@test.com</CardDescription>
                            </div>
                            <div className='ml-auto'>
                                <AppModal
                                    title='Edit Fallback Email'
                                    button={
                                        <Button size="icon" variant="outline"><Pen/></Button>
                                    }
                                >
                                    <FormPlaceholder/>
                                </AppModal>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <div className="xl:col-span-3 col-span-12">
                <Card>
                    <CardHeader>
                        <div className="flex">
                            <div>
                                <CardTitle>Fallback Email</CardTitle>
                                <CardDescription>fallback@test.com</CardDescription>
                            </div>
                            <div className='ml-auto'>
                                <AppModal
                                    title='Edit Fallback Email'
                                    button={
                                        <Button size="icon" variant="outline"><Pen/></Button>
                                    }
                                >
                                    <FormPlaceholder/>
                                </AppModal>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
            <div className="col-span-12">
                <Card>
                    <CardHeader>
                        <CardTitle>Emergency Alerts</CardTitle>
                        <CardDescription>List of all emergency alerts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DatatablePlaceholder/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SettingsTab
