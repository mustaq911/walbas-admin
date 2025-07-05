import { Award, BookOpenCheck, BookUser, ClipboardPlus, Combine, FileChartLine, FileHeart, FilePen, LucideIcon, Notebook, Pen, Star, UserCheck, Users2 } from 'lucide-react';
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


export function StudentMenuItem(): Group[] {
    const pathname = usePathname();

    const menuList = [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/students",
                    label: "Students",
                    icon: BookUser,
                    active: [
                        "/students/masterlist",
                        "/students/applicants",
                        "/students/consents",
                        "/students/profile-pictures",
                    ].some((path) => pathname.includes(path)),
                    submenus: [
                        {
                            href: "/students/masterlist",
                            label: "Masterlist",
                            active: pathname.includes("/students/masterlist"),
                        },
                        {
                            href: "/students/applicants",
                            label: "Applicants",
                            active: pathname.includes("/students/applicants"),
                        },
                        {
                            href: "/students/consents",
                            label: "Consents",
                            active: pathname.includes("/students/consents"),
                        },
                        {
                            href: "/students/profile-pictures",
                            label: "Profile Pictures",
                            active: pathname.includes("/students/profile-pictures"),
                        },
                    ]
                },
                {
                    href: "/students/assessments",
                    label: "Assessments",
                    icon: Pen,
                    active: pathname.includes("/students/assessments"),
                    submenus: [
                        {
                            href: "/students/assessments/formative-tracking",
                            label: "Formative Tracking",
                            active: pathname.includes("/students/assessments/formative-tracking"),
                        },
                        {
                            href: "/students/assessments/summative-tracking",
                            label: "Summative Tracking",
                            active: pathname.includes("/students/assessments/summative-tracking"),
                        },
                        {
                            href: "/students/assessments/assessment-framework",
                            label: "Frameworks",
                            active: pathname.includes("/students/assessments/assessment-framework"),
                        },
                        {
                            href: "/students/assessments/annual-policy",
                            label: "Annual Policy",
                            active: pathname.includes("/students/assessments/annual-policy"),
                        },
                    ]
                },
                {
                    href: "#",
                    label: "Assignments",
                    icon: Notebook,
                    active: pathname.includes("#"),
                    submenus: []
                },
                {
                    href: "/students/attendance",
                    label: "Attendance",
                    icon: UserCheck,
                    active: pathname.includes("/students/attendance"),
                    submenus: [
                        {
                            href: "/students/attendance/registers",
                            label: "Register",
                            active: pathname.includes("/students/attendance/registers"),
                        },
                        {
                            href: "/students/attendance/absentees",
                            label: "Absentees",
                            active: pathname.includes("/students/attendance/absentees"),
                        },
                        {
                            href: "/students/attendance/latecomers",
                            label: "Latecomers",
                            active: pathname.includes("/students/attendance/latecomers"),
                        },
                        {
                            href: "/students/attendance/statistics",
                            label: "Statistics",
                            active: pathname.includes("/students/attendance/statistics"),
                        },
                        {
                            href: "/students/attendance/reports",
                            label: "Reports",
                            active: pathname.includes("/students/attendance/reports"),
                        },
                    ]
                },
                {
                    href: "/students/behaviour",
                    label: "Behaviour",
                    icon: Award,
                    active: pathname.includes("/students/behaviour"),
                    submenus: [
                        {
                            href: "/students/behaviour/incidents",
                            label: "Incidents",
                            active: pathname.includes("/students/behaviour/incidents"),
                        },
                        {
                            href: "/students/behaviour/detention",
                            label: "Detentions",
                            active: pathname.includes("/students/behaviour/detention"),
                        },
                        {
                            href: "/students/behaviour/exclusions",
                            label: "Internal Exclusions",
                            active: pathname.includes("/students/behaviour/internal-exclusions"),
                        },
                        {
                            href: "/students/behaviour/suspensions",
                            label: "Suspensions",
                            active: pathname.includes("/students/behaviour/suspensions"),
                        },
                        {
                            href: "/students/behaviour/permanent-exclusions",
                            label: "Permanent Exclusions",
                            active: pathname.includes("/students/behaviour/permanent-exclusions"),
                        },
                        {
                            href: "/students/behaviour/point-awards",
                            label: "Point Awards",
                            active: pathname.includes("/students/behaviour/point-awards"),
                        },
                        {
                            href: "/students/behaviour/settings",
                            label: "Behaviour Settings",
                            active: pathname.includes("/students/behaviour/settings"),
                        },
                    ]
                },
                {
                    href: "/students/gifted-talented",
                    label: "Gifted and Talented",
                    icon: Star,
                    active: pathname.includes("/students/gifted-talented"),
                    submenus: [
                        {
                            href: "/students/gifted-talented/setup",
                            label: "Setup",
                            active: pathname.includes("/students/gifted-talented/setup"),
                        },
                    ]
                },
                {
                    href: "/students/demographic-educational",
                    label: "Educational Needs",
                    icon: FileHeart,
                    active: pathname.includes("/students/demographic-educational"),
                    submenus: [
                        {
                            href: "/students/demographic-educational/sen",
                            label: "Students with SEN",
                            active: pathname.includes("/students/demographic-educational/sen"),
                        },
                    ]
                },
                {
                    href: "/students/enrollment",
                    label: "Enrollment",
                    icon: BookOpenCheck,
                    active: pathname.includes("/students/enrollment"),
                    submenus: [
                        {
                            href: "/students/enrollment/pastoral",
                            label: "Pastoral",
                            active: pathname.includes("/students/enrollment/pastoral"),
                        },
                        {
                            href: "/students/enrollment/academic",
                            label: "Academic",
                            active: pathname.includes("/students/enrollment/academic"),
                        },
                        {
                            href: "/students/enrollment/adhoc",
                            label: "Ad Hoc",
                            active: pathname.includes("/students/enrollment/adhoc"),
                        },
                    ]
                },
                {
                    href: "/students/examinations",
                    label: "Examination",
                    icon: FilePen,
                    active: pathname.includes("/students/examinations"),
                    submenus: []
                },
                {
                    href: "/students/interventions",
                    label: "Interventions",
                    icon: Combine,
                    active: pathname.includes("/students/interventions"),
                    submenus: [
                        {
                            href: "/students/interventions/dashboard",
                            label: "Dashboard",
                            active: pathname.includes("/students/interventions/dashboard"),
                        },
                        {
                            href: "/students/interventions/setup",
                            label: "Setup",
                            active: pathname.includes("/students/interventions/setup"),
                        },
                        {
                            href: "#",
                            label: "Costs",
                            active: pathname.includes("#"),
                        },
                        {
                            href: "#",
                            label: "Intervention Settings",
                            active: pathname.includes("#"),
                        },
                    ]
                },
                {
                    href: "/students/medical",
                    label: "Medical",
                    icon: ClipboardPlus,
                    active: pathname.includes("/students/medical"),
                    submenus: [
                        {
                            href: "/students/medical/conditions",
                            label: "Medical Conditions",
                            active: pathname.includes("/students/medical/conditions"),
                        },
                        {
                            href: "#",
                            label: "Medical Plans",
                            active: pathname.includes("#"),
                        },
                        {
                            href: "/students/medical/events",
                            label: "Medical Events",
                            active: pathname.includes("/students/medical/events"),
                        },
                        {
                            href: "#",
                            label: "Medical Institutions",
                            active: pathname.includes("#"),
                        },
                        {
                            href: "/students/medical/immunizations",
                            label: "Immunizations",
                            active: pathname.includes("/students/medical/immunizations"),
                        },
                    ]
                },
                {
                    href: "/students/guardians-parents",
                    label: "Guardians & Parents",
                    icon: Users2,
                    active: pathname.includes("/students/guardians-parents"),
                    submenus: [
                        {
                            href: "/students/guardians-parents/updates",
                            label: "Updates",
                            active: pathname.includes("/students/guardians-parents/updates"),
                        },
                        {
                            href: "/students/guardians-parents/portal-settings",
                            label: "Portal Settings",
                            active: pathname.includes("/students/guardians-parents/portal-settings"),
                        },
                        {
                            href: "/students/guardians-parents/portal-usage",
                            label: "Portal Usage",
                            active: pathname.includes("/students/guardians-parents/portal-usage"),
                        },
                    ]
                },
                {
                    href: "/students/report-cards",
                    label: "Report Cards",
                    icon: FileChartLine,
                    active: pathname.includes("/students/report-cards"),
                    submenus: [
                        {
                            href: "/students/report-cards/all-cards",
                            label: "All Cards",
                            active: pathname.includes("/students/report-cards/all-cards"),
                        },
                  
                     
                    ]
                },
            ]
        },

    ]
    return menuList;
}

