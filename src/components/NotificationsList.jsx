import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';

const NotificationsList = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'event',
        title: 'New Event: Tech Fest 2024',
        message: 'A new event has been created in your college. Don\'t miss out on this exciting opportunity!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        actionUrl: '/events/1'
      },
      {
        id: 2,
        type: 'club',
        title: 'Club Application Approved',
        message: 'Congratulations! Your application for Robotics Club has been approved. Welcome to the team!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        actionUrl: '/clubs/2'
      },
      {
        id: 3,
        type: 'collaboration',
        title: 'Collaboration Request',
        message: 'NIT Delhi wants to collaborate on a joint event. Check out their proposal.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        actionUrl: '/collaborations/3'
      },
      {
        id: 4,
        type: 'system',
        title: 'Welcome to NIT Club!',
        message: 'Thank you for joining our platform. Explore clubs, events, and connect with fellow students.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
        read: true,
        actionUrl: '/'
      },
      {
        id: 5,
        type: 'post',
        title: 'New Post in Your Club',
        message: 'There\'s a new announcement in the Computer Science Club. Check it out!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: false,
        actionUrl: '/posts/5'
      }
    ];

    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return timestamp.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'event':
        return '🎉';
      case 'club':
        return '🏛️';
      case 'collaboration':
        return '🤝';
      case 'post':
        return '📝';
      case 'system':
        return 'ℹ️';
      default:
        return '🔔';
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to view your notifications.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="loading">Loading notifications...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          {notifications.some(n => !n.read) && (
            <button
              onClick={markAllAsRead}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Mark All as Read
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
            { key: 'read', label: 'Read', count: notifications.filter(n => n.read).length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Notifications list */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 7V3a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2v-4l5 5V2l-5 5z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {filter === 'unread' ? 'You have no unread notifications.' :
               filter === 'read' ? 'You have no read notifications.' :
               'You have no notifications yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
                  !notification.read ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-2xl">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {formatTime(notification.timestamp)}
                        </span>
                        <div className="flex space-x-2">
                          {notification.actionUrl && (
                            <a
                              href={notification.actionUrl}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Details →
                            </a>
                          )}
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                              Mark as Read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
