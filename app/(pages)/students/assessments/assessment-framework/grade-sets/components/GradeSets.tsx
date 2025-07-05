import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, Plus, Settings, GraduationCap, ClipboardList, BookOpen } from "lucide-react"

export default function GradeSets() {
    return (
        <div className="min-h-screen">
            <header className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end items-center">
                    <div className="flex items-end space-x-2">
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Plus className="mr-2 h-4 w-4" /> Create new grade point scale
                        </Button>

                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                <Settings className="w-5 h-5 mr-2 text-blue-500" />
                                Grade Point Scale
                            </h2>
                            <Select defaultValue="0-120">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select scale" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0-120">0 - 120</SelectItem>
                                </SelectContent>
                            </Select>
                        </section>

                        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                <Settings className="w-5 h-5 mr-2 text-blue-500" />
                                Grade Point Scale Details
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Name
                                    </Label>
                                    <Input id="name" defaultValue="0 - 120" className="mt-1" />
                                </div>
                                <div>
                                    <Label htmlFor="shortName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Short Name
                                    </Label>
                                    <Input id="shortName" defaultValue="0 - 120" className="mt-1" />
                                </div>
                                <div>
                                    <Label htmlFor="pointName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Point Name
                                    </Label>
                                    <Input id="pointName" defaultValue="Marks" className="mt-1" />
                                </div>
                                <div>
                                    <Label htmlFor="range" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Range
                                    </Label>
                                    <Input id="range" defaultValue="0 - 120" className="mt-1" />
                                </div>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                                    <GraduationCap className="w-5 h-5 mr-2 text-blue-500" />
                                    Marking Grade Sets
                                </h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-blue-600 border-blue-300 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-700 dark:hover:bg-blue-900"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add
                                </Button>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">Mark</span>
                                    <span className="text-gray-500 dark:text-gray-400">User defined</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                                    <ClipboardList className="w-5 h-5 mr-2 text-blue-500" />
                                    Display Grade Sets
                                </h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-blue-600 border-blue-300 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-700 dark:hover:bg-blue-900"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {[
                                    "High Pass/Low Pass/Fail",
                                    "HighPass/LowPass/Fail",
                                    "High Pass-Low Pass-Fail",
                                    "Fail/High Pass/Low Pass",
                                    "%120(ish)",
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                                        <ChevronRight className="w-4 h-4 text-blue-500 mr-2" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                                Assessments
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {[
                                    "Arabic Test",
                                    "History Test",
                                    "Latin Test",
                                    "Paper 1",
                                    "Paper 1",
                                    "Paper 2",
                                    "Paper 3",
                                    "Spanish Test",
                                    "Speaking",
                                    "Speaking",
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

