"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Calendar, Clock, DollarSign, Package, Type, FileText } from "lucide-react";

type Product = {
  id?: number;
  title: string;
  description: string;
  category: string;
  image?: File | null;
  basePrice: number;
  auctionStart: string; // Date part, e.g., "2025-08-05"
  auctionStartTime: string; // Time part, e.g., "21:04"
  auctionEnd: string; // Date part, e.g., "2025-08-08"
  auctionEndTime: string; // Time part, e.g., "21:04"
};

type CreateProductFormProps = {
  product?: Product;
  onSubmit: (data: Product) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
};

export default function CreateProductForm({ product, onSubmit, onCancel, isEdit = false }: CreateProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      title: "",
      description: "",
      category: "",
      image: null,
      basePrice: 0,
      auctionStart: "",
      auctionStartTime: "",
      auctionEnd: "",
      auctionEndTime: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Combine date and time into ISO 8601 format (YYYY-MM-DDTHH:mm:ss)
      const auctionStartDate = formData.auctionStart && formData.auctionStartTime
        ? `${formData.auctionStart}T${formData.auctionStartTime}:00`
        : "";
      const auctionEndDate = formData.auctionEnd && formData.auctionEndTime
        ? `${formData.auctionEnd}T${formData.auctionEndTime}:00`
        : "";
      
      const submitData = {
        ...formData,
        auctionStart: auctionStartDate,
        auctionEnd: auctionEndDate,
      };

      console.log('Submitting product data:', submitData); // Debug log
      await onSubmit(submitData);
    } catch (error: any) {
      setError(error.message || `Failed to ${isEdit ? "update" : "create"} product. Please try again.`);
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl border-2 border-gray-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          {/* <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            {isEdit ? "Edit Product" : "Create New Product"}
          </CardTitle> */}
        </CardHeader>
        <CardContent className="p-8">
          {error && (
            <Alert variant="destructive" className="mb-6 shadow-sm">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="bg-gray-50 p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Type className="h-5 w-5 text-blue-600" />
                Basic Information
              </h3>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Product Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border-2 border-gray-200 focus:border-blue-500 shadow-sm transition-all duration-200"
                    placeholder="Enter product title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border-2 border-gray-200 focus:border-blue-500 shadow-sm transition-all duration-200 min-h-[100px]"
                    placeholder="Enter product description"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Category
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      required
                    >
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 shadow-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Baby Item">Baby Item</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="basePrice" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Base Price
                    </Label>
                    <Input
                      id="basePrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.basePrice || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          basePrice: e.target.value ? parseFloat(e.target.value) : 0,
                        })
                      }
                      className="border-2 border-gray-200 focus:border-blue-500 shadow-sm transition-all duration-200"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="bg-green-50 p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-green-600" />
                Product Image
              </h3>
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                  Upload Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border-2 border-gray-200 focus:border-green-500 shadow-sm transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {formData.image && (
                  <p className="text-sm text-green-600 mt-2">Selected: {formData.image.name}</p>
                )}
              </div>
            </div>

            {/* Auction Timing Section */}
            <div className="bg-orange-50 p-6 rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                Auction Schedule
              </h3>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="auctionStart" className="text-sm font-medium text-gray-700">
                      Start Date
                    </Label>
                    <Input
                      id="auctionStart"
                      type="date"
                      value={formData.auctionStart}
                      onChange={(e) => setFormData({ ...formData, auctionStart: e.target.value })}
                      className="border-2 border-gray-200 focus:border-orange-500 shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="auctionStartTime" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Start Time
                    </Label>
                    <Input
                      id="auctionStartTime"
                      type="time"
                      value={formData.auctionStartTime}
                      onChange={(e) => setFormData({ ...formData, auctionStartTime: e.target.value })}
                      className="border-2 border-gray-200 focus:border-orange-500 shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="auctionEnd" className="text-sm font-medium text-gray-700">
                      End Date
                    </Label>
                    <Input
                      id="auctionEnd"
                      type="date"
                      value={formData.auctionEnd}
                      onChange={(e) => setFormData({ ...formData, auctionEnd: e.target.value })}
                      className="border-2 border-gray-200 focus:border-orange-500 shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="auctionEndTime" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      End Time
                    </Label>
                    <Input
                      id="auctionEndTime"
                      type="time"
                      value={formData.auctionEndTime}
                      onChange={(e) => setFormData({ ...formData, auctionEndTime: e.target.value })}
                      className="border-2 border-gray-200 focus:border-orange-500 shadow-sm transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={onCancel} 
                disabled={isLoading}
                className="px-8 py-2 border-2 border-gray-300 hover:border-gray-400 shadow-sm transition-all duration-200"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="px-8 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all duration-200"
              >
                {isLoading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}