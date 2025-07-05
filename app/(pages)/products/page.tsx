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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://3.128.212.155:8081";

export default function ProductPage() {
  const { searchProduct, setSearchProduct, openModal, setOpenModal, selectedProduct, setSelectedProduct } = useProduct();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/products/all`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
        >
          <CreateProductForm
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            setOpenModal={setOpenModal}
            setProducts={setProducts}
          />
        </AppModal>
        <Button className="w-full sm:w-auto" onClick={() => {
          setSelectedProduct(null);
          setOpenModal(true);
        }}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <ProductList searchProduct={searchProduct} products={products} setProducts={setProducts} setSelectedProduct={setSelectedProduct} setOpenModal={setOpenModal} />
      )}
    </AppContent>
  );
}