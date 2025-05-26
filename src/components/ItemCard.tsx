
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign } from 'lucide-react';

interface ItemCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    currentBid: number;
    startingBid: number;
    endTime: string;
    imageUrl?: string;
    category: string;
    status: 'active' | 'ended' | 'upcoming';
  };
}

const ItemCard = ({ item }: ItemCardProps) => {
  const timeRemaining = new Date(item.endTime).getTime() - new Date().getTime();
  const hoursRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)));
  const minutesRemaining = Math.max(0, Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'ended': return 'bg-red-500';
      case 'upcoming': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-500 text-lg font-medium">No Image</div>
          )}
        </div>
        <Badge className={`absolute top-2 right-2 ${getStatusColor(item.status)} text-white`}>
          {item.status}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-bold text-green-600">${item.currentBid}</span>
          </div>
          {item.status === 'active' && (
            <div className="flex items-center space-x-1 text-orange-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">
                {hoursRemaining}h {minutesRemaining}m
              </span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/item/${item.id}`} className="w-full">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            {item.status === 'active' ? 'Place Bid' : 'View Details'}
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
