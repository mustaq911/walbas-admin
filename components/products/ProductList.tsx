"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Layers, PackageX, MoreHorizontal } from "lucide-react";
import Image from "next/image";

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
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
};

export default function ProductList({ searchProduct, products, setProducts, onViewProduct, onEditProduct }: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Auction Start</TableHead>
                <TableHead>Auction End</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={`${product.title}'s image`}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-gray-300 flex items-center justify-center">
                        <Layers className="h-6 w-6 text-gray-600" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.basePrice.toFixed(2)}</TableCell>
                  <TableCell>{product.auctionStart}</TableCell>
                  <TableCell>{product.auctionEnd}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewProduct(product)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditProduct(product)}>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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