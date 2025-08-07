"use client";
import { useState, useEffect } from "react";
import Axi from "@/services/interceptors/Axi";
import Cookies from "js-cookie";
import { toast } from "sonner";
import AppContent from "@/components/admin/content/app-content";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, List, Grid } from "lucide-react";

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
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [auctionDetails, setAuctionDetails] = useState<AuctionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true); // Toggle between Grid and List view

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
      const response = await Axi.get("/api/products/get/allAuction");
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

  const fetchAuctionDetails = async (id: number) => {
    try {
      const response = await Axi.get(`/api/products/get/allAuctionDetails?id=${id}`);
      console.log('Fetch auction details response:', response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setAuctionDetails(response.data[0]);
        setModalOpen(true);
      } else {
        toast.error("No details found for this auction");
      }
    } catch (error: any) {
      console.error("Error fetching auction details:", error);
      toast.error("Failed to load auction details");
    }
  };

  const filteredAuctions = auctions.filter((auction) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "ongoing") return auction.status === "ONGOING";
    if (selectedTab === "completed") return auction.status === "COMPLETED";
    return false;
  });

  return (
    <AppContent title="Auction Management">
      {/* {username && (
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Welcome, {username}!</h2>
          <p className="mt-2 text-muted-foreground">Manage your auctions below.</p>
        </div>
      )} */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsGridView(!isGridView)}
            className="ml-4"
          >
            {isGridView ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
        </div>
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "overflow-x-auto"}>
            {isGridView ? (
              filteredAuctions.map((auction) => (
                <Card
                  key={auction.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="p-2 bg-gray-50">
                    <CardTitle className="text-sm font-bold text-gray-800">
                      {auction.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-600">
                      {auction.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2">
                    <img
                      src={auction.imageUrl}
                      alt={auction.title}
                      className="w-full h-24 object-cover rounded-md"
                      onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                    />
                    <div className="mt-1 space-y-1">
                      <p className="text-xs text-gray-700">
                        Base Price: ${auction.basePrice.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-700">
                        Start: {new Date(auction.auctionStart).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-700">
                        End: {new Date(auction.auctionEnd).toLocaleString()}
                      </p>
                      <p className="text-xs font-medium text-blue-600">
                        {auction.status}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 bg-gray-50">
                    <Button
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => fetchAuctionDetails(auction.id)}
                    >
                      <Eye className="mr-2 h-3 w-3" /> View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="p-2 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="p-2 text-left text-sm font-semibold text-gray-700">Base Price</th>
                    <th className="p-2 text-left text-sm font-semibold text-gray-700">Auction Start</th>
                    <th className="p-2 text-left text-sm font-semibold text-gray-700">Auction End</th>
                    <th className="p-2 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="p-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAuctions.map((auction) => (
                    <tr key={auction.id} className="border-t hover:bg-gray-50">
                      <td className="p-2 text-sm text-gray-800">{auction.title}</td>
                      <td className="p-2 text-sm text-gray-600">{auction.category}</td>
                      <td className="p-2 text-sm text-gray-600">${auction.basePrice.toFixed(2)}</td>
                      <td className="p-2 text-sm text-gray-600">{new Date(auction.auctionStart).toLocaleString()}</td>
                      <td className="p-2 text-sm text-gray-600">{new Date(auction.auctionEnd).toLocaleString()}</td>
                      <td className="p-2 text-sm font-medium text-blue-600">{auction.status}</td>
                      <td className="p-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fetchAuctionDetails(auction.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{auctionDetails?.product.title} Details</DialogTitle>
            </DialogHeader>
            {auctionDetails && (
              <div className="space-y-4 p-4">
                <img
                  src={auctionDetails.product.imageUrl}
                  alt={auctionDetails.product.title}
                  className="w-full h-48 object-cover rounded-md"
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <p><strong>Category:</strong> {auctionDetails.product.category}</p>
                  <p><strong>Base Price:</strong> ${auctionDetails.product.basePrice.toFixed(2)}</p>
                  <p><strong>Start:</strong> {new Date(auctionDetails.product.auctionStart).toLocaleString()}</p>
                  <p><strong>End:</strong> {new Date(auctionDetails.product.auctionEnd).toLocaleString()}</p>
                  <p><strong>Status:</strong> {auctionDetails.product.status}</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Bids</h3>
                  <div className="max-h-60 overflow-y-auto">
                    {auctionDetails.bids.length > 0 ? (
                      <ul className="space-y-2 mt-2">
                        {auctionDetails.bids
                          .sort((a, b) => new Date(b.bidTime).getTime() - new Date(a.bidTime).getTime())
                          .map((bid) => (
                            <li key={bid.id} className="p-2 bg-gray-50 rounded-md">
                              <p><strong>User:</strong> {bid.username}</p>
                              <p><strong>Amount:</strong> ${bid.bidAmount.toFixed(2)}</p>
                              <p><strong>Time:</strong> {new Date(bid.bidTime).toLocaleString()}</p>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No bids yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppContent>
  );
}