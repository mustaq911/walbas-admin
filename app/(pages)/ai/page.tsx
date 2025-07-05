
"use client"

import AppContent from '@/components/admin/content/app-content'
import { Input } from '@/components/ui/input';
import React from 'react'


export default function AiPage() {
    const [keyword, setKeyword] = React.useState('');
    return (
        <AppContent title="New Conversation">
            <div className="border rounded-lg h-[70dvh] p-3">
                <div className="h-[60dvh]">
                    
                </div>
                <div className="h-[10dvh] flex items-center justify-center">
                    <Input
                        type="text"
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                        }}
                        placeholder='Ask anything...'
                        className='w-full xl:max-w-sm text-sm mb-2 rounded-full' 
                    />
                    
                </div>
            </div>
        </AppContent>
    )
}

