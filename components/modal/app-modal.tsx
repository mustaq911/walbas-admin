"use client"

import React from 'react'
 

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface AppModalProps {
    button? :  React.ReactNode;
    title : string;
    description? : string | null;
    children :  React.ReactNode;
    open?: boolean | null;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>> | null;
    width?: string | null
}

const AppModal = ({button, title, description, children, width, open, setOpen} : AppModalProps) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")
    
    if (isDesktop) {
        return (
            <Dialog open={open ?? undefined} onOpenChange={setOpen ?? undefined}>
                <DialogTrigger asChild>
                    {button}
                </DialogTrigger>
                <DialogContent className={`${width ? width : 'max-w-lg'}`}>
                    <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }
   
    // For Mobile
    return (
        <Drawer open={open ?? undefined} onOpenChange={setOpen ?? undefined}>
            <DrawerTrigger asChild>
                {button}
            </DrawerTrigger>
            <DrawerContent>
            <DrawerHeader className="text-left">
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 overflow-auto">
                {children}
            </div>
            <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default AppModal
