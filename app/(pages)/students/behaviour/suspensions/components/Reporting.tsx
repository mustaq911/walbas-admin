import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateSuspensionDialog } from "./SuspensionForm"


interface Suspension {
  id: string
  reason: string
  student: string
  days: number
  startDate: string
  endDate: string
  year: string
  form: string
  studentId?: string
}

const suspensions: Suspension[] = [
  {
    id: "1",
    reason: "Alcohol related",
    student: "Carter Aaliyah",
    studentId: "Q207000023",
    days: 2,
    startDate: "2024-02-13",
    endDate: "2024-02-15",
    year: "Year 7",
    form: "8CD",
  },
  {
    id: "2",
    reason: "Use or threat of use of an offensive weapon or prohibited item (incl. possession)",
    student: "Morgan Ashley",
    studentId: "C207000020",
    days: 4.5,
    startDate: "2024-02-05",
    endDate: "2024-02-19",
    year: "Year 8",
    form: "11MA",
  },
  {
    id: "3",
    reason: "Challenging/unacceptable behaviour",
    student: "Johnson Bob",
    studentId: "P207000020",
    days: 5,
    startDate: "2024-02-07",
    endDate: "2024-02-14",
    year: "Year 8",
    form: "8CD",
  },
  {
    id: "4",
    reason: "Drug dealing",
    student: "Johnson Bob",
    studentId: "P207000020",
    days: 0.5,
    startDate: "2024-02-06",
    endDate: "2024-02-06",
    year: "Year 8",
    form: "8CD",
  },
  {
    id: "5",
    reason: "Bullying",
    student: "Carter Aaliyah",
    studentId: "Q207000023",
    days: 0,
    startDate: "2024-02-05",
    endDate: "2024-02-05",
    year: "Year 7",
    form: "8CD",
  },
  {
    id: "6",
    reason: "Damage and Challenging/unacceptable behaviour",
    student: "Hughes Aaron",
    studentId: "P207000020",
    days: 0.5,
    startDate: "2024-01-22",
    endDate: "2024-01-22",
    year: "Year 8",
    form: "11XQ",
  },
]

export default function SuspensionsPage() {
  return (
    <div className="px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Suspensions</h1>
        <CreateSuspensionDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suspensions.map((suspension) => (
          <Card key={suspension.id} className="relative">
            <CardHeader className="pb-3">
              <div className="font-medium text-base leading-tight mb-4">{suspension.reason}</div>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <CardTitle className="text-sm">{suspension.student}</CardTitle>
                  <p className="text-xs text-muted-foreground">{suspension.studentId}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {suspension.days} {suspension.days === 1 ? "day" : "days"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-xs text-muted-foreground">
                {suspension.year} • {suspension.form}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground pt-0">
              {new Date(suspension.startDate).toLocaleDateString()} -{" "}
              {new Date(suspension.endDate).toLocaleDateString()}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

