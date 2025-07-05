import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus } from "lucide-react"

export default function AssessmentPeriods() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-end items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Academic Year</span>
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
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period Type</TableHead>
              <TableHead className="text-right">Assessments</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {periods.map((period, index) => (
              <TableRow key={index} className="group cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{period.name}</TableCell>
                <TableCell className="text-right">
                  <span className="text-sm text-muted-foreground">
                    {period.count} {period.count === 1 ? "assessment" : "assessments"} using this period set
                  </span>
                </TableCell>
                <TableCell>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const periods = [
  { name: "Termly measurement periods", count: 53 },
  { name: "Single annual measurement period", count: 46 },
  { name: "Half-termly measurement periods", count: 62 },
  { name: "Custom (2024/2025)", count: 1 },
  { name: "Custom (Five Week Check)", count: 1 },
  { name: "Custom (Term 1, 3 and 5)", count: 2 },
  { name: "Custom (VESPA Y12)", count: 1 },
]

