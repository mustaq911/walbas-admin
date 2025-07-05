type MenuItem = {
    title: string
    href: string
    submenu?: { title: string; href: string }[]
}


export const navigation: MenuItem[] = [
    {
        title: "Overview",
        href: "#overview",
    },
    // {
    //     title: "Profile",
    //     href: "#dashboard",
    //     submenu: [
    //         { title: "Dashboard", href: "#profile/dashboard" },
    //         { title: "Academic Notes", href: "#profile/academic-notes" },
    //         { title: "Attainment", href: "#profile/attainment" },
    //     ],
    // },
    // {
    //     title: "Attendance",
    //     href: "#attendance",
    //     submenu: [
    //         { title: "Dashboard", href: "#attendance/dashboard" },
    //         { title: "Attendance Certificate", href: "#attendance/certificate" },
    //         { title: "Marks (By Date)", href: "#attendance/marks" },
    //         { title: "Absences & Notes", href: "#attendance/absences-notes" },
    //     ],
    // },
    // {
    //     title: "Calendar",
    //     href: "#calendar",
    // },
    {
        title: "Assessments",
        href: "#assessments",
    },
    // {
    //     title: "Assignments",
    //     href: "#assignments",
    // },
    // {
    //     title: "Activities",
    //     href: "#activities",
    //     submenu: [
    //         { title: "Clubs", href: "#activities/clubs" },
    //         { title: "Trips", href: "#activities/trips" },
    //     ],
    // },
    // {
    //     title: "Meals",
    //     href: "#meals",
    // },
    // {
    //     title: "Examinations",
    //     href: "#examinations",
    //     submenu: [
    //         { title: "Candidate Profile", href: "#examinations/candidate-profile" },
    //         { title: "Statement of Entry", href: "#examinations/statement" },
    //     ],
    // },
]