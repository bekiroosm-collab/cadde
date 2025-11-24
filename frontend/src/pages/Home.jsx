import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('/match');
        setMatches(res.data);
      } catch (error) {
        console.error("Error fetching matches", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading matches...</div>;

  return (
    <div className="p-4 pt-6 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Nearby Matches</h1>
        <Link to="/create-match" className="text-primary text-sm font-semibold">Create New</Link>
      </div>

      <div className="space-y-4">
        {matches.length === 0 ? (
           <div className="text-center py-10 text-gray-500">
               No matches found. Create one!
           </div>
        ) : (
            matches.map((match) => (
            <Link to={`/match/${match._id}`} key={match._id} className="block group">
                <div className="bg-dark border border-gray-800 rounded-xl p-4 transition-all group-hover:border-primary/50 relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{match.title}</h3>
                        <div className="flex items-center text-gray-400 text-xs mt-1">
                            <MapPin size={12} className="mr-1" />
                            {match.location.name}
                        </div>
                    </div>
                    <div className="bg-gray-800 px-2 py-1 rounded text-xs text-white">
                        {new Date(match.date).toLocaleDateString()}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {match.players.slice(0, 3).map((p, i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gray-700 border border-dark flex items-center justify-center text-xs overflow-hidden">
                                     {p.user?.avatar ? <img src={p.user.avatar} className="w-full h-full" /> : <Users size={12} />}
                                </div>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">
                            {match.players.length}/{match.maxPlayers} Players
                        </span>
                    </div>
                    <span className="text-secondary font-bold text-sm">
                        {match.price}₺
                    </span>
                </div>
                 {match.status === 'full' && (
                     <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl">FULL</div>
                 )}
                </div>
            </Link>
            ))
        )}
      </div>
    </div>
  );
};

export default Home;
