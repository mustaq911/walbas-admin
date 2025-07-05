"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://3.128.212.155:8081";

type Product = {
  id?: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  basePrice: number;
  auctionStart: string;
  auctionEnd: string;
};

type CreateProductFormProps = {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  setOpenModal: (open: boolean) => void;
  setProducts: (products: Product[]) => void;
};

export default function CreateProductForm({ selectedProduct, setSelectedProduct, setOpenModal, setProducts }: CreateProductFormProps) {
  const [product, setProduct] = useState<Product>({
    title: selectedProduct?.title || "",
    description: selectedProduct?.description || "",
    category: selectedProduct?.category || "",
    imageUrl: selectedProduct?.imageUrl || "",
    basePrice: selectedProduct?.basePrice || 0,
    auctionStart: selectedProduct?.auctionStart || "",
    auctionEnd: selectedProduct?.auctionEnd || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedProduct) {
        // Update product
        const response = await axios.put(`${API_BASE_URL}/api/products/${selectedProduct.id}`, product);
        setProducts((prev) => prev.map((p) => (p.id === selectedProduct.id ? response.data : p)));
      } else {
        // Create new product
        const response = await axios.post(`${API_BASE_URL}/api/products`, product);
        setProducts((prev) => [...prev, response.data]);
      }
      setOpenModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ScrollArea className="h-[450px]">
        <div className="grid gap-4 py-4 px-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="title" className="text-left">
              Title
            </Label>
            <Input
              id="title"
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="category" className="text-left">
              Category
            </Label>
            <Select
              value={product.category}
              onValueChange={(value) => setProduct({ ...product, category: value })}
            >
              <SelectTrigger className="col-span-3">
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
            <Label htmlFor="imageUrl" className="text-left">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              value={product.imageUrl}
              onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="basePrice" className="text-left">
              Base Price
            </Label>
            <Input
              id="basePrice"
              type="number"
              value={product.basePrice}
              onChange={(e) => setProduct({ ...product, basePrice: parseFloat(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="auctionStart" className="text-left">
              Auction Start
            </Label>
            <Input
              id="auctionStart"
              type="date"
              value={product.auctionStart}
              onChange={(e) => setProduct({ ...product, auctionStart: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="auctionEnd" className="text-left">
              Auction End
            </Label>
            <Input
              id="auctionEnd"
              type="date"
              value={product.auctionEnd}
              onChange={(e) => setProduct({ ...product, auctionEnd: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
      </ScrollArea>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
}