import type React from "react"
import { BarChart3, BookOpen, CheckCircle, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AssessmentDashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assessment Dashboard</h1>
            <p className="text-sm text-gray-600">DfE NC KS4 Citizenship • 23 Feb 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Jane Doe</p>
              <p className="text-xs text-gray-600">Teacher</p>
            </div>
          </div>
        </header>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 gap-4">
            <TabsTrigger value="overview" className="text-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="mark-entry" className="text-lg">
              Mark Entry
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Students"
                value="1,234"
                description="↑ 2% from last month"
                icon={<Users className="h-6 w-6" />}
                color="bg-blue-500"
              />
              <StatCard
                title="Average Score"
                value="76%"
                description="↑ 5% from last assessment"
                icon={<BarChart3 className="h-6 w-6" />}
                color="bg-green-500"
              />
              <StatCard
                title="Completion Rate"
                value="92%"
                description="↓ 1% from target"
                icon={<CheckCircle className="h-6 w-6" />}
                color="bg-yellow-500"
              />
              <StatCard
                title="Curriculum Progress"
                value="68%"
                description="On track for completion"
                icon={<BookOpen className="h-6 w-6" />}
                color="bg-purple-500"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DistributionBar label="Excellent (90-100%)" value={15} color="bg-green-500" />
                  <DistributionBar label="Good (70-89%)" value={40} color="bg-blue-500" />
                  <DistributionBar label="Average (50-69%)" value={30} color="bg-yellow-500" />
                  <DistributionBar label="Needs Improvement (0-49%)" value={15} color="bg-red-500" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Citizenship Test 1", date: "2025-02-20", score: 85 },
                      { name: "Democracy Quiz", date: "2025-02-15", score: 92 },
                      { name: "Human Rights Essay", date: "2025-02-10", score: 78 },
                      { name: "Political Systems Exam", date: "2025-02-05", score: 88 },
                    ].map((assessment) => (
                      <div key={assessment.name} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <div className="font-medium">{assessment.name}</div>
                          <div className="text-sm text-gray-600">{assessment.date}</div>
                        </div>
                        <div className="text-lg font-bold">{assessment.score}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mark-entry" className="space-y-6">
       
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  description,
  icon,
  color,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className={`rounded-full p-3 text-white ${color}`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function DistributionBar({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <Progress value={value} className={color} />
    </div>
  )
}

