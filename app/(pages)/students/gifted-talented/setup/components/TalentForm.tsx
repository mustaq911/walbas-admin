"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

interface CreateTalentProps {
  onSubmit: (talentName: string) => void
}

export function CreateTalent({ onSubmit }: CreateTalentProps) {
  const [talentName, setTalentName] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (talentName.trim()) {
      onSubmit(talentName)
      setTalentName("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Talent
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Talent</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="talent-name">Talent Name</Label>
            <Input
              id="talent-name"
              value={talentName}
              onChange={(e) => setTalentName(e.target.value)}
              placeholder="Enter talent name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Talent</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

