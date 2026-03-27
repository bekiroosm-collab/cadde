import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Shield, Plus } from 'lucide-react';

const MyTeams = () => {
    const [teams, setTeams] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const res = await axios.get('/team/myteams');
            setTeams(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/team/create', { name: newTeamName });
            setNewTeamName('');
            setShowCreate(false);
            fetchTeams();
        } catch (error) {
            alert("Error creating team");
        }
    }

    return (
        <div className="p-4 pt-6 pb-24">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">My Teams</h1>
                <button onClick={() => setShowCreate(!showCreate)} className="bg-primary p-2 rounded-full text-white shadow-lg shadow-purple-900/40">
                    <Plus size={20} />
                </button>
            </div>

            {showCreate && (
                <div className="mb-6 bg-dark border border-gray-800 p-4 rounded-xl animate-fade-in">
                    <form onSubmit={handleCreateTeam} className="flex gap-2">
                        <input
                            type="text"
                            value={newTeamName}
                            onChange={(e) => setNewTeamName(e.target.value)}
                            placeholder="Team Name"
                            className="flex-1 bg-black border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                            required
                        />
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-bold">Create</button>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {teams.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">You are not in any team yet.</div>
                ) : (
                    teams.map(team => (
                        <div key={team._id} className="bg-dark border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                                    <Shield className="text-gray-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{team.name}</h3>
                                    <span className="text-xs text-gray-500">{team.members.length} Members</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyTeams;
