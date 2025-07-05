'use client'

import { memo } from 'react'
// import { Student } from '@/types/student'

// interface AssessmentsListProps {
//     student: Student
// }

function AssessmentsList(
    // { student }: AssessmentsListProps
) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Assessments List</h3>
            <div className="space-y-4">
                {/* Add your assessments list content here */}
                <div className="border-b pb-4">
                    <p className="font-medium">Mid-term Assessment</p>
                    <p className="text-sm text-gray-600">Grade: 85%</p>
                </div>
                <div className="border-b pb-4">
                    <p className="font-medium">Final Assessment</p>
                    <p className="text-sm text-gray-600">Grade: 92%</p>
                </div>
            </div>
        </div>
    )
}

export default memo(AssessmentsList)