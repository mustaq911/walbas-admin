"use client";
import { useState, useEffect } from "react";
import Axi from "@/services/interceptors/Axi";
import Cookies from "js-cookie";
import { toast } from "sonner";
import AppContent from "@/components/admin/content/app-content";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight, Eye } from "lucide-react";

type Auction = {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  basePrice: number;
  auctionStart: string;
  auctionEnd: string;
  status: string;
};

type Bid = {
  id: number;
  productId: number;
  userId: number;
  bidAmount: number;
  bidTime: string;
  username: string;
};

type AuctionDetail = {
  product: Auction;
  bids: Bid[];
};

export default function AuctionPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [auctions, setAuctions] = useState<AuctionDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const [expandedAuction, setExpandedAuction] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.warn("No username found in cookies");
      toast.error("User not authenticated. Please log in.");
    }
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Axi.get("/api/products/get/allAuctionDetails");
      console.log('Fetch auctions response:', response.data);
      if (Array.isArray(response.data)) {
        setAuctions(response.data);
      } else {
        setError("Invalid API response format");
        toast.error("Invalid API response format");
      }
    } catch (error: any) {
      console.error("Error fetching auctions:", error);
      const message = error.response?.status === 401
        ? "Unauthorized: Invalid or missing token. Please log in again."
        : error.response?.data?.message || "Failed to load auctions. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAuctions = auctions.filter((auction) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "ongoing") return auction.product.status === "ONGOING";
    if (selectedTab === "completed") return auction.product.status === "COMPLETED";
    return false;
  });

  const toggleExpandAuction = (id: number) => {
    setExpandedAuction(expandedAuction === id ? null : id);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const paginatedAuctions = filteredAuctions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === "ONGOING") {
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>Ongoing</span>;
    } else if (status === "COMPLETED") {
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>Completed</span>;
    } else {
      return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <AppContent title="Auction Management">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="all">All Auctions</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading auctions...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Base Price</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bids</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAuctions.length > 0 ? (
                    paginatedAuctions.map((auction) => (
                      <>
                        <TableRow key={auction.product.id} className="hover:bg-gray-50">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpandAuction(auction.product.id)}
                            >
                              {expandedAuction === auction.product.id ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <img
                                src={auction.product.imageUrl}
                                alt={auction.product.title}
                                className="w-10 h-10 object-cover rounded-md mr-3"
                                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                              />
                              <div>
                                <div className="font-medium">{auction.product.title}</div>
                                <div className="text-xs text-gray-500 line-clamp-1">{auction.product.description}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{auction.product.category}</TableCell>
                          <TableCell>${auction.product.basePrice.toFixed(2)}</TableCell>
                          <TableCell>{new Date(auction.product.auctionStart).toLocaleString()}</TableCell>
                          <TableCell>{new Date(auction.product.auctionEnd).toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(auction.product.status)}</TableCell>
                          <TableCell>{auction.bids.length}</TableCell>
                        </TableRow>
                        {expandedAuction === auction.product.id && (
                          <TableRow className="bg-gray-50">
                            <TableCell colSpan={8}>
                              <div className="p-4">
                                <h4 className="font-medium mb-2">Bidding History</h4>
                                {auction.bids.length > 0 ? (
                                  <div className="border rounded-md overflow-hidden">
                                    <Table>
                                      <TableHeader className="bg-gray-100">
                                        <TableRow>
                                          <TableHead>Bidder</TableHead>
                                          <TableHead>Amount</TableHead>
                                          <TableHead>Time</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {auction.bids
                                          .sort((a, b) => new Date(b.bidTime).getTime() - new Date(a.bidTime).getTime())
                                          .map((bid) => (
                                            <TableRow key={bid.id}>
                                              <TableCell>{bid.username}</TableCell>
                                              <TableCell className="font-medium">
                                                ${bid.bidAmount.toFixed(2)}
                                              </TableCell>
                                              <TableCell>{new Date(bid.bidTime).toLocaleString()}</TableCell>
                                            </TableRow>
                                          ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                ) : (
                                  <div className="text-center py-4 text-gray-500">
                                    No bids placed yet
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No auctions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredAuctions.length > itemsPerPage && (
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredAuctions.length)} of{" "}
                  {filteredAuctions.length} auctions
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AppContent>
  );
}