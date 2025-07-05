"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CalendarDays, Users, AlertTriangle, Clock } from "lucide-react"

// Sample data - replace with your actual data
const monthlyData = [
  { month: "Sep", suspensions: 12 },
  { month: "Oct", suspensions: 15 },
  { month: "Nov", suspensions: 8 },
  { month: "Dec", suspensions: 5 },
  { month: "Jan", suspensions: 20 },
  { month: "Feb", suspensions: 18 },
]

const topOffenders = [
  { name: "Baker Christopher", days: 131.5 },
  { name: "Collins Zach", days: 128 },
  { name: "Carter Aaliyah", days: 9 },
  { name: "Hughes Aaron", days: 6.5 },
  { name: "Clark Abigail", days: 5 },
]

const reasonsData = [
  { reason: "Challenging behavior", count: 25 },
  { reason: "Alcohol related", count: 15 },
  { reason: "Drug dealing", count: 10 },
  { reason: "Bullying", count: 8 },
  { reason: "Weapon possession", count: 5 },
]

export default function StatisticSuspension() {
  return (
    <div className="flex-1 space-y-4 p-4 md:px-8 pt-2">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-xl font-bold tracking-tight">Suspension Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">2024/2025</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>

        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Suspensions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Days</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2</div>
                <p className="text-xs text-muted-foreground">-3% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 since yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Requires immediate attention</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Suspension Trend</CardTitle>
                <CardDescription>Number of suspensions per month</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    suspensions: {
                      label: "Suspensions",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="min-h-[300px]"
                >
                  <LineChart
                    data={monthlyData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="suspensions" strokeWidth={2} activeDot={{ r: 6 }} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Offenders</CardTitle>
                <CardDescription>Students with most days excluded</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    days: {
                      label: "Days",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="min-h-[100px]"
                >
                  <BarChart
                    data={topOffenders}
                    layout="vertical"
                    margin={{
                      top: 0,
                      right: 0,
                      left: 40,
                      bottom: 0,
                    }}
                  >
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" scale="band" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="days" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Suspension Reasons</CardTitle>
                <CardDescription>Distribution of suspension reasons</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Count",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="min-h-[300px]"
                >
                  <BarChart
                    data={reasonsData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 20,
                    }}
                  >
                    <XAxis
                      dataKey="reason"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>High priority cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Multiple Suspensions</AlertTitle>
                  <AlertDescription>Baker Christopher has received 3 suspensions this month.</AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Long-term Exclusion</AlertTitle>
                  <AlertDescription>Collins Zach has been excluded for over 100 days.</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

