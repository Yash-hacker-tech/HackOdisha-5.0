import React, { useState } from 'react';

const CollabModal = ({ request, onClose, onStatusChange, user }) => {
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResponse = async (status) => {
    setLoading(true);

    setTimeout(() => {
      onStatusChange(request.id, status);
      setLoading(false);
      onClose();
    }, 1000);
  };

  const canRespond = user?.role === 'club_admin' && request.to_club_id === user.club_id && request.status === 'pending';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{request.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">From Club</h3>
                <p className="text-gray-600">{request.from_club_name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">To Club</h3>
                <p className="text-gray-600">{request.to_club_name}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{request.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">Proposed Date</h3>
                <p className="text-gray-600">{request.proposed_date}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Expected Participants</h3>
                <p className="text-gray-600">{request.expected_participants}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Status</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Created</h3>
              <p className="text-gray-600">{new Date(request.created_at).toLocaleString()}</p>
            </div>
          </div>

          {canRespond && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Response</h3>

              <div className="mb-4">
                <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
                  Response Message (Optional)
                </label>
                <textarea
                  id="response"
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a message with your response..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleResponse('accepted')}
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {loading ? 'Processing...' : 'Accept Collaboration'}
                </button>
                <button
                  onClick={() => handleResponse('rejected')}
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {loading ? 'Processing...' : 'Reject Collaboration'}
                </button>
              </div>
            </div>
          )}

          {!canRespond && (
            <div className="border-t pt-6">
              <div className="text-center text-gray-500">
                {request.status === 'pending'
                  ? 'Waiting for response from the receiving club.'
                  : `This collaboration request has been ${request.status}.`
                }
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollabModal;
