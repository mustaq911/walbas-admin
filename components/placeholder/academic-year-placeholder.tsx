import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const AcademicYearPlaceholder = () => {
  return (
    <Select>
        <SelectTrigger className="xl:max-w-xs w-full">
        <SelectValue placeholder="Select Academic year" />
        </SelectTrigger>
        <SelectContent>
        <SelectItem value="0">2023 - 2024</SelectItem>
        <SelectItem value="1">2024 - 2025</SelectItem>
        <SelectItem value="2">2025 - 2026</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default AcademicYearPlaceholder
