// @/hooks/products/use-product.ts
import { useState } from "react";

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

export default function useProduct() {
  const [searchProduct, setSearchProduct] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return {
    searchProduct,
    setSearchProduct,
    openModal,
    setOpenModal,
    selectedProduct,
    setSelectedProduct,
  };
}