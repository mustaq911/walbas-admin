"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function CreateExclusionDialog() {
  const [files, setFiles] = useState<File[]>([])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...droppedFiles])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-[#8DC63F] hover:bg-[#7ab32f]">
          Add Internal Exclusion
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create Internal Exclusion <Star className="h-4 w-4" />
          </DialogTitle>
        </DialogHeader>

        <Alert className="bg-[#E5F6FD] border-[#E5F6FD] text-sky-900">
          <AlertDescription>
            Can&apos;t select a session? This means there aren&apos;t any upcoming sessions scheduled. Please ask your
            school office team to follow{" "}
            <a href="#" className="text-sky-600 underline">
              these instructions
            </a>
            .
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="students" className="text-right">
              Students*
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select students" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student1">Student 1</SelectItem>
                <SelectItem value="student2">Student 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="issued-by" className="text-right">
              Issued by*
            </Label>
            <Select defaultValue="jane-hunt">
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jane-hunt">Jane Hunt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="exclusion-type" className="text-right">
              Internal exclusion type*
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select exclusion type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="type1">Type 1</SelectItem>
                <SelectItem value="type2">Type 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="exclusion-reason" className="text-right">
              Exclusion reason*
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reason1">Reason 1</SelectItem>
                <SelectItem value="reason2">Reason 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="issued-date" className="text-right">
              Issued date
            </Label>
            <div className="col-span-3 flex gap-4">
              <Input type="time" defaultValue="22:26" className="w-24" />
              <Input type="text" defaultValue="24th Feb 2025" readOnly />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sessions" className="text-right">
              Session(s)*
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select session(s)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="session1">Session 1</SelectItem>
                <SelectItem value="session2">Session 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea className="col-span-3" placeholder="Add notes here..." />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Label className="text-right">Attachments</Label>
            <div
              className="col-span-3 border-2 border-dashed rounded-lg p-6 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Drag or{" "}
                  <label className="text-[#8DC63F] cursor-pointer">
                    click to upload
                    <input type="file" className="hidden" multiple onChange={handleFileInput} />
                  </label>
                </p>
              </div>
              {files.length > 0 && (
                <div className="mt-4 text-left">
                  <p className="text-sm font-medium">Uploaded files:</p>
                  <ul className="text-sm text-gray-600">
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-[#8DC63F] hover:bg-[#7ab32f]">Create Internal Exclusion</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

