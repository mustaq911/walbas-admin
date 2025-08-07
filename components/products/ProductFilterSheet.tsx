"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useState } from "react";

type ProductFilterSheetProps = {
  onCategoryChange: (category: string) => void; // Callback to pass category to parent
};

export default function ProductFilterSheet({ onCategoryChange }: ProductFilterSheetProps) {
  const [category, setCategory] = useState("all");

  const handleApply = () => {
    onCategoryChange(category); // Pass selected category to parent
  };

  const handleReset = () => {
    setCategory("all");
    onCategoryChange("all"); // Reset to fetch all products
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>Apply filters to narrow down the product list.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Baby Item">Baby Item</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleApply}>Apply Filters</Button>
          <Button variant="outline" onClick={handleReset}>Reset Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}