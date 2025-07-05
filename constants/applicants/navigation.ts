type MenuItem = {
    title: string
    href: string
    submenu?: { title: string; href: string }[]
}


export const navigation: MenuItem[] = [
    {
        title: "Current & Future",
        href: "#current-and-future",
    },

    {
        title: "Historic",
        href: "#historic",
    },

]