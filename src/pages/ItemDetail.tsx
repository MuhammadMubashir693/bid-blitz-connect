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
    // Load complete sample items dataset with relevant images
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
        sellerName: 'John Collector',
        imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop'
      },
      {
        id: '2',
        title: 'Abstract Oil Painting',
        description: 'Original abstract oil painting by emerging artist. Signed and authenticated. This piece showcases vibrant colors and dynamic brushwork that captures the essence of modern abstract expressionism. Perfect for contemporary art collectors.',
        currentBid: 750,
        startingBid: 500,
        endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
        category: 'Art',
        status: 'active',
        sellerId: 'seller2',
        sellerName: 'Maria Artist',
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop'
      },
      {
        id: '3',
        title: 'Antique Victorian Furniture Set',
        description: 'Beautiful Victorian-era dining set including table and 6 chairs. Recently restored with attention to historical accuracy. The mahogany wood features intricate carvings and the upholstery has been professionally reupholstered with period-appropriate fabric.',
        currentBid: 2200,
        startingBid: 1500,
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        category: 'Furniture',
        status: 'active',
        sellerId: 'seller3',
        sellerName: 'Robert Antiques',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
      },
      {
        id: '4',
        title: 'Rare Baseball Card Collection',
        description: 'Complete 1952 Topps baseball card set in near mint condition. This legendary set includes Mickey Mantle rookie card and other Hall of Fame players. Cards have been professionally graded and stored in protective cases.',
        currentBid: 12000,
        startingBid: 8000,
        endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        category: 'Collectibles',
        status: 'active',
        sellerId: 'seller4',
        sellerName: 'Sports Collectibles Inc',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
      },
      {
        id: '5',
        title: 'Professional Camera Equipment',
        description: 'Canon EOS R5 with 24-70mm f/2.8 lens and professional accessories. Barely used, in excellent condition. Includes camera bag, extra batteries, memory cards, and lens filters. Perfect for professional photographers or serious enthusiasts.',
        currentBid: 3200,
        startingBid: 2500,
        endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        category: 'Electronics',
        status: 'active',
        sellerId: 'seller5',
        sellerName: 'Photo Pro Equipment',
        imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop'
      },
      {
        id: '6',
        title: 'Handcrafted Jewelry Collection',
        description: 'Exquisite handcrafted silver jewelry set with natural gemstones. Each piece is unique and made by skilled artisans. The set includes necklace, earrings, and bracelet featuring turquoise, amethyst, and other precious stones.',
        currentBid: 450,
        startingBid: 300,
        endTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        category: 'Jewelry',
        status: 'active',
        sellerId: 'seller6',
        sellerName: 'Artisan Jewelers',
        imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop'
      },
      {
        id: '7',
        title: 'Vintage Gibson Les Paul Guitar',
        description: '1959 Gibson Les Paul Standard in excellent condition. A true collectors piece with original PAF pickups and beautiful flame maple top. This guitar has been well-maintained and plays beautifully. Includes original hard case.',
        currentBid: 15000,
        startingBid: 12000,
        endTime: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
        category: 'Music',
        status: 'active',
        sellerId: 'seller7',
        sellerName: 'Vintage Instruments',
        imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop'
      },
      {
        id: '8',
        title: 'First Edition Harry Potter Book Set',
        description: 'Complete first edition set of Harry Potter books in pristine condition. All seven books are first UK editions with dust jackets. Perfect for collectors of rare books and Harry Potter memorabilia.',
        currentBid: 3500,
        startingBid: 2000,
        endTime: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
        category: 'Books',
        status: 'active',
        sellerId: 'seller8',
        sellerName: 'Rare Books Dealer',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
      },
      {
        id: '9',
        title: 'Vintage Porsche 911 Parts',
        description: 'Authentic vintage Porsche 911 parts including original wheels and engine components. Perfect for restoration projects or collectors. All parts are genuine Porsche and in good condition.',
        currentBid: 5200,
        startingBid: 3500,
        endTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        category: 'Automotive',
        status: 'active',
        sellerId: 'seller9',
        sellerName: 'Classic Car Parts',
        imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop'
      },
      {
        id: '10',
        title: 'Antique Persian Rug',
        description: 'Beautiful hand-woven Persian rug from the 19th century. Museum quality with intricate patterns and rich colors. This rug has been professionally cleaned and appraised. A true work of art for any home.',
        currentBid: 4800,
        startingBid: 3000,
        endTime: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString(),
        category: 'Art',
        status: 'active',
        sellerId: 'seller10',
        sellerName: 'Oriental Rug Gallery',
        imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop'
      }
    ];

    // Load user-created items from localStorage
    const userItems = JSON.parse(localStorage.getItem('bidmaster_items') || '[]');
    
    // Combine sample items with user-created items
    const allItems = [...sampleItems, ...userItems];
    
    const foundItem = allItems.find(item => item.id === id);
    if (foundItem) {
      setItem(foundItem);
      setBidAmount((foundItem.currentBid + 50).toString());
      
      // Generate sample bid history for each item
      setBidHistory([
        { id: '1', bidder: 'Alice M.', amount: foundItem.currentBid, timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
        { id: '2', bidder: 'Bob K.', amount: foundItem.currentBid - 300, timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
        { id: '3', bidder: 'Carol S.', amount: foundItem.startingBid, timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
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
                <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg flex items-center justify-center overflow-hidden">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 text-lg font-medium">No Image Available</div>
                  )}
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
                <p className="font-medium">{item.sellerName || 'Anonymous Seller'}</p>
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
