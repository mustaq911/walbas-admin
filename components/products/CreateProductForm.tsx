import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Product = {
  id?: number;
  title: string;
  description: string;
  category: string;
  image?: File | null;
  basePrice: number;
  auctionStart: string;
  auctionEnd: string;
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
      auctionEnd: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(formData);
    } catch (error: any) {
      setError(error.response?.data?.message || `Failed to ${isEdit ? "update" : "create"} product. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <ScrollArea className="h-[450px]">
        <div className="grid gap-4 py-4 px-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="category" className="text-left">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="col-span-2">
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
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="image" className="text-left">
              Image
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="basePrice" className="text-left">
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
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="auctionStart" className="text-left">
              Auction Start
            </Label>
            <Input
              id="auctionStart"
              type="date"
              value={formData.auctionStart}
              onChange={(e) => setFormData({ ...formData, auctionStart: e.target.value })}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="auctionEnd" className="text-left">
              Auction End
            </Label>
            <Input
              id="auctionEnd"
              type="date"
              value={formData.auctionEnd}
              onChange={(e) => setFormData({ ...formData, auctionEnd: e.target.value })}
              className="col-span-2"
            />
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-end gap-4 mt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Product" : "Create Product"}
        </Button>
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}