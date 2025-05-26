
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Gavel, TrendingUp, Shield, Clock } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Gavel className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">BidMaster</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The premier online auction platform where you can discover unique items, 
              place competitive bids, and sell your treasures to a global audience.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/browse">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                Start Bidding
              </Button>
            </Link>
            {user ? (
              <Link to="/create-listing">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  List an Item
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  Join BidMaster
                </Button>
              </Link>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Bidding</h3>
              <p className="text-gray-600">Experience the thrill of live auctions with instant bid updates</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-gray-600">Your transactions are protected with enterprise-grade security</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Auctions</h3>
              <p className="text-gray-600">Never miss an opportunity with round-the-clock auction access</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
