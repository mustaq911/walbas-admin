"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import AppContent from "@/components/admin/content/app-content";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductFilterSheet from "@/components/products/ProductFilterSheet";
import ProductList from "@/components/products/ProductList";
import CreateProductForm from "@/components/products/CreateProductForm";
import ViewProductModal from "@/components/products/ViewProductModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [searchProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<"create" | "edit" | "view" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/products/get/all");
      if (Array.isArray(response.data)) {
        setProducts(
          response.data.map((p: any) => ({
            id: Number(p.id) || 0,
            title: p.title || "Unknown",
            description: p.description || "",
            category: p.category || "Uncategorized",
            imageUrl: p.imageUrl || "/placeholder.jpg",
            basePrice: Number(p.basePrice) || 0,
            auctionStart: p.auctionStart || "",
            auctionEnd: p.auctionEnd || "",
          }))
        );
      } else {
        setError("Invalid API response format");
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      setError(error.response?.data?.message || "Failed to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("basePrice", data.basePrice.toString());
    formData.append("auctionStartDate", data.auctionStart);
    formData.append("auctionEndDate", data.auctionEnd);
    if (data.image) formData.append("image", data.image);

    try {
      const response = await axios.post("/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts([...products, response.data]);
      setModalOpen(null);
    } catch (error) {
      throw error;
    }
  };

  const handleEditProduct = async (data: any) => {
    if (!selectedProduct) return;
    const formData = new FormData();
    formData.append("id", selectedProduct.id.toString());
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("basePrice", data.basePrice.toString());
    formData.append("auctionStartDate", data.auctionStart);
    formData.append("auctionEndDate", data.auctionEnd);
    if (data.image) formData.append("image", data.image);

    try {
      const response = await axios.post("/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts(products.map((p) => (p.id === selectedProduct.id ? response.data : p)));
      setModalOpen(null);
    } catch (error) {
      throw error;
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen("view");
  };

  const handleEditProductOpen = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen("edit");
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
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </div>
          <ProductFilterSheet />
        </div>
        <Button onClick={() => setModalOpen("create")} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : (
        <ProductList
          searchProduct={searchProduct}
          products={products}
          setProducts={setProducts}
          onViewProduct={handleViewProduct}
          onEditProduct={handleEditProductOpen}
        />
      )}
      <Dialog open={modalOpen !== null} onOpenChange={() => setModalOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalOpen === "create" ? "Create Product" : modalOpen === "edit" ? "Edit Product" : "Product Details"}
            </DialogTitle>
          </DialogHeader>
          {modalOpen === "view" && selectedProduct && (
            <ViewProductModal
              product={selectedProduct}
              onClose={() => setModalOpen(null)}
              onEdit={() => setModalOpen("edit")}
            />
          )}
          {(modalOpen === "create" || modalOpen === "edit") && (
            <CreateProductForm
              product={modalOpen === "edit" && selectedProduct ? { ...selectedProduct, image: null } : undefined}
              onSubmit={modalOpen === "create" ? handleCreateProduct : handleEditProduct}
              onCancel={() => setModalOpen(null)}
              isEdit={modalOpen === "edit"}
            />
          )}
        </DialogContent>
      </Dialog>
    </AppContent>
  );
}