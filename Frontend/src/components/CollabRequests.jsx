import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { useClubs } from '../hooks/useClubs';
import CollabModal from './CollabModal';

const CollabRequests = () => {
  const { user } = useUser();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected

  useEffect(() => {
    // Mock data - in real implementation, this would come from API
    const mockRequests = [
      {
        id: 1,
        from_club_id: 1,
        to_club_id: 2,
        from_club_name: 'Computer Science Club',
        to_club_name: 'Robotics Club',
        title: 'Joint Hackathon Event',
        description: 'We would like to collaborate on organizing a hackathon event together.',
        status: 'pending',
        created_at: '2024-01-15T10:00:00Z',
        proposed_date: '2024-02-15',
        expected_participants: 100
      },
      {
        id: 2,
        from_club_id: 3,
        to_club_id: user?.club_id || 1,
        from_club_name: 'Music Club',
        to_club_name: 'Computer Science Club',
        title: 'Cultural Fest Collaboration',
        description: 'Proposal for joint performance at the annual cultural fest.',
        status: 'accepted',
        created_at: '2024-01-10T14:30:00Z',
        proposed_date: '2024-03-20',
        expected_participants: 200
      }
    ];

    // Filter requests based on user role and club
    let filteredRequests = mockRequests;

    if (user?.role === 'club_admin') {
      filteredRequests = mockRequests.filter(req =>
        req.from_club_id === user.club_id || req.to_club_id === user.club_id
      );
    } else if (user?.role === 'college_admin') {
      // College admins can see all requests
      filteredRequests = mockRequests;
    }

    // Apply status filter
    if (filter !== 'all') {
      filteredRequests = filteredRequests.filter(req => req.status === filter);
    }

    setRequests(filteredRequests);
    setLoading(false);
  }, [user, filter]);

  const handleStatusChange = (requestId, newStatus) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to view collaboration requests.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading collaboration requests...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Collaboration Requests</h1>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'accepted', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md capitalize ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-200`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No collaboration requests found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map(request => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{request.title}</h3>
                  <p className="text-gray-600 mb-2">
                    From: <span className="font-medium">{request.from_club_name}</span> →
                    To: <span className="font-medium">{request.to_club_name}</span>
                  </p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                    {request.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Created: {new Date(request.created_at).toLocaleDateString()}</p>
                  <p>Proposed: {request.proposed_date}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{request.description}</p>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span>Expected participants: {request.expected_participants}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Details
                  </button>

                  {request.status === 'pending' && user?.role === 'club_admin' && request.to_club_id === user.club_id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(request.id, 'accepted')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(request.id, 'rejected')}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRequest && (
        <CollabModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onStatusChange={handleStatusChange}
          user={user}
        />
      )}
    </div>
  );
};

export default CollabRequests;
