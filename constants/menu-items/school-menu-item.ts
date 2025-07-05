import { BellRing, Blocks, Book, CalendarDays, LucideIcon, Network, Phone, School, Shield, Users, Volleyball } from 'lucide-react';
import { usePathname } from 'next/navigation';


type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};
export function SchoolMenuItem(): Group[] {
    const pathname = usePathname();
    const menuList = [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/schools",
                    label: "School Details",
                    icon: School,
                    active: pathname == "/schools",
                    submenus: [
                      
                    ]
                },
                {
                    href: "#",
                    label: "Activities",
                    icon: Volleyball,
                    active: pathname.includes("/schools/activities"),
                    submenus: [
                        {
                            href : "/schools/activities/clubs",
                            label : "Clubs",
                            active: pathname.includes("/schools/activities/clubs"),
                        },
                        {
                            href : "/schools/activities/trips",
                            label : "Trips",
                            active: pathname.includes("/schools/activities/trips"),
                        }
                    ]
                },
                {
                    href: "#",
                    label: "Staff",
                    icon: Users,
                    active: pathname.includes("/schools/staffs"),
                    submenus: [
                        {
                            href : "/schools/staffs",
                            label : "Masterlist",
                            active: pathname == "/schools/staffs",
                        },
                        {
                            href : "/schools/staffs/absences",
                            label : "Absences",
                            active: pathname.includes("/schools/staffs/absences"),
                        },
                        {
                            href : "/schools/staffs/human-resources",
                            label : "Human Resources",
                            active: pathname.includes("/schools/staffs/human-resources"),
                        },
                        {
                            href : "/schools/staffs/behaviours",
                            label : "Behaviours",
                            active: pathname.includes("/schools/staffs/behaviours"),
                        },
                        {
                            href : "/schools/staffs/developments",
                            label : "Developments",
                            active: pathname.includes("/schools/staffs/developments"),
                        }
                    ]
                },
                {
                    href: "/schools/communications",
                    label: "Communications",
                    icon: Phone,
                    active: pathname.includes("/schools/communications"),
                    submenus: [
                        {
                            href : "/schools/communications/mailboxes",
                            label : "Mailbox",
                            active: pathname.includes("/schools/communications/mailboxes"),
                        },
                        {
                            href : "/schools/communications/app-messages",
                            label : "App Messages",
                            active: pathname.includes("/schools/communications/app-messages"),
                        },
                        {
                            href : "/schools/communications/emails",
                            label : "Email",
                            active: pathname.includes("/schools/communications/emails"),
                        },
                        {
                            href : "/schools/communications/sms",
                            label : "SMS",
                            active: pathname.includes("/schools/communications/sms"),
                        },
                        {
                            href : "/schools/communications/templates",
                            label : "Templates",
                            active: pathname.includes("/schools/communications/templates"),
                        },
                        {
                            href : "/schools/communications/layouts",
                            label : "Layouts",
                            active: pathname.includes("/schools/communications/layouts"),
                        },
                    ]
                },
                {
                    href: "/schools/organizations",
                    label: "Organizations",
                    icon: Network,
                    active: pathname.includes("/schools/organizations"),
                    submenus: [
                        {
                            href : "/schools/organizations/companies",
                            label : "Companies",
                            active: pathname.includes("/schools/organizations/companies"),
                        },
                        {
                            href : "/schools/organizations/educational-institutions",
                            label : "Educational Institutions",
                            active: pathname.includes("/schools/organizations/educational-institutions"),
                        },
                        {
                            href : "/schools/organizations/employers",
                            label : "Employers",
                            active: pathname.includes("/schools/organizations/employers"),
                        },
                        {
                            href : "/schools/organizations/universities",
                            label : "Universities",
                            active: pathname.includes("/schools/organizations/universities"),
                        }
                    ]
                },
                {
                    href: "/schools/emergency-alerts",
                    label: "Emergency Alerts",
                    icon: BellRing,
                    active: pathname.includes("/schools/emergency-alerts"),
                    submenus: []
                },
                // {
                //     href: "/schools/meals",
                //     label: "Meals",
                //     icon: Beef,
                //     active: pathname.includes("/schools/meals"),
                //     submenus: [
                //         {
                //             href : "/schools/meals/sittings",
                //             label : "Sittings",
                //             active: pathname.includes("/schools/meals/sittings"),
                //         },
                //         {
                //             href : "/schools/meals/balances",
                //             label : "Balances",
                //             active: pathname.includes("/schools/meals/balances"),
                //         },
                //         {
                //             href : "/schools/meals/dietary-requirements",
                //             label : "Dietary Requirements",
                //             active: pathname.includes("/schools/meals/dietary-requirements"),
                //         },
                //         {
                //             href : "/schools/meals/reports",
                //             label : "Reports",
                //             active: pathname.includes("/schools/meals/reports"),
                //         },
                //         {
                //             href : "/schools/meals/settings",
                //             label : "Settings",
                //             active: pathname.includes("/schools/meals/settings"),
                //         },
                //     ]
                // },
                {
                    href: "/schools/programmes",
                    label: "Programmes",
                    icon: Book,
                    active: pathname.includes("/schools/programmes"),
                    submenus: [
                        {
                            href : "/schools/programmes/courses",
                            label : "Courses",
                            active: pathname.includes("/schools/programmes/courses"),
                        },
                        {
                            href : "/schools/programmes/lesson-settings",
                            label : "Lesson Settings",
                            active: pathname.includes("/schools/programmes/lesson-settings"),
                        },
                    ]
                },
                {
                    href: "/schools/school-structures",
                    label: "School Structure",
                    icon: Blocks,
                    active: pathname.includes("/schools/school-structures"),
                    submenus: [
                        {
                            href : "/schools/school-structures/academic-years",
                            label : "Academic Years",
                            active: pathname.includes("/schools/school-structures/academic-years"),
                        },
                        {
                            href : "/schools/school-structures/faculties-and-departments",
                            label : "Faculties and Departments",
                            active: pathname.includes("/schools/school-structures/faculties-and-departments"),
                        },
                        {
                            href : "/schools/school-structures/school-years",
                            label : "School Years",
                            active: pathname.includes("/schools/school-structures/school-years"),
                        },
                        {
                            href : "/schools/school-structures/working-days",
                            label : "Working Days",
                            active: pathname.includes("/schools/school-structures/working-days"),
                        },
                    ]
                },
                {
                    href: "/schools/timetables",
                    label: "Timetable",
                    icon: CalendarDays,
                    active: pathname.includes("/schools/timetables"),
                    submenus: [
                        {
                            href : "/schools/timetables/main",
                            label : "School",
                            active: pathname == "/schools/timetables/main",
                        },
                        {
                            href : "/schools/timetables/staffs",
                            label : "Staff",
                            active: pathname == "/schools/timetables/staffs",
                        },
                        {
                            href : "/schools/timetables/sites-and-rooms",
                            label : "Sites and Rooms",
                            active: pathname == "/schools/timetables/sites-and-rooms",
                        },
                        {
                            href : "/schools/timetables/students",
                            label : "Students",
                            active: pathname == "/schools/timetables/students",
                        },
                        {
                            href : "/schools/timetables/api-integrations",
                            label : "API Integrations",
                            active: pathname == "/schools/timetables/api-integrations",
                        },
                        {
                            href : "/schools/timetables/settings",
                            label : "Settings",
                            active: pathname == "/schools/timetables/settings",
                        },
                        {
                            href : "/schools/timetables/slots",
                            label : "Slots",
                            active: pathname == "/schools/timetables/slots",
                        },
                    ]
                },
                {
                    href: "/schools/users-and-security",
                    label: "Users & Security",
                    icon: Shield,
                    active: pathname.includes("/schools/users-and-security"),
                    submenus: [
                        {
                            href : "/schools/users-and-security/access-control",
                            label : "Access Control",
                            active: pathname == "/schools/users-and-security/access-control",
                        },
                        {
                            href : "/schools/users-and-security/users",
                            label : "Users",
                            active: pathname == "/schools/users-and-security/users",
                        },
                    ]
                },
            ]
        },
     
    ]
    return menuList;
}

