"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AppContent from "@/components/admin/content/app-content";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://3.128.212.155:8081";

type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  basePrice: number;
  auctionStart: string;
  auctionEnd: string;
};

export default function ProductDetailsPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <AppContent title="Product Details">
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : !product ? (
        <div className="text-center py-12">
          <p className="text-sm font-semibold text-gray-900">Product not found</p>
          <Button asChild className="mt-6">
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-md">
                  <Layers className="h-12 w-12 text-gray-600" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-4">{product.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div>Category: <span className="font-medium">{product.category}</span></div>
                <div>Base Price: <span className="font-medium">${product.basePrice.toFixed(2)}</span></div>
                <div>Auction Start: <span className="font-medium">{product.auctionStart}</span></div>
                <div>Auction End: <span className="font-medium">{product.auctionEnd}</span></div>
              </div>
              <div className="mt-6 flex gap-4">
                <Button asChild>
                  <Link href={`/products/${id}/edit`}>Edit Product</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/products">Back to Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppContent>
  );
}