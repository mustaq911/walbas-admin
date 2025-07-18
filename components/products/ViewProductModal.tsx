import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Layers } from "lucide-react";

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

type ViewProductModalProps = {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
};

export default function ViewProductModal({ product, onClose, onEdit }: ViewProductModalProps) {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.title || "Product Image"}
              width={200}
              height={200}
              className="rounded-md object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.jpg";
              }}
            />
          ) : (
            <div className="w-48 h-48 rounded-md bg-gray-300 flex items-center justify-center">
              <Layers className="h-24 w-24 text-gray-600" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Category:</span> {product.category}
            </div>
            <div>
              <span className="font-medium">Base Price:</span> ${product.basePrice.toFixed(2)}
            </div>
            <div>
              <span className="font-medium">Auction Start:</span> {product.auctionStart || "Not specified"}
            </div>
            <div>
              <span className="font-medium">Auction End:</span> {product.auctionEnd || "Not specified"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={onEdit}>Edit Product</Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}