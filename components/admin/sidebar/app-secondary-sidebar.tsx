"use client"
import { useActiveSidebar } from '@/hooks/use-active-sidebar'
import DashboardSidebar from './secondary-sidebar/dashboard-sidebar';
import SchoolSidebar from './secondary-sidebar/school-sidebar';
import StudentSidebar from './secondary-sidebar/student-sidebar';
import ProductSidebar from './secondary-sidebar/product-sidebar';
import UserSidebar from './secondary-sidebar/user-sidebar';
import AiSidebar from './secondary-sidebar/ai-sidebar';


const AppSecondarySidebar = () => {
    const {activeSidebar} = useActiveSidebar();
    switch (activeSidebar) {
        case "dashboard":
            return (<DashboardSidebar/>)
        case "products":
            return (<ProductSidebar/>)
        case "student":
            return (<StudentSidebar/>)
        case "school":
            return (<SchoolSidebar/>)
        case "users":
            return (<UserSidebar/>)
        case "ai":
            return (<AiSidebar/>)
        default:
            return(<></>)
            break;
    }
}

export default AppSecondarySidebar