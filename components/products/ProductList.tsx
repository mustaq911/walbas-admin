"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Layers, PackageX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://3.128.212.155:8081";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  basePrice: number;
  auctionStart: string;
  auctionEnd: string;
};

type ProductListProps = {
  searchProduct: string;
  products: Product[];
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setOpenModal: (open: boolean) => void;
};

export default function ProductList({ searchProduct, products, setProducts, setSelectedProduct, setOpenModal }: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={`${product.title}'s image`}
                          width={100}
                          height={100}
                          className="rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-md bg-gray-300 flex items-center justify-center">
                          <Layers className="h-8 w-8 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold truncate">{product.title}</h2>
                      <p className="text-xs text-gray-500 truncate">{product.category}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={`/products/${product.id}`}>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpenModal(true);
                        }}
                      >
                        Edit product
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="grid grid-cols-2 gap-y-1 text-sm">
                  <div>
                    Price: <span className="font-medium text-muted-foreground">${product.basePrice.toFixed(2)}</span>
                  </div>
                  <div>
                    Category: <span className="font-medium text-muted-foreground">{product.category}</span>
                  </div>
                  <div>
                    Auction Start: <span className="font-medium text-muted-foreground">{product.auctionStart}</span>
                  </div>
                  <div>
                    Auction End: <span className="font-medium text-muted-foreground">{product.auctionEnd}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <PackageX className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No products found</h3>
          <div className="mt-6">
            <Button>Clear filters</Button>
          </div>
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">Items per page:</p>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="36">36</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <p className="text-sm text-gray-600">
              Page {currentPage} of {pageCount}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}