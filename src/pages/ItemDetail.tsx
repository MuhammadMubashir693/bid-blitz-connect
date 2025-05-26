
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Clock, DollarSign, User, Gavel, ArrowLeft } from 'lucide-react';

const ItemDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidHistory, setBidHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const sampleItems = [
      {
        id: '1',
        title: 'Vintage Rolex Submariner',
        description: 'Classic 1960s Rolex Submariner in excellent condition with original box and papers. This timepiece has been carefully maintained and serviced regularly. The dial shows beautiful patina consistent with its age, and the movement runs perfectly. Includes original Rolex box, papers, and service records.',
        currentBid: 8500,
        startingBid: 5000,
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        category: 'Watches',
        status: 'active',
        sellerId: 'seller1',
        sellerName: 'John Collector'
      }
    ];

    const foundItem = sampleItems.find(item => item.id === id);
    if (foundItem) {
      setItem(foundItem);
      setBidAmount((foundItem.currentBid + 50).toString());
      
      // Sample bid history
      setBidHistory([
        { id: '1', bidder: 'Alice M.', amount: 8500, timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
        { id: '2', bidder: 'Bob K.', amount: 8200, timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
        { id: '3', bidder: 'Carol S.', amount: 7900, timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
      ]);
    }
  }, [id]);

  const handlePlaceBid = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to place a bid.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    const bidValue = parseFloat(bidAmount);
    if (bidValue <= item.currentBid) {
      toast({
        title: "Invalid bid",
        description: `Bid must be higher than current bid of $${item.currentBid}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update item and bid history
      const newBid = {
        id: Date.now().toString(),
        bidder: user.name,
        amount: bidValue,
        timestamp: new Date().toISOString()
      };
      
      setItem({ ...item, currentBid: bidValue });
      setBidHistory([newBid, ...bidHistory]);
      setBidAmount((bidValue + 50).toString());
      
      toast({
        title: "Bid placed successfully!",
        description: `Your bid of $${bidValue} has been placed.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place bid. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <Button onClick={() => navigate('/browse')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  const timeRemaining = new Date(item.endTime).getTime() - new Date().getTime();
  const hoursRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)));
  const minutesRemaining = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          onClick={() => navigate('/browse')} 
          variant="outline" 
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Item Image and Details */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg flex items-center justify-center">
                  <div className="text-gray-500 text-lg font-medium">No Image Available</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{item.category}</Badge>
                    <Badge className={item.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                      {item.status}
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h1>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{item.sellerName}</p>
                <p className="text-sm text-gray-600">Member since 2020</p>
              </CardContent>
            </Card>
          </div>

          {/* Bidding Section */}
          <div className="space-y-6">
            {/* Current Bid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gavel className="h-5 w-5 mr-2" />
                  Current Bid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ${item.currentBid.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Starting bid: ${item.startingBid.toLocaleString()}
                  </div>
                </div>

                {item.status === 'active' && (
                  <div className="flex items-center justify-center space-x-2 text-orange-600 mb-6">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">
                      {hoursRemaining}h {minutesRemaining}m remaining
                    </span>
                  </div>
                )}

                {item.status === 'active' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Bid ($)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="Enter bid amount"
                      />
                    </div>
                    <Button
                      onClick={handlePlaceBid}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Placing Bid...' : 'Place Bid'}
                    </Button>
                  </div>
                )}

                {item.status === 'ended' && (
                  <div className="text-center py-4">
                    <p className="text-lg font-medium text-red-600">Auction Ended</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card>
              <CardHeader>
                <CardTitle>Bid History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {bidHistory.map((bid) => (
                    <div key={bid.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{bid.bidder}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(bid.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${bid.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {bidHistory.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No bids yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
