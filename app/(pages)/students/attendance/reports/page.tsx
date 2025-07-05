"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { DatePickerWithRange } from "./date-range-picker"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, FileText, Printer, Table } from "lucide-react"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function AttendanceExport() {
  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Attendance Export</h1>
          <p className="text-muted-foreground mt-2">Generate attendance reports and certificates</p>
        </div>

        <Tabs defaultValue="certificates" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-4">
            <TabsTrigger value="certificates" className="gap-2">
              <FileText className="h-4 w-4" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="statutory" className="gap-2">
              <Table className="h-4 w-4" />
              Statutory
            </TabsTrigger>
            <TabsTrigger value="weekly" className="gap-2">
              <Calendar className="h-4 w-4" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="lesson" className="gap-2">
              <Printer className="h-4 w-4" />
              Lesson
            </TabsTrigger>
            <TabsTrigger value="marks" className="gap-2">
              <Download className="h-4 w-4" />
              Marks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Attendance Certificates</CardTitle>
                <CardDescription>Generate attendance certificates for multiple students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Academic Year</Label>
                    <Select defaultValue="2024">
                      <SelectTrigger>
                        <SelectValue placeholder="Select academic year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024/2025</SelectItem>
                        <SelectItem value="2023">2023/2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Student Group</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select student group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Students</SelectItem>
                        <SelectItem value="current">Current Students</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

 

                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="current" />
                      <label
                        htmlFor="current"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Only current students
                      </label>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="details" />
                      <label
                        htmlFor="details"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show student details
                      </label>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="guardian" />
                      <label
                        htmlFor="guardian"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show guardian details
                      </label>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notes" />
                      <label
                        htmlFor="notes"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show notes
                      </label>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format" defaultChecked />
                      <label
                        htmlFor="format"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Use new format
                      </label>
                    </div>
                  </div>
                </ScrollArea>

                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Certificates
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statutory">
            <Card>
              <CardHeader>
                <CardTitle>Export Statutory Marks Report</CardTitle>
                <CardDescription>Generate statutory attendance marks report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
           

                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ethnicity" />
                      <label
                        htmlFor="ethnicity"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include ethnicity
                      </label>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="fsm" />
                      <label
                        htmlFor="fsm"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include FSM eligibility
                      </label>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sen" />
                      <label
                        htmlFor="sen"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include SEN status
                      </label>
                    </div>
                  </div>
                </ScrollArea>

                <Button className="w-full">
                  <Table className="mr-2 h-4 w-4" />
                  Export Statutory Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Printable Register</CardTitle>
                <CardDescription>Generate weekly registration forms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
       
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Forms</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select forms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All registration forms</SelectItem>
                        <SelectItem value="year7">Year 7</SelectItem>
                        <SelectItem value="year8">Year 8</SelectItem>
                        <SelectItem value="year9">Year 9</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full">
                  <Printer className="mr-2 h-4 w-4" />
                  Generate Weekly Register
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lesson">
            <Card>
              <CardHeader>
                <CardTitle>Printable Lesson Registers</CardTitle>
                <CardDescription>Generate lesson attendance registers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
    

                <Button className="w-full">
                  <Printer className="mr-2 h-4 w-4" />
                  Generate Lesson Registers
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marks">
            <Card>
              <CardHeader>
                <CardTitle>Export Week by Week Marks Report</CardTitle>
                <CardDescription>Generate detailed weekly attendance marks report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
            

                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export Marks Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

