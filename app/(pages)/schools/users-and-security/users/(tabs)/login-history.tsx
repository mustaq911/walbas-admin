
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const LoginHistoryTab = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>User Login History</CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <DatatablePlaceholder/>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginHistoryTab