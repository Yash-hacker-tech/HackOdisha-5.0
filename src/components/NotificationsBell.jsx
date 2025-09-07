import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NotificationsBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: "event",
        title: "New Event: Tech Fest 2024",
        message: "A new event has been created in your college.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
      },
      {
        id: 2,
        type: "club",
        title: "Club Application Approved",
        message: "Your application for Robotics Club has been approved.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false,
      },
      {
        id: 3,
        type: "collaboration",
        title: "Collaboration Request",
        message: "NIT Delhi wants to collaborate on a joint event.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: true,
      },
    ];
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-white hover:bg-indigo-600 rounded-full transition"
        title="Notifications"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5zM15 7V3a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2v-4l5 5V2l-5 5z"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200 animate-fadeIn">
          <div className="py-2">
            {/* Header */}
            <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              {notifications.length > 0 && (
                <span className="text-xs text-gray-500">
                  {unreadCount} unread
                </span>
              )}
            </div>

            {/* List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM15 7V3a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2v-4l5 5V2l-5 5z"
                    />
                  </svg>
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition ${
                      !n.read ? "bg-indigo-50 hover:bg-indigo-100" : "hover:bg-gray-50"
                    }`}
                    onClick={() => markAsRead(n.id)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        {n.type === "event" && "📅"}
                        {n.type === "club" && "🎓"}
                        {n.type === "collaboration" && "🤝"}
                      </div>
                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {n.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {n.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTime(n.timestamp)}
                        </p>
                      </div>
                      {/* Unread Dot */}
                      {!n.read && (
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-200 text-center">
                <Link
                  to="/notifications"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={() => setShowDropdown(false)}
                >
                  View all notifications →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsBell;
