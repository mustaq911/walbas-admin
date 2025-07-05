"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, MoreHorizontal, ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const parentalConsents = [
  {
    id: "PC001",
    name: "Administer First Aid",
    category: "Medical",
    status: "Active",
    lastUpdated: "2024-02-20",
    responses: 145,
  },
  {
    id: "PC002",
    name: "Contact Dentist",
    category: "Medical",
    status: "Active",
    lastUpdated: "2024-02-19",
    responses: 132,
  },
  {
    id: "PC003",
    name: "Internet Access",
    category: "Technology",
    status: "Active",
    lastUpdated: "2024-02-18",
    responses: 156,
  },
  {
    id: "PC004",
    name: "Copyright Permission",
    category: "Media",
    status: "Inactive",
    lastUpdated: "2024-02-17",
    responses: 98,
  },
  {
    id: "PC005",
    name: "School Visit Permission",
    category: "Activities",
    status: "Active",
    lastUpdated: "2024-02-16",
    responses: 167,
  },
]

const studentConsents = [
  {
    id: "SC001",
    name: "COVID-19 Testing",
    category: "Medical",
    status: "Active",
    lastUpdated: "2024-02-20",
    responses: 89,
  },
  {
    id: "SC002",
    name: "Data Exchange",
    category: "Technology",
    status: "Active",
    lastUpdated: "2024-02-19",
    responses: 76,
  },
  {
    id: "SC003",
    name: "Photo Consent",
    category: "Media",
    status: "Inactive",
    lastUpdated: "2024-02-18",
    responses: 92,
  },
]

export default function ConsentList() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Consents</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Consent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Consent Type</DialogTitle>
              <DialogDescription>
                Create a new consent type that will be requested from students or guardians.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Consent type<span className="text-red-500">*</span>
                </Label>
                <Input id="name" placeholder="Enter consent type name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of this consent type"
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="autoRequest" />
                <Label htmlFor="autoRequest">Automatically request from guardians?</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Add Consent Type</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Consent Types</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search consents..." className="pl-8 w-[250px]" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="parental">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="parental">Parental Consent</TabsTrigger>
              <TabsTrigger value="student">Student Consent</TabsTrigger>
            </TabsList>
            <TabsContent value="parental" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center space-x-1">
                          <span>Name</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parentalConsents.map((consent) => (
                      <TableRow key={consent.id}>
                        <TableCell className="font-medium">{consent.name}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {consent.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              consent.status === "Active"
                                ? "bg-green-50 text-green-700 ring-green-600/20"
                                : "bg-red-50 text-red-700 ring-red-600/20"
                            } ring-1 ring-inset`}
                          >
                            {consent.status}
                          </span>
                        </TableCell>
                        <TableCell>{consent.lastUpdated}</TableCell>
                        <TableCell>{consent.responses}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Edit consent</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete consent</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">Showing 5 of 10 results</div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="student" className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center space-x-1">
                          <span>Name</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentConsents.map((consent) => (
                      <TableRow key={consent.id}>
                        <TableCell className="font-medium">{consent.name}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {consent.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              consent.status === "Active"
                                ? "bg-green-50 text-green-700 ring-green-600/20"
                                : "bg-red-50 text-red-700 ring-red-600/20"
                            } ring-1 ring-inset`}
                          >
                            {consent.status}
                          </span>
                        </TableCell>
                        <TableCell>{consent.lastUpdated}</TableCell>
                        <TableCell>{consent.responses}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Edit consent</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete consent</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">Showing 3 of 3 results</div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

