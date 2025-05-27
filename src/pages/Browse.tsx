import React, { useState, useEffect } from 'react';
import ItemCard from '@/components/ItemCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const Browse = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('ending-soon');

  useEffect(() => {
    // Load sample items with relevant images
    const sampleItems = [
      {
        id: '1',
        title: 'Vintage Rolex Submariner',
        description: 'Classic 1960s Rolex Submariner in excellent condition with original box and papers.',
        currentBid: 8500,
        startingBid: 5000,
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        category: 'Watches',
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop'
      },
      {
        id: '2',
        title: 'Abstract Oil Painting',
        description: 'Original abstract oil painting by emerging artist. Signed and authenticated.',
        currentBid: 750,
        startingBid: 500,
        endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
        category: 'Art',
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop'
      },
      {
        id: '3',
        title: 'Antique Victorian Furniture Set',
        description: 'Beautiful Victorian-era dining set including table and 6 chairs. Recently restored.',
        currentBid: 2200,
        startingBid: 1500,
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        category: 'Furniture',
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
      },
      {
        id: '4',
        title: 'Rare Baseball Card Collection',
        description: 'Complete 1952 Topps baseball card set in near mint condition.',
        currentBid: 12000,
        startingBid: 8000,
        endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        category: 'Collectibles',
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
      },
      {
        id: '5',
        title: 'Professional Camera Equipment',
        description: 'Canon EOS R5 with 24-70mm f/2.8 lens and professional accessories.',
        currentBid: 3200,
        startingBid: 2500,
        endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        category: 'Electronics',
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop'
      },
      {
        id: '6',
        title: 'Handcrafted Jewelry Collection',
        description: 'Exquisite handcrafted silver jewelry set with natural gemstones.',
        currentBid: 450,
        startingBid: 300,
        endTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        category: 'Jewelry',
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop'
      },
      {
        id: '7',
        title: 'Vintage Gibson Les Paul Guitar',
        description: '1959 Gibson Les Paul Standard in excellent condition. A true collectors piece.',
        currentBid: 15000,
        startingBid: 12000,
        endTime: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
        category: 'Music',
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop'
      },
      {
        id: '8',
        title: 'First Edition Harry Potter Book Set',
        description: 'Complete first edition set of Harry Potter books in pristine condition.',
        currentBid: 3500,
        startingBid: 2000,
        endTime: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
        category: 'Books',
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
      },
      {
        id: '9',
        title: 'Vintage Porsche 911 Parts',
        description: 'Authentic vintage Porsche 911 parts including original wheels and engine components.',
        currentBid: 5200,
        startingBid: 3500,
        endTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        category: 'Automotive',
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop'
      },
      {
        id: '10',
        title: 'Antique Persian Rug',
        description: 'Beautiful hand-woven Persian rug from the 19th century. Museum quality.',
        currentBid: 4800,
        startingBid: 3000,
        endTime: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString(),
        category: 'Art',
        status: 'active' as const,
        imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop'
      }
    ];
    
    // Load user-created items from localStorage
    const userItems = JSON.parse(localStorage.getItem('bidmaster_items') || '[]');
    
    // Combine sample items with user-created items
    const allItems = [...sampleItems, ...userItems];
    setItems(allItems);
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'ending-soon':
        return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
      case 'highest-bid':
        return b.currentBid - a.currentBid;
      case 'lowest-bid':
        return a.currentBid - b.currentBid;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Browse Auctions</h1>
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Art">Art</SelectItem>
                <SelectItem value="Watches">Watches</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Collectibles">Collectibles</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Jewelry">Jewelry</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Automotive">Automotive</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="highest-bid">Highest Bid</SelectItem>
                <SelectItem value="lowest-bid">Lowest Bid</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
