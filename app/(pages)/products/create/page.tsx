"use client";
import React, { useEffect, useState } from 'react';
import AppContent from '@/components/admin/content/app-content';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import CreateProductForm from '@/components/products/CreateProductForm';
import { useRouter } from 'next/navigation';
import Axi from '@/services/interceptors/Axi';

export default function AddProductPage() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.warn('No username found in cookies');
      toast.error('User not authenticated. Please log in.');
      router.push('/login');
    }
  }, [router]);

  const handleCreateProduct = async (data: any) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('basePrice', data.basePrice.toString());
    formData.append('auctionStartDate', data.auctionStart);
    formData.append('auctionEndDate', data.auctionEnd);
    if (data.image) formData.append('image', data.image);

    try {
      const response = await Axi.post('/api/products/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Create product response:', response.data);
      toast.success('Product created successfully');
      router.push('/products/list');
    } catch (error: any) {
      console.error('Error creating product:', error);
      const message =
        error.response?.status === 401
          ? 'Unauthorized: Invalid or missing token. Please log in again.'
          : error.response?.data?.message || 'Failed to create product';
      toast.error(message);
      throw new Error(message);
    }
  };

  return (
    <AppContent title="Add New Product">
      {username ? (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
          <CreateProductForm
            onSubmit={handleCreateProduct}
            onCancel={() => router.push('/products/list')}
            isEdit={false}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="bg-white p-8 rounded-lg shadow-lg border">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-center">Loading user information...</p>
          </div>
        </div>
      )}
    </AppContent>
  );
}