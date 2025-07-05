"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const AppCrumb = () => {
  
    const pathname = usePathname();
    const pathArray =pathname.split('/').filter(path => path);
    const asPathArray = pathname.split('/').filter(path => path);
    
    const breadcrumbTitles: { [key: string]: string } = {
        "human-resources": 'Human Resource',
        "emergency-alerts": 'Emergency Alerts',
        "lesson-settings" : "Lesson Settings",
        "school-structures" : "School Structures",
        "academic-years" : "Academic Years",
        "faculties-and-departments" : "Faculties & Departments",
        "school-years" : "School Years",
        "working-days" : "Working Days",
        "ai" : "AI",
    };

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList className='text-xs'>
                    {pathArray.map((path: string, index: number) => {
                        const href = `/${asPathArray.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathArray.length - 1;
                        const title = breadcrumbTitles[path] || (isNaN(Number(path)) ? path.charAt(0).toUpperCase() + path.slice(1) : 'View');
                        
                        return(
                            <React.Fragment key={index}>
                                {!isLast ? (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href={href}>{title}</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </>
                                ) : (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{title}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                )}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default AppCrumb
