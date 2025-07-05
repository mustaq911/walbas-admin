import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

export default function SchoolExpectations() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-end items-center mb-6">
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
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80%]">Assessment</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment, index) => (
              <TableRow key={index} className="group cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{assessment.name}</div>
                    <div className="text-sm text-muted-foreground">User Defined Assessment</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="bg-muted">
                    No rules
                  </Badge>
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

const assessments = [
  { name: "% Mathematics KS3" },
  { name: "MAT-LIVE - Art and Design / Art KS3" },
  { name: "MAT-LIVE Art and Design / Art KS4" },
  { name: "MAT-LIVE Biology KS4" },
  { name: "MAT-LIVE Business Studies" },
  { name: "MAT-LIVE Chemistry KS4" },
  { name: "MAT-LIVE Child Dev KS4" },
  { name: "MAT-LIVE Citizenship KS4" },
  { name: "MAT-LIVE Computer Science KS3" },
  { name: "MAT-LIVE Computer Science KS4" },
  { name: "MAT-LIVE Construction KS4" },
  { name: "MAT-LIVE Dance KS4" },
  { name: "MAT-LIVE Design and Technology KS3" },
  { name: "MAT-LIVE Design and Technology KS4" },
  { name: "MAT-LIVE Drama KS3" },
  { name: "MAT-LIVE Drama KS4" },

]

