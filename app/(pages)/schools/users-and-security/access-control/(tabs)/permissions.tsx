import AppModal from '@/components/modal/app-modal'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { permissions } from '@/constants/mock-data/permissions'

const PermissionTab = () => {
    const formattedPermissions =  permissions?.map(permission => {
        const [resource, action] = permission.split('.');
        const formattedResource = resource
            .replace(/-/g, ' ')
            .split(' ') 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        const formattedAction = action.charAt(0).toUpperCase() + action.slice(1); // Capitalize the action
        return `${formattedResource} - ${formattedAction}`;
    });
    return (
        <div>
            <div className="flex gap-2 mb-2 justify-end">
                <AppModal
                    title='Add Permission'
                    description='Add New Permission'
                    button={<Button>
                        <Plus className='size-4 me-1'/> Add Permission
                    </Button>}
                >
                    <FormPlaceholder/>
                </AppModal>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Masterlist</CardTitle>
                    <CardDescription>List of all permission</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg mb-2 border text-sm" >
                        <Command>
                            <CommandInput placeholder="Search Permission..." />
                            <CommandList className='p-4'>
                                <CommandEmpty>No results found.</CommandEmpty>
                                {formattedPermissions?.map((permission, index) => (
                                    <CommandItem key={index}>{index+1}. {permission}</CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PermissionTab