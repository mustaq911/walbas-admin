import AppLayout from "@/components/admin/layout";
import CustomThemeProvider from "@/providers/CustomThemeProvider";


export default function PageLayout({children}: { children: React.ReactNode; }) {
    return (
      <CustomThemeProvider>
         <AppLayout>
          {children}
      </AppLayout>
      </CustomThemeProvider>
    )
  }
  