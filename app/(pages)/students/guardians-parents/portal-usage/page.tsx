import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, GraduationCap, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function ParentPortal() {
  return (
    <div className="px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight">Parent Portal Usage</h1>
          <p className="text-muted-foreground">Track parent engagement and portal usage statistics</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-green-600 flex items-center text-sm font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  12%
                </span>
              </div>
              <CardTitle className="text-sm font-medium">Current Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67%</div>
              <p className="text-xs text-muted-foreground mt-1">Parents logged in at least once</p>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Weekly Logins</div>
                  <div className="font-bold">245</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <UserPlus className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-red-600 flex items-center text-sm font-medium">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  3%
                </span>
              </div>
              <CardTitle className="text-sm font-medium">Future Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <p className="text-xs text-muted-foreground mt-1">Parents logged in at least once</p>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Weekly Logins</div>
                  <div className="font-bold">128</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <GraduationCap className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-green-600 flex items-center text-sm font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  8%
                </span>
              </div>
              <CardTitle className="text-sm font-medium">Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground mt-1">Parents logged in at least once</p>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-sm">Weekly Logins</div>
                  <div className="font-bold">367</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

