
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { permissions } from '@/constants/mock-data/permissions'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { ChevronDown } from 'lucide-react'


const CheckPermissionTab = () => {
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
            <Card>
                <CardHeader>
                    <CardTitle>Permissions</CardTitle>
                    <CardDescription>List of permission allowed in the selected user</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg p-2 mb-3 flex">
                        John Doe
                        <ChevronDown className='ml-auto size-4'/>
                    </div>
                    <span className='text-xs'>{formattedPermissions?.length} permission is granted</span>
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

export default CheckPermissionTab