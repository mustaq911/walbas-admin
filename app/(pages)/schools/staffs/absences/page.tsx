import AppContent from '@/components/admin/content/app-content'
import AppModal from '@/components/modal/app-modal'
import AcademicYearPlaceholder from '@/components/placeholder/academic-year-placeholder'
import DatatablePlaceholder from '@/components/placeholder/datatable-placeholder'
import FormPlaceholder from '@/components/placeholder/form-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

export default function StaffAbsencePage(){
	return (
		<AppContent title="Absences">
			<div className="flex gap-2 mb-2 justify-end">
				<AcademicYearPlaceholder/>
				<AppModal
					title='Add Staff'
					description='Add New Staff'
					button={<Button>
						<Plus className='size-4 me-1'/> Add Absences
					</Button>}
				>
					<FormPlaceholder/>
				</AppModal>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Absences</CardTitle>
					<CardDescription>List of all staff</CardDescription>
				</CardHeader>
				<CardContent>
					<DatatablePlaceholder/>
				</CardContent>
			</Card>
		</AppContent>
	)
}

