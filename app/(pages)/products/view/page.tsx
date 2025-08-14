"use client";
import React, { useEffect, useState, useCallback } from 'react';
import AppContent from '@/components/admin/content/app-content';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Search, Plus, Eye, Calendar, DollarSign, Tag, Clock, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

export default function ViewProductPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleProductSelect = async (productId: string) => {
    setSelectedProductId(productId);
    setIsLoadingProduct(true);
    
    try {
      const response = await Axi.get(`/api/products/${productId}`);
      console.log('Fetch product details response:', response.data);
      
      const product = {
        id: Number(response.data.id) || 0,
        title: response.data.title || 'Unknown',
        description: response.data.description || '',
        category: response.data.category || 'Uncategorized',
        imageUrl: response.data.imageUrl || '/placeholder.jpg',
        basePrice: Number(response.data.basePrice) || 0,
        auctionStart: response.data.auctionStart || '',
        auctionEnd: response.data.auctionEnd || '',
        status: response.data.status || 'UNKNOWN',
      };
      
      setSelectedProduct(product);
      toast.success('Product loaded successfully');
    } catch (error: any) {
      console.error('Error fetching product details:', error);
      const message = error.response?.data?.message || 'Failed to load product details';
      toast.error(message);
      setSelectedProduct(null);
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedProduct(null);
    setSelectedProductId('');
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'Not set';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status?: string) => {
    const statusConfig = {
      'ACTIVE': { color: 'bg-green-100 text-green-800 border-green-200', label: 'Active' },
      'PENDING': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      'COMPLETED': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Completed' },
      'CANCELLED': { color: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelled' },
      'ONGOING': { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Ongoing' },
      'UNKNOWN': { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Unknown' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.UNKNOWN;
    return (
      <Badge className={`${config.color} border font-medium px-3 py-1 text-sm`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <AppContent title="View Products">
      {username ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-6 py-8">
            
            {/* Product Selection Section */}
            <Card className="mb-8 shadow-lg border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-6 w-6 text-blue-600" />
                  Select Product to View
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
                          <SelectValue placeholder="Choose a product to view..." />
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
                        onClick={handleClearSelection}
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

            {/* Product Details Section */}
            {isLoadingProduct ? (
              <Card className="shadow-xl border border-blue-200">
                <CardContent className="p-20 text-center">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-700">Loading Product Details</h3>
                  <p className="text-gray-500">Please wait while we fetch the product information...</p>
                </CardContent>
              </Card>
            ) : selectedProduct ? (
              <Card className="shadow-xl border border-gray-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-6 w-6 text-green-600" />
                      <span>Product Details</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">ID: {selectedProduct.id}</span>
                      {getStatusBadge(selectedProduct.status)}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Product Image */}
                    <div className="lg:col-span-1">
                      <div className="relative w-full h-80 rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
                        <Image
                          src={selectedProduct.imageUrl}
                          alt={selectedProduct.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.jpg";
                          }}
                        />
                      </div>
                    </div>

                    {/* Product Information */}
                    <div className="lg:col-span-2 space-y-6">
                      
                      {/* Basic Info */}
                      <div className="bg-gray-50 p-6 rounded-lg border">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedProduct.title}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Tag className="h-5 w-5 text-purple-600" />
                            <span className="font-medium text-gray-700">Category:</span>
                            <Badge className="bg-purple-100 text-purple-800 border border-purple-200">
                              {selectedProduct.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-gray-700">Base Price:</span>
                            <span className="text-2xl font-bold text-green-600">
                              ${selectedProduct.basePrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-blue-50 p-6 rounded-lg border">
                        <h4 className="font-semibold text-gray-700 mb-3">Description</h4>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedProduct.description || 'No description available'}
                        </p>
                      </div>

                      {/* Auction Details */}
                      <div className="bg-orange-50 p-6 rounded-lg border">
                        <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-orange-600" />
                          Auction Schedule
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                              <Clock className="h-4 w-4 text-green-500" />
                              Start Time
                            </div>
                            <p className="text-gray-800 font-medium">
                              {formatDateTime(selectedProduct.auctionStart)}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                              <Clock className="h-4 w-4 text-red-500" />
                              End Time
                            </div>
                            <p className="text-gray-800 font-medium">
                              {formatDateTime(selectedProduct.auctionEnd)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-4 pt-4 border-t">
                        <Button
                          onClick={() => router.push(`/products/update?id=${selectedProduct.id}`)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Edit Product
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => window.open(selectedProduct.imageUrl, '_blank')}
                          className="border-gray-300"
                        >
                          View Full Image
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl border border-gray-200">
                <CardContent className="p-20 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Product Selected</h3>
                  <p className="text-gray-500 mb-6">
                    Choose a product from the dropdown above to view its details
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
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