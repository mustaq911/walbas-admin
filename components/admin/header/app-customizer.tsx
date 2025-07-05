"use client"

import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Monitor, Moon, PaintBucket, Settings,  Sun } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { HexColorInput, HexColorPicker } from "react-colorful";
import { useThemeStore } from '@/hooks/use-theme-store'

const AppCustomizer = () => {
    
    const {theme, setTheme} = useThemeStore();
    const [color, setColor] = useState( theme ?? "#cccccc");
    const handleColorChange = (newColor: string) => {
        setColor(newColor);
        setTheme(newColor)
    
    };
    
    return (
        <Sheet>
            <SheetTrigger className='ml-auto border rounded-lg p-2 hover:bg-primary hover:text-white'>
                <Settings className='h-4 w-4' size={4}/>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Template Customizer</SheetTitle>
                </SheetHeader>
            
                <div className='mt-4'>
                    <Badge>Theming</Badge><br />
                    <div className='mb-4'>
                        <span className='text-sm'>Primary Color</span>
                        <div className='gap-2 flex'>
                            <Button className="p-2 h-[40px] w-[40px] rounded-xl " style={{backgroundColor: "#1111c9"}}
                            onClick={()=>{
                                setTheme("#1111c9")
                            }}>{" "}</Button>
                            <Button className="p-2 h-[40px] w-[40px] rounded-xl hover:bg-emerald-600  bg-emerald-500"
                            onClick={()=>{
                                setTheme("#10B981")
                            }}>{" "}</Button>
                            <Button className="p-2 h-[40px] w-[40px] rounded-xl hover:bg-amber-600  bg-amber-500"
                            onClick={()=>{
                                setTheme("#F59E0B")
                            }}>{" "}</Button>
                            <Button className="p-2 h-[40px] w-[40px] rounded-xl hover:bg-violet-600  bg-violet-500"
                            onClick={()=>{
                                setTheme("#8B5CF6")
                            }}>{" "}</Button>
                            <Button className="p-2 h-[40px] w-[40px] rounded-xl hover:bg-rose-600  bg-rose-500"
                            onClick={()=>{
                                setTheme("#F43F5E")
                            }}>{" "}</Button>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="p-2 h-[40px] w-[40px] rounded-xl ml-auto">
                                        <PaintBucket/> {""}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='me-5'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <HexColorPicker color={color} onChange={handleColorChange} style={{
                                            height: "17dvh"
                                        }}/>
                                        <div className="text-xs text-start flex flex-col mt-3">
                                            Hex Color 
                                            <HexColorInput color={color} onChange={handleColorChange} className="border p-1 text-sm rounded text-center" />
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                           
                        </div>  
                    </div>
                    <div className="mb-4">
                        <span className='text-sm'>Theme</span>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                                <div className="border rounded-lg p-4 flex items-center justify-center">
                                    <Sun/>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="border rounded-lg p-4 flex items-center justify-center">
                                    <Moon/>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="border rounded-lg p-4 flex items-center justify-center">
                                    <Monitor/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default AppCustomizer