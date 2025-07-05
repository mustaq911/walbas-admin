import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface ReportCard {
  name: string
  date: string
}

export default function ReportCards() {
  const reports: ReportCard[] = [
    { name: "Year 10 - End Of Year Report", date: "18 Jul 2025" },
    { name: "Spring Term report", date: "04 Apr 2025" },
    { name: "Grade Card", date: "17 Feb 2025" },
    { name: "Trial Maths", date: "17 Feb 2025" },

  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Report Cards</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[400px]">
              <DialogHeader>
                <DialogTitle>Add New Report Card</DialogTitle>
                <DialogDescription>Create a new report card by entering the details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name">Report Name</label>
                  <Input id="name" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="date">Date</label>
                  <Input id="date" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Report</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Academic year</span>
          <Select defaultValue="2024/2025">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024/2025">2024/2025</SelectItem>
              <SelectItem value="2023/2024">2023/2024</SelectItem>
              <SelectItem value="2022/2023">2022/2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow key={index}>
                <TableCell>{report.name}</TableCell>
                <TableCell className="text-right text-muted-foreground">{report.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

