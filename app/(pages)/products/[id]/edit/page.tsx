"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import AppContent from "@/components/admin/content/app-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function EditProductPage() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    basePrice: 0,
    auctionStart: "",
    auctionEnd: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
     
 }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/products/${id}`, product);
      router.push(`/products/${id}`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <AppContent title="Edit Product">
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
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
            <Button variant="outline" asChild>
              <Link href={`/products/${id}`}>Cancel</Link>
            </Button>
          </DialogFooter>
        </form>
      )}
    </AppContent>
  );
}