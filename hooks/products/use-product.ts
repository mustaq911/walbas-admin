"use client";

import { useState } from "react";

export default function useProduct() {
  const [searchProduct, setSearchProduct] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return {
    searchProduct,
    setSearchProduct,
    openModal,
    setOpenModal,
    selectedProduct,
    setSelectedProduct,
  };
}