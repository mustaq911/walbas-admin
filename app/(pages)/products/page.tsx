"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import AppContent from "@/components/admin/content/app-content";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/modal/app-modal";
import ProductFilterSheet from "@/components/products/ProductFilterSheet";
import ProductList from "@/components/products/ProductList";
import CreateProductForm from "@/components/products/CreateProductForm";
import useProduct from "@/hooks/products/use-product";

// Define Product type
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

export default function ProductPage() {
  const { searchProduct, setSearchProduct, openModal, setOpenModal, selectedProduct, setSelectedProduct } = useProduct();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/all`);
      // Transform API data to ensure id is a number
      setProducts(response.data.map((p: Product) => ({
        ...p,
        id: Number(p.id), // Convert id to number, assuming API returns id
      })));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductSaved = async () => {
    await fetchProducts();
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  return (
    <AppContent title="Products">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-8 w-full"
              value={searchProduct || ""}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </div>
          <ProductFilterSheet />
        </div>
        <AppModal
          title={selectedProduct ? "Edit Product" : "Add Product"}
          description="Product Details"
          open={openModal}
          setOpen={setOpenModal}
          button={
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          }
        >
          <CreateProductForm
            selectedProduct={selectedProduct}
            onProductSaved={handleProductSaved}
          />
        </AppModal>
      </div>
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <ProductList
          searchProduct={searchProduct}
          products={products}
          setProducts={setProducts}
          onEditProduct={handleEditProduct}
        />
      )}
    </AppContent>
  );
}