"use client";
import React, { useEffect, useState, useCallback } from 'react';
import AppContent from '@/components/admin/content/app-content';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Search, Package, Plus, Edit3, X, Save, Calendar, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import Axi from '@/services/interceptors/Axi';
import Image from 'next/image';

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

type EditFormData = {
  title: string;
  description: string;
  category: string;
  basePrice: number;
  auctionStart: string;
  auctionStartTime: string;
  auctionEnd: string;
  auctionEndTime: string;
  image?: File | null;
};

export default function ProductEditPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<EditFormData | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Axi.get('/api/products/get/all');
      console.log('Fetch products response:', response.data);
      
      if (Array.isArray(response.data)) {
        const productsData = response.data.map((p: any) => ({
          id: Number(p.id) || 0,
          title: p.title || 'Unknown',
          description: p.description || '',
          category: p.category || 'Uncategorized',
          imageUrl: p.imageUrl || '/placeholder.jpg',
          basePrice: Number(p.basePrice) || 0,
          auctionStart: p.auctionStart || '',
          auctionEnd: p.auctionEnd || '',
          status: p.status || 'UNKNOWN',
        }));
        
        setProducts(productsData);
        setFilteredProducts(productsData);
      } else {
        setError('Invalid API response format');
        toast.error('Invalid API response format');
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      const message =
        error.response?.status === 401
          ? 'Unauthorized: Invalid or missing token. Please log in again.'
          : error.response?.data?.message || 'Failed to load products. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.warn('No username found in cookies');
      toast.error('User not authenticated. Please log in.');
      router.push('/login');
      return;
    }
    
    fetchProducts();
  }, [fetchProducts, router]);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    const product = products.find(p => p.id.toString() === productId);
    
    if (product) {
      setSelectedProduct(product);
      
      // Parse datetime strings
      const [auctionStartDate, auctionStartTime] = product.auctionStart?.split('T') || ['', ''];
      const [auctionEndDate, auctionEndTime] = product.auctionEnd?.split('T') || ['', ''];
      
      setEditFormData({
        title: product.title || '',
        description: product.description || '',
        category: product.category || '',
        basePrice: Number(product.basePrice) || 0,
        auctionStart: auctionStartDate || '',
        auctionStartTime: auctionStartTime?.slice(0, 5) || '',
        auctionEnd: auctionEndDate || '',
        auctionEndTime: auctionEndTime?.slice(0, 5) || '',
        image: null,
      });
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData || !selectedProduct) return;

    setIsUpdating(true);
    try {
      // Combine date and time
      const auctionStartDateTime = `${editFormData.auctionStart}T${editFormData.auctionStartTime}:00`;
      const auctionEndDateTime = `${editFormData.auctionEnd}T${editFormData.auctionEndTime}:00`;
      
      const updateData = {
        id: selectedProduct.id,
        title: editFormData.title,
        description: editFormData.description,
        category: editFormData.category,
        basePrice: editFormData.basePrice,
        auctionStart: auctionStartDateTime,
        auctionEnd: auctionEndDateTime,
        imageUrl: selectedProduct.imageUrl, // Keep existing image URL if no new image
        status: selectedProduct.status
      };

      console.log('Updating product with data:', updateData);

      const response = await Axi.post('/api/products/create', updateData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Update product response:', response.data);
      toast.success('Product updated successfully');
      
      // Refresh products list
      fetchProducts();
      
      // Update the selected product with new data
      setSelectedProduct({
        ...selectedProduct,
        ...updateData,
        basePrice: Number(updateData.basePrice)
      });
      
    } catch (error: any) {
      console.error('Error updating product:', error);
      const message = error.response?.data?.message || 'Failed to update product';
      toast.error(message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
    setEditFormData(null);
    setSelectedProductId('');
  };

  return (
    <AppContent title="Edit Products">
      {username ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-6 py-8">
            
            {/* Product Selection Section */}
            <Card className="mb-8 shadow-lg border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-6 w-6 text-blue-600" />
                  Select Product to Edit
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search Input */}
                  {/* <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search products by title or category..."
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div> */}

                  {/* Product Dropdown */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Select value={selectedProductId} onValueChange={handleProductSelect}>
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                          <SelectValue placeholder="Choose a product to edit..." />
                        </SelectTrigger>
                        <SelectContent className="max-h-80">
                          {isLoading ? (
                            <SelectItem value="loading" disabled>
                              Loading products...
                            </SelectItem>
                          ) : filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                              <SelectItem key={product.id} value={product.id.toString()}>
                                <div className="flex items-center gap-3 py-2">
                                  <div className="w-10 h-10 relative rounded-md overflow-hidden border">
                                    <Image
                                      src={product.imageUrl}
                                      alt={product.title}
                                      fill
                                      className="object-cover"
                                      onError={(e) => {
                                        e.currentTarget.src = "/placeholder.jpg";
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{product.title}</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">{product.category}</span>
                                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                        ${product.basePrice.toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-products" disabled>
                              {searchTerm ? 'No products match your search' : 'No products available'}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedProduct && (
                      <Button
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="border-gray-300 text-gray-600 hover:bg-gray-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    )}
                  </div>

                  {/* Results count */}
                  <div className="text-sm text-gray-600">
                    {searchTerm && (
                      <span>Showing {filteredProducts.length} of {products.length} products</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Edit Form Section */}
            {selectedProduct && editFormData && (
              <Card className="shadow-xl border border-blue-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Edit3 className="h-6 w-6 text-green-600" />
                      <span>Editing: {selectedProduct.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>ID: {selectedProduct.id}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">{selectedProduct.status}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleUpdateProduct} className="space-y-8">
                    
                    {/* Basic Information */}
                    <div className="bg-gray-50 p-6 rounded-lg border">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="edit-title">Product Title</Label>
                          <Input
                            id="edit-title"
                            value={editFormData.title}
                            onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                            className="border-2 border-gray-200 focus:border-blue-500"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="edit-category">Category</Label>
                          <Select
                            value={editFormData.category}
                            onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                          >
                            <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Furniture">Furniture</SelectItem>
                              <SelectItem value="Electronics">Electronics</SelectItem>
                              <SelectItem value="Baby Item">Baby Item</SelectItem>
                              <SelectItem value="Fashion">Fashion</SelectItem>
                              <SelectItem value="Home Appliance">Home Appliance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editFormData.description}
                          onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                          className="border-2 border-gray-200 focus:border-blue-500 min-h-[100px]"
                          required
                        />
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-green-50 p-6 rounded-lg border">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Pricing
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="edit-basePrice">Base Price ($)</Label>
                        <Input
                          id="edit-basePrice"
                          type="number"
                          step="0.01"
                          min="0"
                          value={editFormData.basePrice || ""}
                          onChange={(e) => setEditFormData({ 
                            ...editFormData, 
                            basePrice: e.target.value ? parseFloat(e.target.value) : 0 
                          })}
                          className="border-2 border-gray-200 focus:border-green-500 max-w-xs"
                          required
                        />
                      </div>
                    </div>

                    {/* Auction Schedule */}
                    <div className="bg-orange-50 p-6 rounded-lg border">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-orange-600" />
                        Auction Schedule
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-600">Auction Start</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-auctionStart">Date</Label>
                              <Input
                                id="edit-auctionStart"
                                type="date"
                                value={editFormData.auctionStart}
                                onChange={(e) => setEditFormData({ ...editFormData, auctionStart: e.target.value })}
                                className="border-2 border-gray-200 focus:border-orange-500"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-auctionStartTime">Time</Label>
                              <Input
                                id="edit-auctionStartTime"
                                type="time"
                                value={editFormData.auctionStartTime}
                                onChange={(e) => setEditFormData({ ...editFormData, auctionStartTime: e.target.value })}
                                className="border-2 border-gray-200 focus:border-orange-500"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-600">Auction End</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-auctionEnd">Date</Label>
                              <Input
                                id="edit-auctionEnd"
                                type="date"
                                value={editFormData.auctionEnd}
                                onChange={(e) => setEditFormData({ ...editFormData, auctionEnd: e.target.value })}
                                className="border-2 border-gray-200 focus:border-orange-500"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-auctionEndTime">Time</Label>
                              <Input
                                id="edit-auctionEndTime"
                                type="time"
                                value={editFormData.auctionEndTime}
                                onChange={(e) => setEditFormData({ ...editFormData, auctionEndTime: e.target.value })}
                                className="border-2 border-gray-200 focus:border-orange-500"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                        disabled={isUpdating}
                        className="px-8"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isUpdating}
                        className="bg-green-600 hover:bg-green-700 text-white px-8"
                      >
                        {isUpdating ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Updating...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            Update Product
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Add Navigation */}
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => router.push('/products/list')}
                className="mr-4"
              >
                View All Products
              </Button>
              <Button
                onClick={() => router.push('/products/create')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
          <div className="bg-white p-12 rounded-2xl shadow-2xl border border-gray-200 text-center max-w-md">
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Authenticating</h3>
            <p className="text-gray-500">Verifying your credentials...</p>
          </div>
        </div>
      )}
    </AppContent>
  );
}