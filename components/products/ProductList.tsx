"use client";
import { useState } from "react";
import Axi from "@/services/interceptors/Axi";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Layers, PackageX, Trash2, Calendar, DollarSign, Tag } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  basePrice: number;
  auctionStart: string;
  auctionEnd: string;
  status?: string;
};

type ProductListProps = {
  searchProduct: string;
  products: Product[];
  setProducts: (products: Product[]) => void;
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
};

export default function ProductList({ searchProduct, products, setProducts }: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleDelete = async (id: number, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`);
    
    if (!confirmed) {
      return;
    }

    try {
      await Axi.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product deleted successfully");
    } catch (error: any) {
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product. Please try again.");
    }
  };

  const getStatusBadge = (status?: string) => {
    const statusConfig = {
      'ACTIVE': { color: 'bg-green-100 text-green-800 border-green-200', label: 'Active' },
      'PENDING': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      'COMPLETED': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Completed' },
      'CANCELLED': { color: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelled' },
      'UNKNOWN': { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Unknown' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.UNKNOWN;
    return (
      <Badge className={`${config.color} border font-medium px-2 py-1`}>
        {config.label}
      </Badge>
    );
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'Not set';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="rounded-2xl overflow-hidden border-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                <TableHead className="w-[120px] py-4 font-semibold text-gray-700">Image</TableHead>
                <TableHead className="py-4 font-semibold text-gray-700">Product Details</TableHead>
                <TableHead className="py-4 font-semibold text-gray-700">Category</TableHead>
                <TableHead className="py-4 font-semibold text-gray-700">Base Price</TableHead>
                <TableHead className="py-4 font-semibold text-gray-700">Auction Period</TableHead>
                <TableHead className="py-4 font-semibold text-gray-700">Status</TableHead>
                <TableHead className="w-[100px] text-right py-4 font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedProducts.map((product, index) => (
                <TableRow 
                  key={product.id} 
                  className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <TableCell className="py-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={`${product.title}'s image`}
                          fill
                          className="object-cover transition-transform duration-200 hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.jpg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <Layers className="h-8 w-8 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{product.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{product.description || 'No description available'}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge className="bg-purple-100 text-purple-800 border border-purple-200 font-medium px-3 py-1">
                      <Tag className="h-3 w-3 mr-1" />
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                      <DollarSign className="h-4 w-4" />
                      {product.basePrice.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Start:</span>
                        <span>{formatDateTime(product.auctionStart)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <span className="font-medium">End:</span>
                        <span>{formatDateTime(product.auctionEnd)}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    {getStatusBadge(product.status)}
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 shadow-sm transition-all duration-200 hover:shadow-md"
                      onClick={() => handleDelete(product.id, product.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <PackageX className="h-12 w-12 text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchProduct 
              ? `No products match your search "${searchProduct}". Try adjusting your search terms.`
              : "You haven't added any products yet. Create your first product to get started."
            }
          </p>
          <div className="space-x-4">
            {searchProduct && (
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="border-gray-300 hover:bg-gray-50"
              >
                Clear Search
              </Button>
            )}
            <Button 
              onClick={() => window.location.href = '/products/create'}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
            >
              Add Product
            </Button>
          </div>
        </div>
      )}

      {filteredProducts.length > 0 && (
        <Card className="mt-8 shadow-lg border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-700">Items per page:</p>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                    <SelectTrigger className="w-20 border-2 border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="36">36</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 ${
                          currentPage === pageNum 
                            ? "bg-blue-600 text-white shadow-md" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
                  disabled={currentPage === pageCount}
                  className="border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}