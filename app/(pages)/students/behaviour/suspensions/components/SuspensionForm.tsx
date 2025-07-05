"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  student: z.string().min(1, "Student is required"),
  reason: z.string().min(1, "Suspension reason is required"),
  suspensionFrom: z.string().min(1, "Start date/time is required"),
  suspensionUntil: z.string().min(1, "End date/time is required"),
  decisionMade: z.string().min(1, "Decision date/time is required"),
  notes: z.string().optional(),
  dailyStartTime: z.string().optional(),
  dailyEndTime: z.string().optional(),
})

const suspensionReasons = [
  "Alcohol related",
  "Drug dealing",
  "Bullying",
  "Challenging/unacceptable behaviour",
  "Use or threat of use of an offensive weapon or prohibited item (incl. possession)",
  "Damage and Challenging/unacceptable behaviour",
]

const students = [
  { id: "Q207000023", name: "Carter Aaliyah" },
  { id: "C207000020", name: "Morgan Ashley" },
  { id: "P207000020", name: "Hughes Aaron" },
]

export function CreateSuspensionDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Suspension</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Suspension</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-4">
                <h3 className="font-semibold">Suspension Details</h3>

                <FormField
                  control={form.control}
                  name="student"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select student" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name} ({student.id})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suspension reasons*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {suspensionReasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="suspensionFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suspension from*</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="datetime-local" {...field} />
                            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="suspensionUntil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suspension until*</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="datetime-local" {...field} />
                            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="decisionMade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Decision made*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="datetime-local" {...field} />
                          <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="rounded-lg border p-4 space-y-4">
                <h3 className="font-semibold">Lunchtime Suspension Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dailyStartTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily start time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dailyEndTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily end time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-4">
                <h3 className="font-semibold">Attachments</h3>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <p className="text-sm text-muted-foreground">Drag or click to upload</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Suspension</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

