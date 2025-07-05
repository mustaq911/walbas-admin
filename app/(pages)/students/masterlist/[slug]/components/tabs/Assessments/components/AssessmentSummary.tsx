'use client'

import { memo } from 'react'
import { Student } from '@/types/student'

interface AssessmentsSummaryProps {
    student: Student
}

function AssessmentsSummary({ student }: AssessmentsSummaryProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Assessment Summary</h3>
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-600">Overall Grade</p>
                    <p className="text-2xl font-medium">{student.grade}%</p>
                </div>
                <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Quick Stats</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="font-medium">8/10</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="font-medium">2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(AssessmentsSummary)