"use client";
import { useState, useEffect } from "react";
import Axi from "@/services/interceptors/Axi";
import Cookies from "js-cookie";
import { toast } from "sonner";
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
  status?: string;
};

export default function ProductPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [searchProduct, setSearchProduct] = useState("");
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<"create" | "edit" | "view" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.warn("No username found in cookies");
      toast.error("User not authenticated. Please log in.");
      // window.location.href = "/login";
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = category === "all" ? "/api/products/get/all" : `/api/products/search?category=${encodeURIComponent(category)}`;
      console.log('Fetching products from:', url);
      const response = await Axi.get(url);
      console.log('Fetch products response:', response.data);
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
            status: p.status || "UNKNOWN",
          }))
        );
      } else {
        setError("Invalid API response format");
        toast.error("Invalid API response format");
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      const message = error.response?.status === 401
        ? "Unauthorized: Invalid or missing token. Please log in again."
        : error.response?.data?.message || "Failed to load products. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleCreateProduct = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("basePrice", data.basePrice.toString());
    formData.append("auctionStartDate", data.auctionStart); // Already in YYYY-MM-DDTHH:mm:ss
    formData.append("auctionEndDate", data.auctionEnd); // Already in YYYY-MM-DDTHH:mm:ss
    if (data.image) formData.append("image", data.image);

    try {
      const response = await Axi.post("/api/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log('Create product response:', response.data);
      setProducts([...products, response.data]);
      setModalOpen(null);
      toast.success("Product created successfully");
    } catch (error: any) {
      console.error("Error creating product:", error);
      const message = error.response?.status === 401
        ? "Unauthorized: Invalid or missing token. Please log in again."
        : error.response?.data?.message || "Failed to create product";
      toast.error(message);
      throw new Error(message);
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
    formData.append("auctionStartDate", data.auctionStart); // Already in YYYY-MM-DDTHH:mm:ss
    formData.append("auctionEndDate", data.auctionEnd); // Already in YYYY-MM-DDTHH:mm:ss
    if (data.image) formData.append("image", data.image);

    try {
      const response = await Axi.post("/api/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log('Update product response:', response.data);
      setProducts(products.map((p) => (p.id === selectedProduct.id ? response.data : p)));
      setModalOpen(null);
      toast.success("Product updated successfully");
    } catch (error: any) {
      console.error("Error updating product:", error);
      const message = error.response?.status === 401
        ? "Unauthorized: Invalid or missing token. Please log in again."
        : error.response?.data?.message || "Failed to update product";
      toast.error(message);
      throw new Error(message);
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen("view");
  };

  const handleEditProductOpen = (product: Product) => {
    // Split auctionStart and auctionEnd into date and time for form
    const [auctionStart, auctionStartTime] = product.auctionStart.split('T');
    const [auctionEnd, auctionEndTime] = product.auctionEnd.split('T');
    setSelectedProduct({
      ...product,
      auctionStart,
      auctionStartTime: auctionStartTime?.slice(0, 5) || "", // HH:mm
      auctionEnd,
      auctionEndTime: auctionEndTime?.slice(0, 5) || "", // HH:mm
    });
    setModalOpen("edit");
  };

  return (
    <AppContent title="Products">
      {/* {username && (
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Welcome, {username}!</h2>
          <p className="mt-2 text-muted-foreground">Manage your products below.</p>
        </div>
      )} */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 w-full px-6">
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
          <ProductFilterSheet onCategoryChange={handleCategoryChange} />
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