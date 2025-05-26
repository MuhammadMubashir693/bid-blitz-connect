
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
    // Load sample items - in a real app, this would come from an API
    const sampleItems = [
      {
        id: '1',
        title: 'Vintage Rolex Submariner',
        description: 'Classic 1960s Rolex Submariner in excellent condition with original box and papers.',
        currentBid: 8500,
        startingBid: 5000,
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        category: 'Watches',
        status: 'active' as const
      },
      {
        id: '2',
        title: 'Abstract Oil Painting',
        description: 'Original abstract oil painting by emerging artist. Signed and authenticated.',
        currentBid: 750,
        startingBid: 500,
        endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours from now
        category: 'Art',
        status: 'active' as const
      },
      {
        id: '3',
        title: 'Antique Victorian Furniture Set',
        description: 'Beautiful Victorian-era dining set including table and 6 chairs. Recently restored.',
        currentBid: 2200,
        startingBid: 1500,
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        category: 'Furniture',
        status: 'active' as const
      },
      {
        id: '4',
        title: 'Rare Baseball Card Collection',
        description: 'Complete 1952 Topps baseball card set in near mint condition.',
        currentBid: 12000,
        startingBid: 8000,
        endTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // Ended 1 hour ago
        category: 'Collectibles',
        status: 'ended' as const
      },
      {
        id: '5',
        title: 'Professional Camera Equipment',
        description: 'Canon EOS R5 with 24-70mm f/2.8 lens and professional accessories.',
        currentBid: 3200,
        startingBid: 2500,
        endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
        category: 'Electronics',
        status: 'active' as const
      },
      {
        id: '6',
        title: 'Handcrafted Jewelry Collection',
        description: 'Exquisite handcrafted silver jewelry set with natural gemstones.',
        currentBid: 450,
        startingBid: 300,
        endTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours from now
        category: 'Jewelry',
        status: 'active' as const
      }
    ];
    
    setItems(sampleItems);
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
