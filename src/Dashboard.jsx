import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "./hooks/useUser";
import { useClubs } from "./hooks/useClubs";
import { useEvents } from "./hooks/useEvents";
import {
  FiCalendar,
  FiUsers,
  FiStar,
  FiMail,
  FiGlobe,
  FiMapPin,
  FiBook,
  FiAward,
} from "react-icons/fi";

const Dashboard = () => {
  const { user } = useUser();
  const { clubs } = useClubs();
  const { events } = useEvents();
  const [stats, setStats] = useState({
    totalClubs: 0,
    totalEvents: 0,
    myClubs: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    if (clubs && events) {
      const now = new Date();
      const upcomingEvents = events.filter(
        (event) => new Date(event.start) > now
      ).length;

      setStats({
        totalClubs: clubs.length,
        totalEvents: events.length,
        myClubs:
          user?.role === "club_admin"
            ? clubs.filter((club) => club.admin_id === user.id).length
            : 0,
        upcomingEvents,
      });
    }
  }, [clubs, events, user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-4">
        <div className="text-center py-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-8">
            Please log in to view your dashboard.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }


  const StatCard = ({ icon, title, value, bgColor }) => (
    <div className="p-6 rounded-3xl shadow-xl transform hover:scale-[1.03] transition-all duration-300 bg-white/90 backdrop-blur-md border border-gray-200">
      <div className="flex items-center space-x-5">
        <div className={`p-4 rounded-2xl ${bgColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 tracking-wide">{title}</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">{value}</p>
        </div>
      </div>
    </div>
  );


  const QuickActions = ({ actions }) => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
        Quick Actions
      </h3>
      <div className="space-y-5">
        {actions.map((action, idx) => (
          <Link
            key={idx}
            to={action.to}
            className={`flex items-center justify-center w-full py-4 px-5 rounded-2xl ${action.bg} ${action.hover} text-white font-medium shadow-md transform hover:scale-[1.03] transition-all duration-300`}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );

  const RecentActivity = ({ activities }) => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
        Recent Activity
      </h3>
      <div className="space-y-5">
        {activities.map((act, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors duration-200 border border-gray-100"
          >
            <div
              className={`w-3 h-3 ${act.color} rounded-full flex-shrink-0`}
            ></div>
            <p className="text-base text-gray-600">{act.text}</p>
          </div>
        ))}
      </div>
    </div>
  );


  const renderStudentDashboard = () => (
    <div className="space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl p-12 transform hover:scale-[1.01] transition-all duration-300">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-wide">
          Welcome back, {user.username}!
        </h2>
        <p className="text-indigo-100 text-xl md:text-2xl tracking-wide">
          Explore clubs and events in your college
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Total Clubs"
          value={stats.totalClubs}
          bgColor="bg-gradient-to-tr from-blue-100 to-blue-200 text-blue-600"
          icon={<FiBook className="text-3xl text-blue-600" />}
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          bgColor="bg-gradient-to-tr from-green-100 to-green-200 text-green-600"
          icon={<FiCalendar className="text-3xl text-green-600" />}
        />
        <StatCard
          title="My Interests"
          value="3"
          bgColor="bg-gradient-to-tr from-purple-100 to-purple-200 text-purple-600"
          icon={<FiStar className="text-3xl text-purple-600" />}
        />
        <StatCard
          title="Activities"
          value="12"
          bgColor="bg-gradient-to-tr from-orange-100 to-orange-200 text-orange-600"
          icon={<FiAward className="text-3xl text-orange-600" />}
        />
      </div>

      {/* Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="p-6 bg-white rounded-2xl">
          {actions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className={`${action.bg} ${action.hover} text-white py-3 px-5 rounded-xl block text-center`}
            >
              {action.label}
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
		<div className="w-full max-w-md p-6 bg-white rounded-2xl">
			{activities.map((activity, index) => (
			<div
				key={index}
				className={`${activity.color} p-3 mb-3 rounded-lg text-center text-white`}
			>
				{activity.text}
			</div>
			))}
		</div>
		</div>

      </div>
    </div>
  );

  const renderClubAdminDashboard = () => (
    <div className="space-y-12">
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl shadow-2xl p-12 transform hover:scale-[1.01] transition-all duration-300 text-center">
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent"
          style={{
            background: 'linear-gradient(45deg, rgb(255, 215, 0), rgb(255, 165, 0))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Club Admin Dashboard
        </h2>
        <p className="text-white text-xl md:text-2xl">
          Manage your clubs and engage with members
        </p>

      </div>


      <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatCard
              title="My Clubs"
              value={stats.myClubs}
              bgColor="bg-gradient-to-tr from-teal-500 to-teal-700"
              titleClassName="text-white"
              icon={<FiUsers className="text-3xl text-white mx-auto" />}
            />
            <StatCard
              title="Total Events"
              value={stats.totalEvents}
              bgColor="bg-gradient-to-tr from-green-500 to-green-700"
              titleClassName="text-white"
              icon={<FiCalendar className="text-3xl text-white mx-auto" />}
            />
            <StatCard
              title="Upcoming Events"
              value={stats.upcomingEvents}
              bgColor="bg-gradient-to-tr from-yellow-500 to-yellow-700"
              titleClassName="text-white"
              icon={<FiStar className="text-3xl text-white mx-auto" />}
            />
          </div>
        </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <QuickActions
          actions={[
            { to: "/create-club", label: "Create Club", bg: "bg-teal-600", hover: "hover:bg-teal-700" },
            { to: "/create-event", label: "Host Event", bg: "bg-green-600", hover: "hover:bg-green-700" },
            { to: "/posts", label: "Manage Posts", bg: "bg-yellow-600", hover: "hover:bg-yellow-700" },
          ]}
        />
        <RecentActivity
          activities={[
            { text: "Approved 5 new members in Coding Club", color: "bg-teal-500" },
            { text: "Created Hackathon 2024", color: "bg-green-500" },
            { text: "Posted announcement in AI Club", color: "bg-yellow-500" },
          ]}
        />
      </div>

    </div>
  );

 
  const renderSuperAdminDashboard = () => (
    <div className="space-y-12">
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-3xl shadow-2xl p-12 transform hover:scale-[1.01] transition-all duration-300">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">Super Admin Dashboard</h2>
        <p className="text-red-100 text-xl md:text-2xl">
          Oversee all college activities and manage the platform
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard
          title="Total Clubs"
          value={stats.totalClubs}
          bgColor="bg-gradient-to-tr from-red-100 to-red-200 text-red-600"
          icon={<FiBook className="text-3xl text-red-600" />}
        />
        <StatCard
          title="Total Events"
          value={stats.totalEvents}
          bgColor="bg-gradient-to-tr from-pink-100 to-pink-200 text-pink-600"
          icon={<FiCalendar className="text-3xl text-pink-600" />}
        />
        <StatCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          bgColor="bg-gradient-to-tr from-orange-100 to-orange-200 text-orange-600"
          icon={<FiStar className="text-3xl text-orange-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <QuickActions
          actions={[
            { to: "/manage-colleges", label: "Manage Colleges", bg: "bg-red-600", hover: "hover:bg-red-700" },
            { to: "/manage-clubs", label: "Manage Clubs", bg: "bg-pink-600", hover: "hover:bg-pink-700" },
            { to: "/manage-events", label: "Manage Events", bg: "bg-orange-600", hover: "hover:bg-orange-700" },
          ]}
        />
        <RecentActivity
          activities={[
            { text: "Approved Debate Society Club", color: "bg-red-500" },
            { text: "Scheduled Annual Fest", color: "bg-pink-500" },
            { text: "Monitored participation reports", color: "bg-orange-500" },
          ]}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {user.role === "student" && renderStudentDashboard()}
        {user.role === "club_admin" && renderClubAdminDashboard()}
        {user.role === "super_admin" && renderSuperAdminDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;
