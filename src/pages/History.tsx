
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Clock, DollarSign, User } from 'lucide-react';

const History = () => {
  const { user } = useAuth();
  const [biddingHistory, setBiddingHistory] = useState<any[]>([]);
  const [salesHistory, setSalesHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    // Sample bidding history
    const sampleBiddingHistory = [
      {
        id: '1',
        itemTitle: 'Vintage Rolex Submariner',
        yourBid: 8500,
        currentBid: 8500,
        status: 'winning',
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        category: 'Watches'
      },
      {
        id: '2',
        itemTitle: 'Abstract Oil Painting',
        yourBid: 700,
        currentBid: 750,
        status: 'outbid',
        endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
        category: 'Art'
      },
      {
        id: '3',
        itemTitle: 'Rare Baseball Card Collection',
        yourBid: 11500,
        currentBid: 12000,
        status: 'lost',
        endTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        category: 'Collectibles'
      }
    ];

    // Sample sales history
    const sampleSalesHistory = [
      {
        id: '4',
        itemTitle: 'Professional Camera Equipment',
        finalPrice: 3200,
        startingBid: 2500,
        status: 'sold',
        endTime: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        winner: 'Camera Pro Store',
        category: 'Electronics'
      },
      {
        id: '5',
        itemTitle: 'Handcrafted Jewelry Collection',
        finalPrice: 0,
        startingBid: 300,
        status: 'unsold',
        endTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        category: 'Jewelry'
      }
    ];

    setBiddingHistory(sampleBiddingHistory);
    setSalesHistory(sampleSalesHistory);
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'winning': return 'bg-green-500';
      case 'outbid': return 'bg-yellow-500';
      case 'lost': return 'bg-red-500';
      case 'sold': return 'bg-blue-500';
      case 'unsold': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'winning': return 'Winning';
      case 'outbid': return 'Outbid';
      case 'lost': return 'Lost';
      case 'sold': return 'Sold';
      case 'unsold': return 'Unsold';
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to view your history</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Auction History</h1>

        <Tabs defaultValue="bidding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bidding">My Bids</TabsTrigger>
            <TabsTrigger value="sales">My Sales</TabsTrigger>
          </TabsList>

          <TabsContent value="bidding" className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bidding History</h2>
            {biddingHistory.length > 0 ? (
              <div className="grid gap-4">
                {biddingHistory.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.itemTitle}</h3>
                          <Badge variant="outline" className="mb-2">{item.category}</Badge>
                        </div>
                        <Badge className={`${getStatusColor(item.status)} text-white`}>
                          {getStatusText(item.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Your Bid</p>
                          <p className="font-semibold text-green-600">${item.yourBid.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Current Bid</p>
                          <p className="font-semibold">${item.currentBid.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Auction Ends</p>
                          <p className="font-semibold">{new Date(item.endTime).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Time</p>
                          <p className="font-semibold">{new Date(item.endTime).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No bidding history found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales History</h2>
            {salesHistory.length > 0 ? (
              <div className="grid gap-4">
                {salesHistory.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.itemTitle}</h3>
                          <Badge variant="outline" className="mb-2">{item.category}</Badge>
                        </div>
                        <Badge className={`${getStatusColor(item.status)} text-white`}>
                          {getStatusText(item.status)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Starting Bid</p>
                          <p className="font-semibold">${item.startingBid.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Final Price</p>
                          <p className="font-semibold text-green-600">
                            {item.finalPrice > 0 ? `$${item.finalPrice.toLocaleString()}` : 'No bids'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Ended</p>
                          <p className="font-semibold">{new Date(item.endTime).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Winner</p>
                          <p className="font-semibold">{item.winner || 'None'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No sales history found.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default History;
