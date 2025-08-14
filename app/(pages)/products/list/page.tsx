"use client";
import React, { useEffect, useState, useCallback } from 'react';
import AppContent from '@/components/admin/content/app-content';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Search, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductFilterSheet from '@/components/products/ProductFilterSheet';
import ProductList from '@/components/products/ProductList';
import { useRouter } from 'next/navigation';
import Axi from '@/services/interceptors/Axi';

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

export default function ListProductPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [searchProduct, setSearchProduct] = useState('');
  const [category, setCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url =
        category === 'all' ? '/api/products/get/all' : `/api/products/search?category=${encodeURIComponent(category)}`;
      console.log('Fetching products from:', url);
      const response = await Axi.get(url);
      console.log('Fetch products response:', response.data);
      if (Array.isArray(response.data)) {
        setProducts(
          response.data.map((p: any) => ({
            id: Number(p.id) || 0,
            title: p.title || 'Unknown',
            description: p.description || '',
            category: p.category || 'Uncategorized',
            imageUrl: p.imageUrl || '/placeholder.jpg',
            basePrice: Number(p.basePrice) || 0,
            auctionStart: p.auctionStart || '',
            auctionEnd: p.auctionEnd || '',
            status: p.status || 'UNKNOWN',
          }))
        );
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
  }, [category]);

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
  }, [fetchProducts]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  return (
    <AppContent title="Product Management">
      {username ? (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
          {/* Search and Filter Section */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search products by title..."
                      className="pl-12 h-12 w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm transition-all duration-200"
                      value={searchProduct}
                      onChange={(e) => setSearchProduct(e.target.value)}
                    />
                  </div>
                  <div className="bg-gray-50 rounded-xl p-1">
                    <ProductFilterSheet onCategoryChange={handleCategoryChange} />
                  </div>
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                  Showing {products.filter(p => p.title.toLowerCase().includes(searchProduct.toLowerCase())).length} results
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-700">Loading Products</h3>
                  <p className="text-gray-500">Please wait while we fetch your products...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Package className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Products</h3>
                  <p className="text-red-500 text-center max-w-md">{error}</p>
                  <Button 
                    onClick={fetchProducts}
                    variant="outline"
                    className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <ProductList
                  searchProduct={searchProduct}
                  products={products}
                  setProducts={setProducts}
                  onViewProduct={(product) => router.push(`/products/view?id=${product.id}`)}
                  onEditProduct={(product) => router.push(`/products/update?id=${product.id}`)}
                />
              )}
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